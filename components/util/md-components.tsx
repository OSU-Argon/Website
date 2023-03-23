import React from "react";
import { renderToString } from 'react-dom/server';
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import type { Components } from "tinacms/dist/rich-text";

export const components: Components<{
  Superscript: {
    value: string;
  };
  Image: {
    image: string;
    showCaption: boolean;
    caption: TinaMarkdownContent;
    width: number;
    height: number;
    float: 'left' | 'none' | 'right';
  };
}> = {
  Superscript: (props) => {
    return (
      <sup>{props?.value}</sup>
    );
  },
  Image: (props) => {
    return (props?.image &&
      <figure className="bg-white rounded-lg drop-shadow-lg" style={{
        width: props?.width || 'auto',
        float: props?.float || 'none',
        marginLeft: props?.float === 'right' ? '1em' : 'auto',
        marginRight: props?.float === 'left' ? '1em' : 'auto',
        marginTop: 0,
        marginBottom: '1em'
      }}>
        <img className={`w-full object-cover ${props?.showCaption ? 'rounded-tl-lg rounded-tr-lg' : 'rounded-lg'}`}
          src={props?.image}
          style={{
            height: props?.height || 'auto',
          }}
        />
          {props?.showCaption &&
            <figcaption className="px-5 py-px mt-0 text-center text-lg font-semibold">
              <div className="-my-4">
                <TinaMarkdown content={props?.caption} />
              </div>
            </figcaption>
          }
      </figure> || <></>
    );
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const templates: any[] = [
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
  },
  {
    name: "Image",
    label: "Image",
    ui: {
      itemProps: (props) => {
        return {
          label: renderToString(
            <TinaMarkdown components={components} content={props?.caption} />
          ).replace(/<\/?[^>]+(>|$)/g, "").slice(0, 30) + '...',
        };
      },
    },
    fields: [
      {
        type: "image",
        label: "Image",
        name: "image",
        required: true,
      },
      {
        type: "boolean",
        label: "Show Caption",
        name: "showCaption",
      },
      {
        type: "rich-text",
        label: "Caption",
        name: "caption",
        required: true,
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
          },
        ],
      },
      {
        type: "number",
        label: "Width in Pixels",
        name: "width",
      },
      {
        type: "number",
        label: "Height in Pixels",
        name: "height",
      },
      {
        label: "Float",
        name: "float",
        type: "string",
        options: [{
          value: "left",
          label: "Left"
        }, {
          value: "none",
          label: "None"
        }, {
          value: "right",
          label: "Right"
        }]
      }
    ],
  }
];
