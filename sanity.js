import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

console.log(
  "env: ",
  process.env.SANITY_PROJECT_ID,
  process.env.SANITY_API_VERSION
);
const client = createClient({
  projectId: "3cxupwyp",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-10-25",
});
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;
