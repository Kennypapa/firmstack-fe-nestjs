import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 7,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <div
            style={{
              width: 20,
              height: 6,
              borderRadius: 1.5,
              background: "#7bbfff",
            }}
          />
          <div
            style={{
              width: 24,
              height: 6,
              borderRadius: 1.5,
              background: "#3388ff",
            }}
          />
          <div
            style={{
              width: 28,
              height: 6,
              borderRadius: 1.5,
              background: "#222e4d",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
