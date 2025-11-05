declare module "opentype.js" {
  type QuadCommand = {
    type: "Q";
    x1: number;
    y1: number;
    x: number;
    y: number;
  };

  type CubicCommand = {
    type: "C";
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x: number;
    y: number;
  };

  type LineCommand = {
    type: "M" | "L";
    x: number;
    y: number;
  };

  type CloseCommand = {
    type: "Z";
  };

  type PathCommand = QuadCommand | CubicCommand | LineCommand | CloseCommand;

  class Path {
    commands: PathCommand[];
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    quadraticCurveTo(x1: number, y1: number, x: number, y: number): void;
    curveTo(x1: number, y1: number, x2: number, y2: number, x: number, y: number): void;
    closePath(): void;
  }

  type ContourPoint = {
    x: number;
    y: number;
    onCurve: boolean;
    lastPointOfContour: boolean;
  };

  interface Glyph {
    name?: string;
    advanceWidth?: number;
    getPath(x?: number, y?: number, fontSize?: number): Path;
    getContours(): ContourPoint[][];
  }

  interface Font {
    unitsPerEm: number;
    charToGlyph(char: string): Glyph;
  }

  function parse(buffer: ArrayBuffer): Font;

  const opentype: {
    Path: typeof Path;
    parse: typeof parse;
    load: (url: string, callback: (err: unknown, font: Font) => void) => void;
  };

  export { Path, PathCommand, Font, Glyph, parse };

  export default opentype;
}

