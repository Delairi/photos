export function encodeUrlPreserveSlash(url:string) {
  try {
    const parsed = new URL(url);
    parsed.pathname = parsed.pathname
      .split("/")
      .map(segment => encodeURIComponent(decodeURIComponent(segment)))
      .join("/");
    return parsed.toString();
  } catch {
    return url
      .split("/")
      .map((segment, i) => {
        return i === 0 && segment === "" ? "" : encodeURIComponent(decodeURIComponent(segment));
      })
      .join("/");
  }
}