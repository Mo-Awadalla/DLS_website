export function PreviewBar({ current = false }: { current?: boolean }) {
  return (
    <nav className="preview-bar" aria-label="Staging comparison">
      <div className="page-shell preview-bar-inner">
        <span className="preview-label">Design preview · The conversation</span>
        <div className="preview-links">
          <a href="/#topics" aria-current={!current ? "page" : undefined}>Proposed</a>
          <a href="/current#topics" aria-current={current ? "page" : undefined}>Current</a>
        </div>
      </div>
    </nav>
  );
}
