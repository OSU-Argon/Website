// tina/config.tsx
import { defineStaticConfig } from "tinacms";

// components/blocks/content.tsx
import React5 from "react";

// components/util/md-to-string.tsx
import React2 from "react";
import { renderToString as renderToString2 } from "react-dom/server";
import { TinaMarkdown as TinaMarkdown2 } from "tinacms/dist/rich-text";

// components/util/md-components.tsx
import React from "react";
import Image from "next/image";
import { renderToString } from "react-dom/server";
import { TinaMarkdown } from "tinacms/dist/rich-text";
var components = {
  Subscript: (props) => {
    return React.createElement("sub", null, props?.value);
  },
  Superscript: (props) => {
    return React.createElement("sup", null, props?.value);
  },
  Anchor: (props) => {
    return React.createElement("a", { id: props?.value });
  },
  Image: (props) => {
    const figure = props?.image && React.createElement("figure", { className: "bg-white rounded-lg drop-shadow-lg", style: {
      width: props?.width,
      float: props?.float || "none",
      marginLeft: props?.float === "right" ? "1em" : "auto",
      marginRight: props?.float === "left" ? "1em" : "auto",
      marginTop: 0,
      marginBottom: "1em"
    } }, React.createElement("div", { style: {
      height: props?.height,
      width: props?.width,
      position: "relative",
      margin: 0
    } }, React.createElement(
      Image,
      {
        className: `w-full m-0 object-cover ${props?.showCaption ? "rounded-tl-lg rounded-tr-lg" : "rounded-lg"}`,
        src: props?.image,
        fill: true,
        sizes: props?.width + "px",
        alt: renderToString(React.createElement(TinaMarkdown, { components, content: props?.caption }))
      }
    )), props?.showCaption && React.createElement("figcaption", { className: "px-5 py-px mt-0 text-center text-lg font-semibold" }, React.createElement("div", { className: "-my-4" }, React.createElement(TinaMarkdown, { content: props?.caption })))) || React.createElement(React.Fragment, null);
    return props?.hyperlink && React.createElement("a", { href: props?.hyperlink }, figure) || figure;
  }
};
var templates = [
  {
    name: "Subscript",
    label: "Subscript",
    inline: true,
    fields: [
      {
        type: "string",
        label: "Value",
        name: "value",
        required: true,
        isTitle: true
      }
    ]
  },
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
        isTitle: true
      }
    ]
  },
  {
    name: "Anchor",
    label: "Anchor",
    inline: true,
    fields: [
      {
        type: "string",
        label: "Value",
        name: "value",
        required: true,
        isTitle: true
      }
    ]
  },
  {
    name: "Image",
    label: "Image",
    ui: {
      itemProps: (props) => {
        return {
          label: renderToString(
            React.createElement(TinaMarkdown, { components, content: props?.caption })
          ).replace(/<\/?[^>]+(>|$)/g, "").slice(0, 30) + "..."
        };
      }
    },
    fields: [
      {
        type: "image",
        label: "Image",
        name: "image",
        required: true
      },
      {
        type: "boolean",
        label: "Show Caption",
        name: "showCaption"
      },
      {
        type: "rich-text",
        label: "Caption",
        name: "caption",
        required: true,
        templates: [
          {
            name: "Subscript",
            label: "Subscript",
            inline: true,
            fields: [
              {
                type: "string",
                label: "Value",
                name: "value",
                required: true,
                isTitle: true
              }
            ]
          },
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
                isTitle: true
              }
            ]
          },
          {
            name: "Anchor",
            label: "Anchor",
            inline: true,
            fields: [
              {
                type: "string",
                label: "Value",
                name: "value",
                required: true,
                isTitle: true
              }
            ]
          }
        ]
      },
      {
        type: "string",
        label: "Hyperlink",
        name: "hyperlink"
      },
      {
        type: "number",
        label: "Width in Pixels",
        name: "width",
        required: true
      },
      {
        type: "number",
        label: "Height in Pixels",
        name: "height",
        required: true
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
    ]
  }
];

// components/util/md-to-string.tsx
var mdToString = (props, label = "Item") => {
  try {
    if (props?.body) {
      const mdString = renderToString2(
        React2.createElement(TinaMarkdown2, { components, content: props.body })
      ).replace(/<\/?[^>]+(>|$)/g, "");
      if (mdString.length > 100)
        label = mdString.slice(0, 100) + "...";
      else if (mdString.length > 0)
        label = mdString;
    }
  } catch (e) {
    console.error(e);
  }
  return { label };
};

// components/util/container.tsx
import React3 from "react";

// components/util/section.tsx
import React4 from "react";

// components/blocks/content.tsx
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown as TinaMarkdown3 } from "tinacms/dist/rich-text";
var contentBlockSchema = {
  name: "content",
  label: "Content",
  ui: {
    itemProps: (props) => mdToString(props, "Content")
  },
  fields: [
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" }
      ]
    },
    {
      type: "string",
      label: "Top Padding",
      name: "top_padding",
      options: [
        { label: "None", value: "pt-0" },
        { label: "Small", value: "pt-4" },
        { label: "Medium", value: "pt-6" },
        { label: "Large", value: "pt-8" }
      ]
    },
    {
      type: "string",
      label: "Bottom Padding",
      name: "bottom_padding",
      options: [
        { label: "None", value: "pb-0" },
        { label: "Small", value: "pb-4" },
        { label: "Medium", value: "pb-6" },
        { label: "Large", value: "pb-8" }
      ]
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      templates
    }
  ]
};

// components/blocks/features.tsx
import React11 from "react";

// components/util/actions.tsx
import Link2 from "next/link";
import * as React10 from "react";
import { tinaField as tinaField3 } from "tinacms/dist/react";

// components/fields/icon.tsx
import * as React9 from "react";
import { GoCircleSlash } from "react-icons/go";
import { Button, wrapFieldsWithMeta } from "tinacms";
import { Popover, Transition } from "@headlessui/react";

// components/util/icon.tsx
import * as React8 from "react";

// components/layout/layout.tsx
import React7 from "react";
import useScrollbarSize from "react-scrollbar-size";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { TinaMarkdown as TinaMarkdown4 } from "tinacms/dist/rich-text";
import { tinaField as tinaField2 } from "tinacms/dist/react";
import Image2 from "next/image";
import { BiMenu as MenuIcon, BiArrowToRight as CloseIcon } from "react-icons/bi";

// content/global/index.json
var global_default = {
  header: {
    name: "OSU Argon Geochronology Lab",
    color: "default",
    nav: [
      {
        href: "home",
        label: "Home"
      },
      {
        href: "about-us",
        label: "Research Team"
      },
      {
        href: "services",
        label: "Services"
      },
      {
        href: "instruments",
        label: "Instruments"
      },
      {
        href: "publications",
        label: "Publications"
      },
      {
        href: "software",
        label: "Software"
      },
      {
        href: "contact-us",
        label: "Contact Us"
      }
    ]
  },
  footer: {
    sections: [
      {
        title: "Supported By",
        content: "",
        links: [
          {
            link: "https://www.nsf.gov/dir/index.jsp?org=GEO",
            size: "large",
            image: {
              src: "/uploads/nsf.png"
            }
          },
          {
            link: "https://oregonstate.edu/",
            size: "large",
            image: {
              src: "/uploads/osu.png"
            }
          }
        ]
      },
      {
        title: "Mailing Address",
        content: "OSU Argon Geochronology Laboratory\n\nAttn: Dan Miggins\n\n[Oregon State University](https://oregonstate.edu/)\n\n104 CEOAS Admin. Bldg.\n\nCorvallis, OR 97331-5503\n"
      },
      {
        title: "Contact Us",
        content: "[geochronology@oregonstate.edu](mailto:geochronology@oregonstate.edu)\n",
        links: [
          {
            link: "https://www.instagram.com/OSU_Argon",
            icon: "BiLogoInstagramAlt"
          },
          {
            link: "https://twitter.com/OSU_Argon",
            image: {
              src: "/uploads/twitter-x.png"
            }
          }
        ]
      }
    ]
  },
  theme: {
    color: "yellow"
  }
};

// components/layout/theme.tsx
import * as React6 from "react";
var ThemeContext = React6.createContext(global_default.theme);
var useTheme = () => React6.useContext(ThemeContext);

// components/util/icon.tsx
import * as BoxIcons from "react-icons/bi";
var IconOptions = {
  ...BoxIcons
};
var iconColorClass = {
  blue: {
    regular: "text-blue-400",
    circle: "bg-blue-400 dark:bg-blue-500 text-blue-50"
  },
  teal: {
    regular: "text-teal-400",
    circle: "bg-teal-400 dark:bg-teal-500 text-teal-50"
  },
  green: {
    regular: "text-green-400",
    circle: "bg-green-400 dark:bg-green-500 text-green-50"
  },
  red: {
    regular: "text-red-400",
    circle: "bg-red-400 dark:bg-red-500 text-red-50"
  },
  pink: {
    regular: "text-pink-400",
    circle: "bg-pink-400 dark:bg-pink-500 text-pink-50"
  },
  purple: {
    regular: "text-purple-400",
    circle: "bg-purple-400 dark:bg-purple-500 text-purple-50"
  },
  orange: {
    regular: "text-orange-400",
    circle: "bg-orange-400 dark:bg-orange-500 text-orange-50"
  },
  yellow: {
    regular: "text-yellow-400",
    circle: "bg-yellow-400 dark:bg-yellow-500 text-yellow-50"
  },
  white: {
    regular: "text-white opacity-80",
    circle: "bg-white-400 dark:bg-white-500 text-white-50"
  }
};
var iconSizeClass = {
  xs: "w-6 h-6 flex-shrink-0",
  small: "w-8 h-8 flex-shrink-0",
  medium: "w-12 h-12 flex-shrink-0",
  large: "w-14 h-14 flex-shrink-0",
  xl: "w-16 h-16 flex-shrink-0",
  custom: ""
};
var Icon = ({
  data,
  parentColor = "",
  className = "",
  tinaField: tinaField8 = ""
}) => {
  if (IconOptions[data.name] === null || IconOptions[data.name] === void 0) {
    return null;
  }
  const { name, color, size = "medium", style = "regular" } = data;
  const theme = useTheme();
  const IconSVG = IconOptions[name];
  const iconSizeClasses = typeof size === "string" ? iconSizeClass[size] : iconSizeClass[Object.keys(iconSizeClass)[size]];
  const iconColor = color ? color === "primary" ? theme.color : color : theme.color;
  if (style == "circle") {
    return React8.createElement(
      "div",
      {
        "data-tinafield": tinaField8,
        className: `relative z-10 inline-flex items-center justify-center flex-shrink-0 ${iconSizeClasses} rounded-full ${iconColorClass[iconColor].circle} ${className}`
      },
      React8.createElement(IconSVG, { className: "w-2/3 h-2/3" })
    );
  } else {
    const iconColorClasses = iconColorClass[parentColor === "primary" && (iconColor === theme.color || iconColor === "primary") ? "white" : iconColor].regular;
    return React8.createElement(
      IconSVG,
      {
        "data-tinafield": tinaField8,
        className: `${iconSizeClasses} ${iconColorClasses} ${className}`
      }
    );
  }
};

// components/fields/icon.tsx
import { BiChevronRight } from "react-icons/bi";
var parseIconName = (name) => {
  const splitName = name.split(/(?=[A-Z])/);
  if (splitName.length > 1) {
    return splitName.slice(1).join(" ");
  } else {
    return name;
  }
};
var IconPickerInput = wrapFieldsWithMeta(({ input }) => {
  const [filter, setFilter] = React9.useState("");
  const filteredBlocks = React9.useMemo(() => {
    return Object.keys(IconOptions).filter((name) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  }, [filter]);
  const inputLabel = Object.keys(IconOptions).includes(input.value) ? parseIconName(input.value) : "Select Icon";
  const InputIcon = IconOptions[input.value] ? IconOptions[input.value] : null;
  return React9.createElement("div", { className: "relative z-[1000]" }, React9.createElement("input", { type: "text", id: input.name, className: "hidden", ...input }), React9.createElement(Popover, null, ({ open }) => React9.createElement(React9.Fragment, null, React9.createElement(Popover.Button, { as: "span" }, React9.createElement(
    Button,
    {
      className: `text-sm h-11 px-4 ${InputIcon ? "h-11" : "h-10"}`,
      size: "custom",
      rounded: "full",
      variant: open ? "secondary" : "white"
    },
    InputIcon && React9.createElement(InputIcon, { className: "w-7 mr-1 h-auto fill-current text-blue-500" }),
    inputLabel,
    !InputIcon && React9.createElement(BiChevronRight, { className: "w-5 h-auto fill-current opacity-70 ml-1" })
  )), React9.createElement("div", { className: "absolute w-full min-w-[192px] max-w-2xl -bottom-2 left-0 translate-y-full" }, React9.createElement(
    Transition,
    {
      enter: "transition duration-150 ease-out",
      enterFrom: "transform opacity-0 -translate-y-2",
      enterTo: "transform opacity-100 translate-y-0",
      leave: "transition duration-75 ease-in",
      leaveFrom: "transform opacity-100 translate-y-0",
      leaveTo: "transform opacity-0 -translate-y-2"
    },
    React9.createElement(Popover.Panel, { className: "relative overflow-hidden rounded-lg shadow-lg bg-white border border-gray-150 z-50" }, ({ close }) => React9.createElement("div", { className: "max-h-[24rem] flex flex-col w-full h-full" }, React9.createElement("div", { className: "bg-gray-50 p-2 border-b border-gray-100 z-10 shadow-sm" }, React9.createElement(
      "input",
      {
        type: "text",
        className: "bg-white text-sm rounded-sm border border-gray-100 shadow-inner py-1.5 px-2.5 w-full block placeholder-gray-200",
        onClick: (event) => {
          event.stopPropagation();
          event.preventDefault();
        },
        value: filter,
        onChange: (event) => {
          setFilter(event.target.value);
        },
        placeholder: "Filter..."
      }
    )), filteredBlocks.length === 0 && React9.createElement("span", { className: "relative text-center text-xs px-2 py-3 text-gray-300 bg-gray-50 italic" }, "No matches found"), filteredBlocks.length > 0 && React9.createElement("div", { className: "w-full grid grid-cols-6 auto-rows-auto p-2 overflow-y-auto" }, React9.createElement(
      "button",
      {
        className: "relative rounded-lg text-center text-xs py-2 px-3 flex-1 outline-none transition-all ease-out duration-150 hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50",
        key: "clear-input",
        onClick: () => {
          input.onChange("");
          setFilter("");
          close();
        }
      },
      React9.createElement(GoCircleSlash, { className: "w-6 h-auto text-gray-200" })
    ), filteredBlocks.map((name) => {
      return React9.createElement(
        "button",
        {
          className: "relative flex items-center justify-center rounded-lg text-center text-xs py-2 px-3 flex-1 outline-none transition-all ease-out duration-150 hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50",
          key: name,
          onClick: () => {
            input.onChange(name);
            setFilter("");
            close();
          }
        },
        React9.createElement(
          Icon,
          {
            data: {
              name,
              size: "custom",
              color: "blue"
            },
            className: "w-7 h-auto"
          }
        )
      );
    }))))
  )))));
});

// components/util/actions.tsx
import * as BoxIcons2 from "react-icons/bi";
var IconOptions2 = {
  ...BoxIcons2
};
var actionsSchema = {
  label: "Action Buttons",
  name: "actions",
  type: "object",
  list: true,
  ui: {
    defaultItem: {
      label: "Action Label",
      link: "/"
    },
    itemProps: (item) => ({ label: item.label })
  },
  fields: [
    {
      label: "Label",
      name: "label",
      type: "string"
    },
    {
      label: "Link",
      name: "link",
      type: "string"
    },
    {
      label: "Icon",
      name: "icon",
      type: "string",
      ui: {
        component: IconPickerInput
      }
    }
  ]
};

// components/blocks/features.tsx
import { TinaMarkdown as TinaMarkdown5 } from "tinacms/dist/rich-text";
import { tinaField as tinaField4 } from "tinacms/dist/react";
var defaultFeature = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
  icon: {
    color: "",
    style: "float",
    name: ""
  }
};
var featureBlockSchema = {
  name: "features",
  label: "Features",
  ui: {
    defaultItem: {
      items: [defaultFeature, defaultFeature, defaultFeature]
    }
  },
  fields: [
    {
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title
          };
        },
        defaultItem: {
          ...defaultFeature
        }
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title"
        },
        {
          type: "rich-text",
          label: "Text",
          name: "text",
          templates
        },
        actionsSchema
      ]
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" }
      ]
    }
  ]
};

// components/blocks/hero.tsx
import React12 from "react";
import { TinaMarkdown as TinaMarkdown6 } from "tinacms/dist/rich-text";
import { tinaField as tinaField5 } from "tinacms/dist/react";
var heroBlockSchema = {
  name: "hero",
  label: "Hero",
  ui: {
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: "This Big Text is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo."
    }
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
          type: "image"
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string"
        }
      ]
    },
    {
      label: "Headline",
      name: "headline",
      type: "rich-text",
      templates
    },
    actionsSchema
  ]
};

// components/blocks/table.tsx
import React13 from "react";
import { tinaField as tinaField6 } from "tinacms/dist/react";
import { TinaMarkdown as TinaMarkdown7 } from "tinacms/dist/rich-text";
var tableBlockSchema = {
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
        { label: "Primary", value: "primary" }
      ]
    },
    {
      type: "boolean",
      label: "Full Width",
      name: "full_width"
    },
    {
      type: "object",
      label: "Column Headers",
      name: "column_headers",
      list: true,
      ui: {
        itemProps: (props) => mdToString(props, "Column Headers")
      },
      fields: [
        {
          type: "rich-text",
          label: "Body",
          name: "body",
          templates
        }
      ]
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
            itemProps: (props) => mdToString(props, "Columns")
          },
          fields: [
            {
              type: "rich-text",
              label: "Body",
              name: "body",
              templates
            }
          ]
        },
        {
          type: "string",
          label: "Color",
          name: "color",
          options: [
            { label: "Default", value: "default" },
            { label: "Tint", value: "tint" },
            { label: "Primary", value: "primary" }
          ]
        }
      ]
    }
  ]
};

// components/blocks/download.tsx
import Link3 from "next/link";
import React15 from "react";
import { tinaField as tinaField7 } from "tinacms/dist/react";

// components/fields/file-upload.tsx
import * as React14 from "react";
import { useCMS, wrapFieldsWithMeta as wrapFieldsWithMeta2, ImageUpload } from "tinacms";
import { useState as useState3 } from "react";
var FileUpload = wrapFieldsWithMeta2(
  (props) => {
    const ref = React14.useRef(null);
    const cms = useCMS();
    const { value } = props.input;
    const src = value;
    const [isUploading, setIsUploading] = useState3(false);
    let onClear;
    if (props.field.clearable) {
      onClear = () => props.input.onChange("");
    }
    React14.useEffect(() => {
      if (ref.current && props.field.experimental_focusIntent) {
        ref.current.focus();
      }
    }, [props.field.experimental_focusIntent, ref]);
    async function onChange(media) {
      if (media) {
        props.input.onChange(media);
      }
    }
    const uploadDir = props.field.uploadDir || (() => "");
    return React14.createElement(
      ImageUpload,
      {
        ref,
        value,
        src,
        loading: isUploading,
        onClick: () => {
          const directory = uploadDir(props.form.getState().values);
          cms.media.open({
            allowDelete: true,
            directory,
            onSelect: onChange
          });
        },
        onDrop: async ([file], fileRejections) => {
          setIsUploading(true);
          try {
            if (file) {
              const directory = uploadDir(props.form.getState().values);
              const [media] = await cms.media.persist([
                {
                  directory,
                  file
                }
              ]);
              if (media) {
                await onChange(media);
              }
            }
            const errorCodes = {
              "file-invalid-type": "Invalid file type",
              "file-too-large": "File too large",
              "file-too-small": "File too small",
              "too-many-files": "Too many files"
            };
            const printError = (error) => {
              const message = errorCodes[error.code];
              if (message) {
                return message;
              }
              console.error(error);
              return "Unknown error";
            };
            if (fileRejections.length > 0) {
              const messages = [];
              fileRejections.map((fileRejection) => {
                messages.push(
                  `${fileRejection.file.name}: ${fileRejection.errors.map((error) => printError(error)).join(", ")}`
                );
              });
              cms.alerts.error(() => {
                return React14.createElement(React14.Fragment, null, "Upload Failed. ", React14.createElement("br", null), messages.join(". "), ".");
              });
            }
          } catch (error) {
            console.error("Error uploading media asset: ", error);
          } finally {
            setIsUploading(false);
          }
        },
        onClear
      }
    );
  }
);

// components/blocks/download.tsx
import { BiSolidDownload } from "react-icons/bi";
var downloadBlockSchema = {
  name: "download",
  label: "File Download",
  ui: {
    itemProps: (props) => {
      console.log(props);
      if (props?.label.length > 100)
        return props?.label.slice(0, 100) + "...";
      else if (props?.label.length > 0)
        return props?.label;
      return "File Download";
    }
  },
  fields: [
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" }
      ]
    },
    {
      type: "string",
      label: "File",
      name: "src",
      component: FileUpload,
      uploadDir: () => "/downloads/",
      ui: {
        parse: (media) => `/uploads/downloads/${media.filename}`
      }
    },
    {
      label: "Label",
      name: "label",
      type: "string"
    },
    {
      label: "Icon",
      name: "icon",
      type: "boolean"
    }
  ]
};

// components/fields/color.tsx
import * as React16 from "react";
import { wrapFieldsWithMeta as wrapFieldsWithMeta3 } from "tinacms";
var colorOptions = [
  "blue",
  "teal",
  "green",
  "yellow",
  "orange",
  "red",
  "pink",
  "purple",
  "white"
];
var ColorPickerInput = wrapFieldsWithMeta3(({ input }) => {
  const inputClasses = {
    blue: "bg-blue-500 border-blue-600",
    teal: "bg-teal-500 border-teal-600",
    green: "bg-green-500 border-green-600",
    yellow: "bg-yellow-500 border-yellow-600",
    orange: "bg-orange-500 border-orange-600",
    red: "bg-red-500 border-red-600",
    pink: "bg-pink-500 border-pink-600",
    purple: "bg-purple-500 border-purple-600",
    white: "bg-white border-gray-150"
  };
  return React16.createElement(React16.Fragment, null, React16.createElement("input", { type: "text", id: input.name, className: "hidden", ...input }), React16.createElement("div", { className: "flex gap-2 flex-wrap" }, colorOptions.map((color) => {
    return React16.createElement(
      "button",
      {
        className: `w-9 h-9 rounded-full shadow border ${inputClasses[color]} ${input.value === color ? "ring-[3px] ring-offset-2 ring-blue-400" : ""}`,
        onClick: () => {
          input.onChange(color);
        }
      }
    );
  })));
});

// tina/config.tsx
var config = defineStaticConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
  process.env.HEAD,
  // Netlify branch env
  token: process.env.TINA_TOKEN,
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads"
    }
  },
  build: {
    publicFolder: "public",
    // The public asset folder for your framework
    outputFolder: "admin"
    // within the public folder
  },
  schema: {
    collections: [
      {
        label: "Global",
        name: "global",
        path: "content/global",
        format: "json",
        ui: {
          global: true
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
                name: "name"
              },
              {
                type: "string",
                label: "Color",
                name: "color",
                options: [
                  { label: "Default", value: "default" },
                  { label: "Primary", value: "primary" }
                ]
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
                    label: "Home"
                  }
                },
                fields: [
                  {
                    type: "string",
                    label: "Link",
                    name: "href"
                  },
                  {
                    type: "string",
                    label: "Label",
                    name: "label"
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            label: "Footer",
            name: "footer",
            fields: [
              {
                type: "object",
                label: "Sections",
                name: "sections",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.title };
                  }
                },
                fields: [
                  {
                    type: "string",
                    label: "Title",
                    name: "title"
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
                        required: true
                      },
                      {
                        type: "string",
                        label: "Size",
                        name: "size",
                        options: [
                          { label: "Small", value: "small" },
                          { label: "Large", value: "large" }
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
                            type: "image"
                          }
                        ]
                      },
                      {
                        label: "Icon",
                        name: "icon",
                        type: "string",
                        ui: {
                          component: IconPickerInput
                        }
                      }
                    ]
                  }
                ]
              }
            ]
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
                  component: ColorPickerInput
                }
              }
            ]
          }
        ]
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
            return void 0;
          }
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            description: "The title of the page. This is used to display the title in the CMS",
            isTitle: true,
            required: true
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sections",
            ui: {
              visualSelector: true
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
              downloadBlockSchema
            ]
          }
        ]
      }
    ]
  }
});
var config_default = config;
export {
  config_default as default
};
