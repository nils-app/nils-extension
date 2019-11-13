export const sha256 = async (text: string): string => {
  const buffer = new TextEncoder("utf-8").encode(text);
  const hash = await crypto.subtle.digest("SHA-256", buffer);
  return btoa(String.fromCharCode.apply(null, new Uint8Array(hash)));
};