function prettyDate(date: string | Date): string {
  const d = new Date(date);
  const str = d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return str;
}

export default prettyDate;
