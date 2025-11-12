const CLOUDINARY_BASE = "https://res.cloudinary.com";

export const CLOUDINARY_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wHwAFJgL+Y1fNUQAAAABJRU5ErkJggg==";

type BuildCloudinaryOptions = {
  width?: number;
  height?: number;
  quality?: number;
  format?: string;
};

function injectTransformations(src: string, transformation: string): string {
  if (!src.startsWith(CLOUDINARY_BASE)) {
    return src;
  }

  const parts = src.split("/upload/");
  if (parts.length !== 2) {
    return src;
  }

  return `${parts[0]}/upload/${transformation}/${parts[1]}`;
}

export function buildCloudinaryUrl(src: string, options: BuildCloudinaryOptions = {}): string {
  const transformations: string[] = [];

  transformations.push("f_auto");
  transformations.push(`q_${options.quality ?? "auto"}`);

  if (options.width) {
    transformations.push(`w_${options.width}`);
    transformations.push("c_limit");
  }

  if (options.height) {
    transformations.push(`h_${options.height}`);
  }

  if (options.format) {
    transformations.push(`fl_${options.format}`);
  }

  const transformationStr = transformations.join(",");
  return injectTransformations(src, transformationStr);
}
