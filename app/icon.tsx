import { ImageResponse } from "next/og";
import { config, THEMES } from "@/lib/config";

export const size        = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const palette = THEMES[config.theme];
  const text    = config.initials.trim() || ">_";
  // Fit font size to number of characters: 1 char → 16px, 2 chars → 13px, fallback → 11px
  const fontSize = text.length === 1 ? 16 : text.length === 2 ? 13 : 11;

  return new ImageResponse(
    (
      <div
        style={{
          width:          32,
          height:         32,
          background:     palette.base,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          borderRadius:   6,
          border:         `1.5px solid ${palette.dim}`,
        }}
      >
        <span
          style={{
            color:         palette.primary,
            fontSize,
            fontFamily:    "monospace",
            fontWeight:    700,
            letterSpacing: "-0.5px",
            lineHeight:    1,
          }}
        >
          {text}
        </span>
      </div>
    ),
    { ...size },
  );
}
