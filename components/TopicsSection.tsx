import { Fragment } from "react";
import { overview } from "@/data/overview";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle } from "@/components/ui/item";

export function TopicsSection() {
  return (
    <section className="topics-section" id="topics" aria-labelledby="topics-title">
      <div className="page-shell topics-layout">
        <div className="section-intro">
          <p className="eyebrow">The conversation</p>
          <h2 id="topics-title">When systems are under pressure.</h2>
          <p>{overview.introduction}</p>
        </div>
        <ItemGroup aria-label="Symposium topics">
          {overview.topics.map((topic, index) => (
            <Fragment key={topic.id}>
              <ItemSeparator />
              <Item>
                <ItemMedia aria-hidden="true">{String(index + 1).padStart(2, "0")}</ItemMedia>
                <ItemContent>
                  <ItemTitle>{topic.title}</ItemTitle>
                  <ItemDescription>{topic.summary}</ItemDescription>
                </ItemContent>
              </Item>
            </Fragment>
          ))}
          <ItemSeparator />
        </ItemGroup>
      </div>
    </section>
  );
}
