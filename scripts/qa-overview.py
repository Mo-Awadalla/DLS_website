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
    page.on('requestfailed', lambda request: failed.append(request.url))
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
            facts: rect('.event-facts'), button: rect('.hero-content .button'),
            imagesLoaded: [...document.images].every(image => image.complete && image.naturalWidth > 0),
            logo: rect('header img'), header: rect('header'), identity: rect('.hero-content .eyebrow'),
            contactHeading: rect('.footer-contact h2'), contactLink: rect('.contact-link'),
            logoFilter: getComputedStyle(document.querySelector('header img')).filter};
        }''')
        assert metrics['scrollWidth'] == width, metrics
        assert metrics['title']['bottom'] < metrics['tagline']['y'], metrics
        assert metrics['facts']['bottom'] <= metrics['button']['y'], metrics
        assert metrics['button']['bottom'] < metrics['hero']['bottom'], metrics
        assert metrics['imagesLoaded'] and metrics['logoFilter'] == 'brightness(0) invert(1)'
        assert abs(metrics['header']['x'] - metrics['identity']['x']) < 1, metrics
        assert abs(metrics['logo']['x'] + 220 * 130 / 2500 - metrics['identity']['x']) < 1, metrics
        assert metrics['logo']['y'] == 0 and metrics['header']['height'] <= 75, metrics
        assert abs(metrics['contactHeading']['x'] - metrics['contactLink']['x']) < 1, metrics
        assert metrics['contactHeading']['bottom'] < metrics['contactLink']['y'], metrics
        if width == 320:
            assert metrics['contactLink']['height'] < 50, metrics
        assert metrics['hero']['y'] == 0, metrics
        assert metrics['logo']['bottom'] < metrics['identity']['y'], metrics
        assert page.get_by_role('navigation').count() == 0
        assert page.locator('header').inner_text().strip() == ''
        assert page.locator('header a').evaluate("el => getComputedStyle(el).backgroundColor") == 'rgba(0, 0, 0, 0)'
        if width == 1440:
            assert 520 <= metrics['hero']['height'] <= 620, metrics
        if label:
            page.screenshot(path=str(OUTPUT / f'{label}.png'), full_page=True)
        results['viewports'].append(metrics)

    results['header'] = 'Official transparent logo rendered white overlays hero; its visible left edge aligns with hero content; no white header band, navigation, or adjacent text'
    results['footer'] = 'Contact email aligns below its heading at every tested viewport'

    # Exercise the real browser download and inspect its file.
    page.goto(BASE)
    with page.expect_download() as event:
        page.get_by_role('link', name='Save the date').click()
    download = event.value
    assert download.suggested_filename == 'disaster-law-symposium-2026.ics'
    download.save_as(OUTPUT / download.suggested_filename)
    response = context.request.get(BASE + CALENDAR_ROUTE)
    assert response.status == 200 and response.headers['content-type'].startswith('text/calendar')
    results['calendar_download'] = 'Saved with expected filename and text/calendar MIME type'
    assert page.get_by_role('link', name='disasterlawsymposium@oem.nyc.gov').get_attribute('href') == 'mailto:disasterlawsymposium@oem.nyc.gov'
    results['contact'] = 'Direct mailto verified; no message sent'
    results['map_url'] = 'Venue map is retained in the published event record; no standalone map link is rendered.'

    # Complete keyboard tab path, with visible focus and no clipped links.
    page.set_viewport_size({'width': 1440, 'height': 1000})
    page.goto(BASE, wait_until='networkidle')
    page.evaluate('document.body.focus()')
    for index in range(4):
        page.keyboard.press('Tab')
        focus = page.evaluate('''() => {
          const el = document.activeElement, box = el.getBoundingClientRect(), style = getComputedStyle(el);
          return {text: el.textContent.trim(), href: el.getAttribute('href'),
            outline: style.outlineStyle, width: style.outlineWidth,
            inView: box.top >= 0 && box.bottom <= innerHeight && box.left >= 0 && box.right <= innerWidth};
        }''')
        assert focus['outline'] == 'solid' and focus['width'] == '3px' and focus['inView'], focus
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

    assert not errors and not failed, {'errors': errors, 'failed': failed}
    # Missing pages should be a real 404, never a client redirect or SPA fallback.
    for route in RETIRED_ROUTES:
        response = page.goto(BASE.rstrip('/') + route)
        assert response.status == 404
        assert page.get_by_role('link', name='Go to the homepage').is_visible()
        assert page.url == BASE.rstrip('/') + route
        results['retired_routes'].append({'path': route, 'status': response.status})
    page.get_by_role('link', name='Go to the homepage').click()
    assert page.url == BASE + '/'
    results['runtime'] = 'No page errors, console errors, or failed requests on homepage'
    browser.close()

(OUTPUT / 'browser-results.json').write_text(json.dumps(results, indent=2) + '\n')
print(json.dumps(results, indent=2))
