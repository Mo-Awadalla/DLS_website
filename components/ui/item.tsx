import type { ComponentProps } from "react";
import { Separator } from "./separator";

// Static shadcn Item composition, styled by the site's existing CSS system.
export function ItemGroup(props: ComponentProps<"div">) {
  return <div role="list" data-slot="item-group" {...props} />;
}

export function Item(props: ComponentProps<"div">) {
  return <div role="listitem" data-slot="item" {...props} />;
}

export function ItemMedia(props: ComponentProps<"div">) {
  return <div data-slot="item-media" {...props} />;
}

export function ItemContent(props: ComponentProps<"div">) {
  return <div data-slot="item-content" {...props} />;
}

export function ItemTitle(props: ComponentProps<"h3">) {
  return <h3 data-slot="item-title" {...props} />;
}

export function ItemDescription(props: ComponentProps<"p">) {
  return <p data-slot="item-description" {...props} />;
}

export function ItemSeparator() {
  return <Separator data-slot="item-separator" />;
}
