import readingTime from "reading-time";

const WORDS_PER_MINUTE = 200;

/**
 * Calculate reading time for content
 */
export function calculateReadingTime(content: string): number {
  const stats = readingTime(content, { wordsPerMinute: WORDS_PER_MINUTE });
  return Math.ceil(stats.minutes);
}

/**
 * Calculate combined reading time for parent + all subposts
 */
export function calculateCombinedReadingTime(
  parentContent: string,
  subpostsContent: string[],
): number {
  const allContent = [parentContent, ...subpostsContent].join("\n");
  return calculateReadingTime(allContent);
}
