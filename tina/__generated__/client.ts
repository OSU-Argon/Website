import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'https://content.tinajs.io/1.4/content/9e72e978-8aaa-4985-998b-082ad58c2b54/github/production', token: '460fee003b57ee96e3ace7728a3ef0b67cba5f5e', queries,  });
export default client;
  