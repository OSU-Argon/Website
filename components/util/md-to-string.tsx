import React from "react";
import { renderToString } from 'react-dom/server';
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { components } from "./md-components";

export const mdToString = (props, label = "Item") => {
  try {
    if (props?.body) {
      const mdString = renderToString(
        <TinaMarkdown components={components} content={props.body} />
      ).replace(/<\/?[^>]+(>|$)/g, "");
      if (mdString.length > 100)
        label = mdString.slice(0, 100) + '...';
      else if (mdString.length > 0)
        label = mdString;
    }
  } catch (e) {
    console.error(e);
  }
  return { label };
}
