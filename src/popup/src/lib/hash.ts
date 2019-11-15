export const sha256 = () => {};
// export const sha256 = async (text: string): Promise<string> => {
//   const buffer = new TextEncoder().encode(text);
//   const hash = await crypto.subtle.digest("SHA-256", buffer);
//   return btoa(String.fromCharCode.apply(null, new Uint8Array(hash)));
// };