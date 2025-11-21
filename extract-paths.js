const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');

const FONT_PATH = path.join(process.cwd(), 'public/fonts/Monoton-Regular.ttf');
const NAME = "EDUARDO NETO";
const FONT_SIZE = 108;
const LETTER_GAP = 20;
const WORD_GAP = 110;
const BASELINE_Y = FONT_SIZE;
const PATH_DECIMALS = 3;
const EPSILON = 0.001;

const format = (value) => Number(value.toFixed(PATH_DECIMALS));

function findBottomLeftIndex(contour) {
  let targetIndex = -1;
  let bestX = Number.POSITIVE_INFINITY;
  let bestY = Number.POSITIVE_INFINITY;

  for (let i = 0; i < contour.length; i += 1) {
    const point = contour[i];
    if (!point.onCurve) {
      continue;
    }

    if (point.x < bestX - EPSILON || (Math.abs(point.x - bestX) <= EPSILON && point.y < bestY - EPSILON)) {
      bestX = point.x;
      bestY = point.y;
      targetIndex = i;
    }
  }

  return targetIndex;
}

function rotateContour(contour) {
  if (contour.length === 0) {
    return contour;
  }

  let targetIndex = findBottomLeftIndex(contour);

  if (targetIndex === -1) {
    targetIndex = 0;
  }

  const startIndex = (targetIndex + 1) % contour.length;
  return contour.map((_, idx) => {
    const source = contour[(startIndex + idx) % contour.length];
    return {
      x: source.x,
      y: source.y,
      onCurve: source.onCurve,
      lastPointOfContour: idx === contour.length - 1,
    };
  });
}

function contourToPath(contour, opentype) {
  const path = new opentype.Path();
  if (contour.length === 0) {
    return path;
  }

  let curr = contour[contour.length - 1];
  let next = contour[0];

  if (curr.onCurve) {
    path.moveTo(curr.x, curr.y);
  } else if (next.onCurve) {
    path.moveTo(next.x, next.y);
  } else {
    path.moveTo((curr.x + next.x) * 0.5, (curr.y + next.y) * 0.5);
  }

  for (let i = 0; i < contour.length; i += 1) {
    curr = next;
    next = contour[(i + 1) % contour.length];

    if (curr.onCurve) {
      path.lineTo(curr.x, curr.y);
    } else {
      let next2 = next;

      if (next && !next.onCurve) {
        next2 = {
          x: (curr.x + next.x) * 0.5,
          y: (curr.y + next.y) * 0.5,
          onCurve: true,
          lastPointOfContour: false,
        };
      }

      path.quadraticCurveTo(curr.x, curr.y, next2.x, next2.y);
    }
  }

  path.closePath();
  return path;
}

function commandsToPathData(commands, offsetX, scale) {
  const segments = [];

  for (const command of commands) {
    if (command.type === "M") {
      segments.push(`M${format(offsetX + command.x * scale)} ${format(BASELINE_Y - command.y * scale)}`);
    } else if (command.type === "L") {
      segments.push(`L${format(offsetX + command.x * scale)} ${format(BASELINE_Y - command.y * scale)}`);
    } else if (command.type === "Q") {
      segments.push(
        `Q${format(offsetX + command.x1 * scale)} ${format(BASELINE_Y - command.y1 * scale)} ${format(
          offsetX + command.x * scale,
        )} ${format(BASELINE_Y - command.y * scale)}`,
      );
    } else if (command.type === "C") {
      segments.push(
        `C${format(offsetX + command.x1 * scale)} ${format(BASELINE_Y - command.y1 * scale)} ${format(
          offsetX + command.x2 * scale,
        )} ${format(BASELINE_Y - command.y2 * scale)} ${format(offsetX + command.x * scale)} ${format(
          BASELINE_Y - command.y * scale,
        )}`,
      );
    } else if (command.type === "Z") {
      segments.push("Z");
    }
  }

  return segments.join(" ");
}

async function main() {
  try {
    const font = await opentype.load(FONT_PATH);
    const scale = FONT_SIZE / font.unitsPerEm;
    let cursor = 0;
    const letters = NAME.split("");
    const glyphsData = [];

    for (let i = 0; i < letters.length; i += 1) {
      const char = letters[i];

      if (char === " ") {
        glyphsData.push({ char, paths: [] });
        const gap = i === letters.length - 1 ? 0 : letters[i + 1] === " " ? WORD_GAP : LETTER_GAP;
        cursor += gap;
        continue;
      }

      const glyph = font.charToGlyph(char);
      glyph.getPath();
      const contours = glyph.getContours();
      
      // Sort contours: Top-to-bottom, then Left-to-right
      // We calculate the bounding box of each contour to determine order
      const contourBounds = contours.map((contour, index) => {
        let minX = Infinity, minY = Infinity;
        for (const p of contour) {
          if (p.onCurve) {
            minX = Math.min(minX, p.x);
            minY = Math.min(minY, p.y);
          }
        }
        return { index, minX, minY };
      });

      contourBounds.sort((a, b) => {
        // Primary sort: Y (Top to bottom)
        // Secondary sort: X (Left to right)
        // Use a threshold for Y to group lines that start at roughly the same height
        if (Math.abs(a.minY - b.minY) > 5) {
            return a.minY - b.minY;
        }
        return a.minX - b.minX;
      });

      const sortedContours = contourBounds.map(b => contours[b.index]);
      const letterPaths = [];

      for (const contour of sortedContours) {
        const rotated = rotateContour(contour);
        const path = contourToPath(rotated, opentype);
        const d = commandsToPathData(path.commands, cursor, scale);
        letterPaths.push(d);
      }

      glyphsData.push({ char, paths: letterPaths });

      const advanceWidth = (glyph.advanceWidth ?? 0) * scale;
      const gap = i === letters.length - 1 ? 0 : letters[i + 1] === " " ? WORD_GAP : LETTER_GAP;
      cursor += advanceWidth + gap;
    }

    console.log(JSON.stringify({ glyphs: glyphsData, totalWidth: cursor }, null, 2));

  } catch (err) {
    console.error(err);
  }
}

main();
