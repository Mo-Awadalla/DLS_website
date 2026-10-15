export interface TopicsSectionProps {
  introduction: string;
}

export function TopicsSection({ introduction }: TopicsSectionProps) {
  return (
    <section className="topics-section" id="topics" aria-labelledby="topics-title">
      <div className="page-shell topics-layout">
        <div className="section-intro">
          <p className="eyebrow">The conversation</p>
          <h2 id="topics-title">When systems are under pressure.</h2>
        </div>
        <div className="topics-content">
          <p>{introduction}</p>
        </div>
      </div>
    </section>
  );
}
