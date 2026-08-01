function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function getHeadings(content) {
  const headingRegex = /^(##|###)\s+(.+)$/gm;

  const headings = [];

  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();

    headings.push({
      level,
      text,
      id: createSlug(text),
    });
  }

  return headings;
}