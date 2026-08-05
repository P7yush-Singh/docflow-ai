import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_PATH = path.join(
  process.cwd(),
  "content"
);

function getMDXFiles(directory) {
  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(
      directory,
      entry.name
    );

    if (entry.isDirectory()) {
      files = [
        ...files,
        ...getMDXFiles(fullPath),
      ];
    }

    if (
      entry.isFile() &&
      entry.name.endsWith(".mdx")
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

function createSlug(filePath) {
  return path
    .relative(CONTENT_PATH, filePath)
    .replace(/\\/g, "/")
    .replace(/\.mdx$/, "");
}

export function getAllDocs() {
  const files = getMDXFiles(CONTENT_PATH);

  return files.map((filePath) => {
    const source = fs.readFileSync(
      filePath,
      "utf8"
    );

    const { data, content } = matter(source);

    return {
      slug: createSlug(filePath),

      title: data.title || "Untitled",

      description: data.description || "",

      content,
    };
  });
}