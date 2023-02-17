function makeRelative(
  path: string,
  replacement: string = "/",
  root: string = "https://thehoar.org/"
): string {
  return path.replace(root, replacement);
}

export default makeRelative;
