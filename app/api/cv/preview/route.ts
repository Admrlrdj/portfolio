import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";

export async function GET() {
  const filePath = join(process.cwd(), "public", "cv", "CV_Radja_Admiral_ATS_EN.pdf");

  if (!existsSync(filePath)) {
    return new NextResponse("CV PDF file not found", { status: 404 });
  }

  const fileBuffer = readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="CV_Radja_Admiral_ATS_EN.pdf"',
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
