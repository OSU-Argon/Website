/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineStaticConfig } from "tinacms";
import { contentBlockSchema } from "../components/blocks/content";
import { featureBlockSchema } from "../components/blocks/features";
import { heroBlockSchema } from "../components/blocks/hero";
import { tableBlockSchema } from "../components/blocks/table";
import { downloadBlockSchema } from "../components/blocks/download";
import { ColorPickerInput } from "../components/fields/color";
import { IconPickerInput } from "../components/fields/icon";
import { templates } from "../components/util/md-components";

const config = defineStaticConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD!, // Netlify branch env
  token: process.env.TINA_TOKEN!,
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema: {
    collections: [
      {
        label: "Global",
        name: "global",
        path: "content/global",
        format: "json",
        ui: {
          global: true,
        },
        fields: [
          {
            type: "object",
            label: "Header",
            name: "header",
            fields: [
              {
                type: "string",
                label: "Name",
                name: "name",
              },
              {
                type: "string",
                label: "Color",
                name: "color",
                options: [
                  { label: "Default", value: "default" },
                  { label: "Primary", value: "primary" },
                ],
              },
              {
                type: "object",
                label: "Nav Links",
                name: "nav",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.label };
                  },
                  defaultItem: {
                    href: "home",
                    label: "Home",
                  },
                },
                fields: [
                  {
                    type: "string",
                    label: "Link",
                    name: "href",
                  },
                  {
                    type: "string",
                    label: "Label",
                    name: "label",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            label: "Footer",
            name: "footer",
            // @ts-ignore
            fields: [
            
              {
                type: "object",
                label: "Sections",
                name: "sections",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.title };
                  },
                },
                fields: [
                  {
                    type: "string",
                    label: "Title",
                    name: "title",
                  },
                  {
                    type: "rich-text",
                    label: "Content",
                    name: "content",
                    templates
                  },
                  {
                    type: "object",
                    label: "Links",
                    name: "links",
                    list: true,
                    ui: {
                      itemProps: (link) => {
                        return { label: link?.link };
                      }
                    },
                    fields: [
                      {
                        type: "string",
                        label: "Link",
                        name: "link",
                        required: true,
                      },
                      {
                        type: "string",
                        label: "Size",
                        name: "size",
                        options: [
                          { label: "Small", value: "small" },
                          { label: "Large", value: "large" },
                        ]
                      },
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
                        ],
                      },
                      {
                        label: "Icon",
                        name: "icon",
                        type: "string",
                        ui: {
                          // @ts-ignore
                          component: IconPickerInput,
                        }
                      }
                    ]
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            label: "Theme",
            name: "theme",
            // @ts-ignore
            fields: [
              {
                type: "string",
                label: "Primary Color",
                name: "color",
                ui: {
                  // @ts-ignore
                  component: ColorPickerInput,
                },
              },
            ],
          },
        ],
      },
      {
        label: "Pages",
        name: "page",
        path: "content/pages",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "home") {
              return `/`;
            }
            if (document._sys.filename === "about") {
              return `/about`;
            }
            return undefined;
          },
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            description:
              "The title of the page. This is used to display the title in the CMS",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sections",
            ui: {
              visualSelector: true,
            },
            templates: [
              // @ts-ignore
              heroBlockSchema,
              // @ts-ignore
              featureBlockSchema,
              // @ts-ignore
              contentBlockSchema,
              // @ts-ignore
              tableBlockSchema,
              // @ts-ignore
              downloadBlockSchema,
            ],
          },
        ],
      },
    ],
  },
});

export default config;
