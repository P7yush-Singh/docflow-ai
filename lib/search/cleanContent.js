export function cleanContent(content) {
  if (!content) {
    return "";
  }

  return content
    // Remove fenced code blocks
    .replace(/```[\s\S]*?```/g, " ")

    // Remove images: ![alt](url)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")

    // Keep link text but remove URL
    // [Redis](https://redis.io) → Redis
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")

    // Remove HTML / MDX tags
    .replace(/<[^>]*>/g, " ")

    // Remove Markdown symbols
    .replace(/[#>*_`~-]/g, " ")

    // Replace multiple spaces/newlines with one space
    .replace(/\s+/g, " ")

    .trim();
}