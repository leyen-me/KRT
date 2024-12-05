export const isPathInWhiteList = (
  path: string,
  whiteList: string[]
): boolean => {
  return whiteList.some((whitePath) => {
    // Handle /** suffix (match all subdirectories)
    if (whitePath.endsWith("/**")) {
      const basePattern = whitePath.slice(0, -2);
      return path.startsWith(basePattern);
    }

    // Handle /* suffix (match current level only)
    if (whitePath.endsWith("/*")) {
      const basePattern = whitePath.slice(0, -1);
      const pathParts = path.split("/");
      const patternParts = basePattern.split("/");
      return (
        pathParts.length === patternParts.length && path.startsWith(basePattern)
      );
    }

    // Handle * wildcard (match single file or directory name)
    if (whitePath.includes("*")) {
      const regexPattern = whitePath.split("*").map(escapeRegExp).join(".*");
      return new RegExp(`^${regexPattern}$`).test(path);
    }

    // Exact match
    return path === whitePath;
  });
};

// Helper function: escape special characters in regular expressions
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
