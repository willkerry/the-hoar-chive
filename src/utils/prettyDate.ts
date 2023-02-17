function prettyDate(date: string): string {
  const d = new Date(date);
  const str = d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return str;
}

export default prettyDate;
