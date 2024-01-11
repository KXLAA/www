import { makeSource } from "contentlayer/source-files";

import { CONTENT_DIR_PATH } from "./content/defs/_shared";
import { Article } from "./content/defs/article";
import { Note } from "./content/defs/note";
import { Project } from "./content/defs/project";

export default makeSource({
  contentDirPath: CONTENT_DIR_PATH,
  documentTypes: [Project, Article, Note],
  mdx: {},
});
