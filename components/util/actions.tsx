import Link from "next/link";
import * as React from "react";
import { tinaField } from 'tinacms/dist/react'
import { BiRightArrowAlt } from "react-icons/bi";

export const Actions = ({
  className = "",
  actions,
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-y-4 gap-x-6 ${className}`}>
      {actions &&
        actions.map((action, index) =>
          <Link key={index} href={action.link ? action.link : "/"}>
            <button
              data-tina-field={tinaField(action)}
              className="btn btn-primary btn-lg rounded-lg"
            >
              {action.label}
              {action.icon && (
                <BiRightArrowAlt
                  className={`ml-1 -mr-1 w-6 h-6 opacity-80`}
                />
              )}
            </button>
          </Link>
        )}
    </div>
  );
};
