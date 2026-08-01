import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "hero" });
  const photoData = await readFile(join(process.cwd(), "public", "mila-patramanska.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 22, color: "#1a1a1a", display: "flex" }}>Mila Patramanska</div>
          <div
            style={{
              fontSize: 48,
              color: "#1a1a1a",
              marginTop: 24,
              display: "flex",
              letterSpacing: "-0.03em",
            }}
          >
            {t("title")}
          </div>
          <div
            style={{
              marginTop: 32,
              display: "flex",
              backgroundColor: "#0a84ff",
              padding: "8px 16px",
              fontSize: 22,
              color: "#ffffff",
              width: "fit-content",
            }}
          >
            {t("bannerValue")}
          </div>
        </div>
        <img
          src={photoSrc}
          width={340}
          height={425}
          style={{ objectFit: "cover", borderRadius: 16 }}
        />
      </div>
    ),
    { ...size },
  );
}
