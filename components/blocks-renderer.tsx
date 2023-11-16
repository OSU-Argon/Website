import React from "react";
import type { Page } from "../tina/__generated__/types";
import { Content } from "./blocks/content";
import { Features } from "./blocks/features";
import { Hero } from "./blocks/hero";
import { Table } from "./blocks/table";
import { Download } from "./blocks/download";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
            switch (block.__typename) {
              case "PageBlocksContent":
                return (
                  <div
                    key={i + block.__typename}
                  >
                    <Content data={block}/>
                  </div>
                );
              case "PageBlocksHero":
                return (
                  <div
                    key={i + block.__typename}
                  >
                    <Hero data={block}/>
                  </div>
                );
              case "PageBlocksFeatures":
                return (
                  <div
                    key={i + block.__typename}
                  >
                    <Features data={block}/>
                  </div>
                );
              case "PageBlocksTable":
                return (
                  <div
                    key={i + block.__typename}
                  >
                    <Table data={block}/>
                  </div>
                );
              case "PageBlocksDownload":
                return (
                  <div
                    key={i + block.__typename}
                  >
                    <Download data={block}/>
                  </div>
                );
              default:
                return null;
            }
          })
        : null}
    </>
  );
};
