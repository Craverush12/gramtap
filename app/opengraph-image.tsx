import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GramTap – iPhone Weighing Scale";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace"
        }}
      >
        <div style={{ fontSize: 80, color: "#3b82f6" }}>⚖️</div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            marginTop: 24
          }}
        >
          GramTap
        </div>
        <div style={{ fontSize: 28, color: "#6b7280", marginTop: 16 }}>
          Turn your iPhone into a digital weighing scale
        </div>
        <div
          style={{
            marginTop: 32,
            padding: "10px 28px",
            background: "#3b82f6",
            borderRadius: 999,
            fontSize: 22,
            color: "#fff"
          }}
        >
          Free · Safari · No Download
        </div>
      </div>
    ),
    size
  );
}
