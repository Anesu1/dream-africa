import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Africa Dream Adventures & Eden Car Rental | Victoria Falls";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#121417",
          backgroundImage: "radial-gradient(circle at 50% 40%, #1e293b 0%, #0d1117 100%)",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* Subtle border outline */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "1px solid rgba(200, 161, 74, 0.35)",
            borderRadius: 16,
            pointerEvents: "none",
          }}
        />

        {/* Top Header Brands Bar */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                backgroundColor: "#c8a14a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "#0b0b0b",
                fontSize: 18,
              }}
            >
              ADA
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                }}
              >
                Africa Dream Adventures
              </span>
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#c8a14a",
                }}
              >
                Where Luxury Meets The Wild
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                backgroundColor: "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "#0f172a",
                fontSize: 18,
              }}
            >
              ECR
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                }}
              >
                Eden Car Rental
              </span>
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#94a3b8",
                }}
              >
                Drive Your Journey • Live Your Freedom
              </span>
            </div>
          </div>
        </div>

        {/* Center Main Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: 950,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(200, 161, 74, 0.15)",
              border: "1px solid rgba(200, 161, 74, 0.4)",
              borderRadius: 30,
              padding: "6px 20px",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c8a14a",
              }}
            >
              Victoria Falls, Zimbabwe • Hwange • Chobe
            </span>
          </div>

          <h1
            style={{
              fontSize: 48,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              textTransform: "uppercase",
              color: "#ffffff",
              margin: 0,
            }}
          >
            Luxury Safaris, River Cruises & 4x4 Self-Drive Hire
          </h1>

          <p
            style={{
              fontSize: 18,
              color: "#94a3b8",
              marginTop: 16,
              lineHeight: 1.4,
            }}
          >
            Private guided expeditions, helicopter flights & fully insured safari-equipped vehicle rentals.
          </p>
        </div>

        {/* Bottom Bar Badges */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: 20,
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#cbd5e1",
          }}
        >
          <span>Licensed Zimbabwe Operator</span>
          <span>•</span>
          <span>Airport VFA Terminal Handover</span>
          <span>•</span>
          <span>Cross-Border Permits Ready</span>
          <span>•</span>
          <span style={{ color: "#c8a14a" }}>africadreamadventures.co.zw</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
