import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontData = readFileSync(
    path.join(process.cwd(), "public/fonts/cormorant-italic-300.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0B0B09",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle warm vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 80% at 70% 50%, rgba(196,166,97,0.04) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Left gold accent bar */}
        <div
          style={{
            position: "absolute",
            top: 72,
            bottom: 72,
            left: 72,
            width: 2,
            background:
              "linear-gradient(to bottom, transparent, rgba(196,166,97,0.5) 30%, rgba(196,166,97,0.5) 70%, transparent)",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 112,
            paddingRight: 88,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: "Cormorant",
              fontSize: 14,
              fontWeight: 300,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(196,166,97,0.75)",
              marginBottom: 28,
            }}
          >
            Traiteur & Chef à Domicile
          </div>

          {/* Gold rule */}
          <div
            style={{
              width: 48,
              height: 1,
              background: "rgba(196,166,97,0.55)",
              marginBottom: 36,
            }}
          />

          {/* Title */}
          <div
            style={{
              fontFamily: "Cormorant",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: 94,
              color: "#FAFAF7",
              lineHeight: 1.0,
              marginBottom: 36,
            }}
          >
            David Chambaud
          </div>

          {/* Tagline */}
          <div
            style={{
              fontFamily: "Cormorant",
              fontSize: 14,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(250,250,247,0.38)",
            }}
          >
            Nouvelle-Aquitaine · Bordeaux
          </div>
        </div>

        {/* Bottom-right URL */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            right: 88,
            fontFamily: "Cormorant",
            fontSize: 13,
            letterSpacing: "0.2em",
            color: "rgba(196,166,97,0.38)",
          }}
        >
          chambaud.fr
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: fontData, style: "italic", weight: 300 },
      ],
    }
  );
}
