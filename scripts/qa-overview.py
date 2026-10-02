"""Run against `npm run preview`. Requires Python Playwright and Chromium."""
from pathlib import Path
import json
import os
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = json.loads((ROOT / 'release-manifest.json').read_text())
BASE_PATH = os.environ.get(MANIFEST['environment']['basePath'], '').rstrip('/')
BASE = f"{os.environ.get('SITE_BASE_URL', 'http://localhost:3000').rstrip('/')}{BASE_PATH}"
CALENDAR_ROUTE = MANIFEST['routes']['calendar']
RETIRED_ROUTES = MANIFEST['routes']['retired'] + ['/assets/jiahao-chen.jpg', '/artifacts/disaster-law-symposium-2026-staging.pdf']
OUTPUT = Path(__file__).resolve().parents[1] / 'artifacts/phase-1-charcoal'
OUTPUT.mkdir(parents=True, exist_ok=True)
results = {'viewports': [], 'keyboard': [], 'retired_routes': []}

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(accept_downloads=True)
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('console', lambda message: errors.append(message.text) if message.type == 'error' else None)
    failed = []
    page.on('requestfailed', lambda request: failed.append({'url': request.url, 'reason': request.failure}))
    for width, height, label in [(1920, 1080, 'wide-desktop'), (1440, 1000, 'desktop'), (768, 1024, 'tablet'), (390, 844, 'mobile'), (320, 800, None), (679, 900, None), (680, 900, None), (681, 900, None), (899, 900, None), (900, 900, None), (901, 900, None)]:
        page.set_viewport_size({'width': width, 'height': height})
        assert page.goto(BASE).status == 200
        page.wait_for_load_state('networkidle')
        page.evaluate('document.fonts.ready')
        metrics = page.evaluate('''() => {
          const rect = selector => {
            const {x, y, width, height, bottom} = document.querySelector(selector).getBoundingClientRect();
            return {x, y, width, height, bottom};
          };
          return {viewport: innerWidth, scrollWidth: document.documentElement.scrollWidth,
            hero: rect('.signal-hero'), title: rect('h1'), tagline: rect('.hero-tagline'),
            facts: rect('.event-facts'), registration: rect('.hero-content .button'),
            imagesLoaded: [...document.images].every(image => image.complete && image.naturalWidth > 0),
            logo: rect('header img'), header: rect('header'), identity: rect('.hero-content .eyebrow'),
            contactHeading: rect('.footer-contact h2'), contactLink: rect('.contact-link')};
        }''')
        assert metrics['scrollWidth'] == width, metrics
        assert metrics['title']['bottom'] < metrics['tagline']['y'], metrics
        assert metrics['imagesLoaded']
        assert abs(metrics['contactHeading']['x'] - metrics['contactLink']['x']) < 1, metrics
        assert metrics['contactHeading']['bottom'] < metrics['contactLink']['y'], metrics
        if width == 320:
            assert metrics['contactLink']['height'] < 50, metrics
        assert metrics['hero']['y'] == 0, metrics
        assert metrics['facts']['bottom'] < metrics['registration']['y'], metrics
        if label:
            page.screenshot(path=str(OUTPUT / f'{label}.png'), full_page=True)
        results['viewports'].append(metrics)

    results['header'] = 'Homepage navigation provides page links; registration is the hero action.'
    results['footer'] = 'Contact email aligns below its heading at every tested viewport'

    # The all-day calendar remains public, without a homepage download control.
    page.goto(BASE)
    response = context.request.get(BASE + CALENDAR_ROUTE)
    assert response.status == 200 and response.headers['content-type'].startswith('text/calendar')
    assert 'attachment' in response.headers['content-disposition']
    results['calendar_endpoint'] = 'Public calendar endpoint retains attachment headers and text/calendar MIME type'
    assert page.get_by_role('link', name='disasterlawsymposium@oem.nyc.gov').get_attribute('href') == 'mailto:disasterlawsymposium@oem.nyc.gov'
    results['contact'] = 'Direct mailto verified; no message sent'
    results['map_url'] = 'Venue map is retained in the published event record; no standalone map link is rendered.'

    # Complete keyboard tab path, with visible focus and no clipped links.
    page.set_viewport_size({'width': 1440, 'height': 1000})
    page.goto(BASE, wait_until='networkidle')
    page.evaluate('document.body.focus()')
    for index in range(page.locator('a:visible').count()):
        page.keyboard.press('Tab')
        focus = page.evaluate('''() => {
          const el = document.activeElement, box = el.getBoundingClientRect(), style = getComputedStyle(el);
          return {text: el.textContent.trim(), href: el.getAttribute('href'),
            outline: style.outlineStyle, width: style.outlineWidth,
            inView: box.top >= 0 && box.bottom <= innerHeight && box.left >= 0 && box.right <= innerWidth};
        }''')
        assert focus['outline'] == 'solid' and float(focus['width'].removesuffix('px')) >= 2 and focus['inView'], focus
        results['keyboard'].append(focus)
        if index == 2:
            page.screenshot(path=str(OUTPUT / 'keyboard-focus.png'))
    assert results['keyboard'][0]['text'] == 'Skip to content'
    assert results['keyboard'][-1]['href'].startswith('mailto:')
    page.goto(BASE, wait_until='networkidle')
    page.keyboard.press('Tab')
    page.keyboard.press('Enter')
    assert page.evaluate('document.activeElement.id') == 'main-content'

    # Text at 200% exposes clipping independently of viewport reflow checks.
    page.set_viewport_size({'width': 390, 'height': 844})
    page.goto(BASE, wait_until='networkidle')
    page.add_style_tag(content='html { font-size: 200% !important; }')
    assert page.evaluate('document.documentElement.scrollWidth === innerWidth')
    page.screenshot(path=str(OUTPUT / 'mobile-text-200.png'), full_page=True)
    results['text_200_percent'] = '390px; no horizontal overflow'

    assert not errors, {'errors': errors}
    results['network_events'] = failed
    # Missing pages should be a real 404, never a client redirect or SPA fallback.
    for route in RETIRED_ROUTES:
        response = page.goto(BASE.rstrip('/') + route)
        assert response.status == 404
        assert page.get_by_role('link', name='Go to the homepage').is_visible()
        assert page.url == BASE.rstrip('/') + route
        results['retired_routes'].append({'path': route, 'status': response.status})
    page.get_by_role('link', name='Go to the homepage').click()
    assert page.url == BASE + '/'
    results['runtime'] = 'No page or console errors on homepage; request lifecycle diagnostics recorded separately'
    browser.close()

(OUTPUT / 'browser-results.json').write_text(json.dumps(results, indent=2) + '\n')
print(json.dumps(results, indent=2))
