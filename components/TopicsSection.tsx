import { Fragment } from "react";
import type { PublishedTopic } from "@/data/published-event";

export interface TopicsSectionProps {
  introduction: string;
  topics: readonly PublishedTopic[];
}

export function TopicsSection({ introduction, topics }: TopicsSectionProps) {
  return (
    <section className="topics-section" id="topics" aria-labelledby="topics-title">
      <div className="page-shell topics-layout">
        <div className="section-intro">
          <p className="eyebrow">The conversation</p>
          <h2 id="topics-title">When systems are under pressure.</h2>
          <p>{introduction}</p>
        </div>
        <div role="list" data-slot="item-group" aria-label="Symposium topics">
          {topics.map((topic, index) => (
            <Fragment key={topic.id}>
              <div className="ui-separator ui-separator-horizontal" data-slot="item-separator" />
              <div role="listitem" data-slot="item">
                <div data-slot="item-media" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
                <div data-slot="item-content">
                  <h3 data-slot="item-title">{topic.title}</h3>
                  <p data-slot="item-description">{topic.summary}</p>
                </div>
              </div>
            </Fragment>
          ))}
          <div className="ui-separator ui-separator-horizontal" data-slot="item-separator" />
        </div>
      </div>
    </section>
  );
}
