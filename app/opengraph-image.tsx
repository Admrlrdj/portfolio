import { ImageResponse } from "next/og";

export const alt = "Radja Admiral — Full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f1ea",
          color: "#0e1116",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 30, color: "#565b63" }}>IPB University · D4 Software Engineering Technology</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 700, lineHeight: 1.05 }}>Radja Admiral</div>
          <div style={{ fontSize: 40, marginTop: 24 }}>Full-stack developer. Mencari magang Semester 6, 2027.</div>
        </div>
        <div style={{ width: 120, height: 8, background: "#c23e1a" }} />
      </div>
    ),
    size,
  );
}
