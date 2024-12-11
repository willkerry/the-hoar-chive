function makePath(
  date: string | Date,
  slug: string
): {
  href: string;
  y: string;
  m: string;
  d: string;
} {
  const dateObject = new Date(date);
  const y = dateObject.getFullYear().toString();
  const m = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const d = dateObject.getDate().toString().padStart(2, "0");
  const href = `/${y}/${m}/${d}/${slug}`;

  return {
    href,
    y,
    m,
    d,
  };
}

export default makePath;
