/**
 * Check if a post ID represents a subpost
 * @example isSubpost("my-post/subpost") // true
 * @example isSubpost("my-post") // false
 */
export function isSubpost(id: string): boolean {
  return id.includes("/");
}

/**
 * Extract parent ID from subpost ID
 * @example getParentId("my-post/subpost") // "my-post"
 * @example getParentId("my-post") // null
 */
export function getParentId(subpostId: string): string | null {
  if (!isSubpost(subpostId)) return null;
  return subpostId.split("/")[0];
}

/**
 * Get all subpost IDs for a parent post
 */
export function getSubpostIds(
  parentId: string,
  allPostIds: string[],
): string[] {
  return allPostIds
    .filter((id) => id.startsWith(`${parentId}/`) && id.split("/").length === 2)
    .sort();
}

/**
 * Check if a post has subposts
 */
export function hasSubposts(postId: string, allPostIds: string[]): boolean {
  return getSubpostIds(postId, allPostIds).length > 0;
}

/**
 * Get adjacent posts for navigation (respects hierarchy)
 */
export function getAdjacentPosts(
  currentId: string,
  allSortedIds: string[],
): { prev: string | null; next: string | null } {
  const currentIndex = allSortedIds.indexOf(currentId);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? allSortedIds[currentIndex - 1] : null,
    next:
      currentIndex < allSortedIds.length - 1
        ? allSortedIds[currentIndex + 1]
        : null,
  };
}
