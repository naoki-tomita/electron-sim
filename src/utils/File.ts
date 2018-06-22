const extNames = ["png", "jpg", "jpeg", "bmp", "gif"];
export function isImage(ext: string): boolean {
  return extNames.includes(ext.substr(1));
}

export function getImageDataUrl(ext: string, base64Txt: string) {
  return `data:image/${ext.substr(1)};base64,${base64Txt}`;
}