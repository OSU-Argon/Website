import React from "react";
import { renderToString } from 'react-dom/server';
import { Container } from "../util/container";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Components } from "tinacms/dist/rich-text";

const components: Components<{
  Superscript: {
    value: string;
  };
}> = {
  Superscript: (props: {
    value: string;
  }) => {
    return (
      <sup>{props.value}</sup>
    );
  }
};

export const Content = ({ data, parentField = "" }) => {
  return (
    <Section color={data.color}>
      <Container
        className={`${
          data.color === "primary" ? `text-2xl font-bold text-center` : 'prose'
        }`}
        data-tinafield={`${parentField}.body`}
        size="medium"
        width="medium"
      >
        <TinaMarkdown components={components} content={data.body} />
      </Container>
    </Section>
  );
};

export const contentBlockSchema = {
  name: "content",
  label: "Content",
  ui: {
    itemProps: (item) => {
      return {
        label: renderToString(
          <TinaMarkdown components={components} content={item?.body} />
        ).replace(/<\/?[^>]+(>|$)/g, "").slice(0, 30) + '...',
      };
    },
  },
  fields: [
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      templates: [
        {
          name: "Superscript",
          label: "Superscript",
          inline: true,
          fields: [
            {
              type: "string",
              label: "Value",
              name: "value",
              required: true,
              isTitle: true,
            },
          ],
        }
      ],
    },
  ],
};
