import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 100,
              height: 28,
              borderRadius: 8,
              background: "#7bbfff",
            }}
          />
          <div
            style={{
              width: 120,
              height: 28,
              borderRadius: 8,
              background: "#3388ff",
            }}
          />
          <div
            style={{
              width: 140,
              height: 28,
              borderRadius: 8,
              background: "#222e4d",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
