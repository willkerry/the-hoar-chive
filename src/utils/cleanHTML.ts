function cleanHTML(html: string): string {
  return html.replace(/https:\/\/thehoar.org\//g, "/");
}

export default cleanHTML;
