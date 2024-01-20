import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '460fee003b57ee96e3ace7728a3ef0b67cba5f5e', queries,  });
export default client;
  