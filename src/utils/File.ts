const extNames = ["png", "jpg", "jpeg", "bmp", "gif"];
export function isImage(ext: string): boolean {
  return extNames.includes(ext.toLowerCase().substr(1));
}

export function getImageDataUrl(ext: string, base64Txt: string) {
  return `data:image/${ext.toLowerCase().substr(1)};base64,${base64Txt}`;
}
