import React from "react";
import { mdToString } from "../util/md-to-string";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { tinaField } from 'tinacms/dist/react'
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { components, templates } from "../util/md-components";

export const Content = ({ data }) => {
  return (
    <Section color={data.color}>
      <Container
        className={`${
          data.color === "primary" ? `text-2xl font-bold text-center` : 'prose'
        }`}
        size="medium"
        width="medium"
      >
        <div data-tina-field={tinaField(data, 'body')}>
          <TinaMarkdown components={components} content={data.body} />
        </div>
      </Container>
    </Section>
  );
};

export const contentBlockSchema = {
  name: "content",
  label: "Content",
  ui: {
    itemProps: (props) => mdToString(props, "Content"),
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
      templates,
    },
  ],
};
