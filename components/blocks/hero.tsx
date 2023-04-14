import React from "react";
import { Actions } from "../util/actions";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { components, templates } from "../util/md-components";

export const Hero = ({ data, parentField }) => {

  return (
    <Section color={data.color}>
      <div
        data-tinafield={`${parentField}.image`}
        className="relative overflow-hidden bg-no-repeat bg-cover"
        style={data.image && {
          backgroundPosition: "50%",
          backgroundImage: `url(${data.image.src})`,
          height: 500,
        } || {}}
      >
        <div
          className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
          style={{backgroundColor: "rgba(0, 0, 0, 0.75)"}}
        >
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-white px-6 md:px-12">
              <h1 data-tinafield={`${parentField}.headline`} className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
                <TinaMarkdown components={components} content={data.headline} />
              </h1>
              {data.actions && (
                <Actions
                  parentField={`${parentField}.actions`}
                  className="justify-center py-2"
                  parentColor={data.color}
                  actions={data.actions}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export const heroBlockSchema = {
  name: "hero",
  label: "Hero",
  ui: {
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: "This Big Text is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.",
    },
  },
  fields: [
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image",
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string",
        },
      ],
    },
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
      label: "Headline",
      name: "headline",
      type: "rich-text",
      templates
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          icon: true,
          link: "/",
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" },
          ],
        },
        {
          label: "Icon",
          name: "icon",
          type: "boolean",
        },
        {
          label: "Link",
          name: "link",
          type: "string",
        },
      ],
    },
  ],
};
