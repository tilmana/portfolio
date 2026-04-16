import { ImageResponse } from "next/og";
import { config, THEMES } from "@/lib/config";

export const alt         = `${config.name} — ${config.title}`;
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const p = THEMES[config.theme];

  return new ImageResponse(
    (
      <div
        style={{
          width:          "100%",
          height:         "100%",
          background:     p.base,
          display:        "flex",
          flexDirection:  "column",
          fontFamily:     "monospace",
          padding:        "48px",
        }}
      >
        {/* Terminal card */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            border:        `1px solid ${p.edge}`,
            borderRadius:  12,
            overflow:      "hidden",
            width:         "100%",
            flex:          1,
            boxShadow:     `0 0 60px ${p.primary}18`,
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display:        "flex",
              alignItems:     "center",
              padding:        "14px 24px",
              background:     "#00000080",
              borderBottom:   `1px solid ${p.edge}`,
              gap:            10,
            }}
          >
            <span style={{ color: p.dim, fontSize: 16 }}>[×]</span>
            <span style={{ flex: 1, textAlign: "center", color: p.dim, fontSize: 15 }}>
              visitor@{config.handle}:~
            </span>
            <span style={{ width: 42 }} />
          </div>

          {/* Body */}
          <div
            style={{
              display:        "flex",
              flex:           1,
              padding:        "56px 72px",
              flexDirection:  "column",
              justifyContent: "center",
            }}
          >
            {/* Prompt line */}
            <div style={{ display: "flex", fontSize: 22, marginBottom: 48, gap: 0 }}>
              <span style={{ color: p.accent }}>visitor</span>
              <span style={{ color: p.dim }}>@</span>
              <span style={{ color: p.primary }}>{config.handle}</span>
              <span style={{ color: p.dim }}>:~$&nbsp;</span>
              <span style={{ color: p.content }}>{config.heroCommand}</span>
            </div>

            {/* Name */}
            <div
              style={{
                fontSize:      84,
                fontWeight:    700,
                color:         p.primary,
                letterSpacing: -2,
                lineHeight:    1,
                marginBottom:  22,
              }}
            >
              {config.name}
            </div>

            {/* Title */}
            <div style={{ fontSize: 30, color: p.accent, marginBottom: 16 }}>
              {config.title}
            </div>

            {/* Domain + tagline row */}
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 8 }}>
              <span style={{ fontSize: 20, color: p.dim }}>{config.domain}</span>
              <span style={{ fontSize: 16, color: p.edge }}>·</span>
              <span style={{ fontSize: 18, color: p.dim, fontStyle: "italic" }}>
                // {config.tagline}
              </span>
            </div>
          </div>

          {/* Footer bar */}
          <div
            style={{
              display:      "flex",
              alignItems:   "center",
              justifyContent: "space-between",
              padding:      "12px 24px",
              borderTop:    `1px solid ${p.edge}`,
              background:   "#00000060",
            }}
          >
            <span style={{ color: p.dim, fontSize: 14 }}>
              {config.location}
            </span>
            {config.initials && (
              <div
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  width:          36,
                  height:         36,
                  borderRadius:   6,
                  border:         `1.5px solid ${p.dim}`,
                  background:     p.surface,
                  color:          p.primary,
                  fontSize:       14,
                  fontWeight:     700,
                }}
              >
                {config.initials}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
