function splitTitle(title: string): string[] {
  const arr = title.split(" ");
  const last = arr.pop() || "";
  const first = arr.join(" ");

  return [first, last];
}

export default splitTitle;
