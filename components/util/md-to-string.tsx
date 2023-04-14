import { renderToString } from 'react-dom/server';
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { components } from "./md-components";

export const mdToString = (props) => {
  return {
    label: renderToString(
      <TinaMarkdown components={components} content={props?.body} />
    ).replace(/<\/?[^>]+(>|$)/g, "").slice(0, 30) + '...',
  };
}
