import { makeSource } from "contentlayer/source-files";

import { CONTENT_DIR_PATH } from "./lib/contentlayer/definitions/_shared";
import { Article } from "./lib/contentlayer/definitions/article";
import { Project } from "./lib/contentlayer/definitions/project";
import { UI } from "./lib/contentlayer/definitions/ui";

export default makeSource({
  contentDirPath: CONTENT_DIR_PATH,
  documentTypes: [Project, Article, UI],
  mdx: {},
});
