import React from "react";
import { Section } from "../util/section";
import { Container } from "../util/container";
import { mdToString } from "../util/md-to-string";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { components, templates } from "../util/md-components";

export const Table = ({ data, parentField }) => {
  return (
    <Section color={data.color}>
      <Container
        className="flex justify-center overflow-x-auto text-gray-900"
        size="medium"
        width="medium"
      >
        <table className={`table ${
          data.full_width ? 'w-full' : 'w-auto'
        }`}>
          <thead data-tinafield={`${parentField}.column_headers`}>
            <tr>
              {
                data.column_headers?.map((header, i) =>
                  <th key={i}>
                    <TinaMarkdown components={components} content={header.body} />
                  </th>
                )
              }
            </tr>
          </thead>
          <tbody data-tinafield={`${parentField}.rows`}>
            {
              data.rows?.map((row, i) =>
                <tr key={i}>
                  {row.columns?.map((column, j) =>
                    <td key={j} className={`${
                      data.color !== "primary" && data.color !== "tint" ? `bg-gray-50` : ''
                    }`}>
                      <TinaMarkdown components={components} content={column.body} />
                    </td>
                  )}
                </tr>
              )
            }
          </tbody>
        </table>
      </Container>
    </Section>
  );
};

export const tableBlockSchema = {
  name: "table",
  label: "Table",
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
      type: "boolean",
      label: "Full Width",
      name: "full_width",
    },
    {
      type: "object",
      label: "Column Headers",
      name: "column_headers",
      list: true,
      ui: {
        itemProps: (props) => mdToString(props),
      },
      fields: [
        {
          type: "rich-text",
          label: "Body",
          name: "body",
          templates
        },
      ],
    },
    {
      type: "object",
      label: "Rows",
      name: "rows",
      list: true,
      fields: [
        {
          type: "object",
          label: "Columns",
          name: "columns",
          list: true,
          ui: {
            itemProps: (props) => mdToString(props),
          },
          fields: [
            {
              type: "rich-text",
              label: "Body",
              name: "body",
              templates
            },
          ],
        },
      ],
    },
  ],
};
