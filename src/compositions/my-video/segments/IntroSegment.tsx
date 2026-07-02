import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { CONTENT } from "../content";

const easeOutExpo = Easing.out(Easing.exp);
const easeOutCubic = Easing.out(Easing.cubic);

export const IntroSegment: React.FC = () => {
  const frame = useCurrentFrame();

  // Shapes fade in
  const shapesOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline: slide up + fade in (frames 15–60)
  const headlineOpacity = interpolate(frame, [15, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutCubic,
  });
  const headlineY = interpolate(frame, [15, 60], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutExpo,
  });

  // Accent line: grow from left (frames 45–80)
  const accentScale = interpolate(frame, [45, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutExpo,
  });

  // Subtitle: slide up + fade in (frames 65–100)
  const subtitleOpacity = interpolate(frame, [65, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutCubic,
  });
  const subtitleY = interpolate(frame, [65, 108], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutExpo,
  });

  // Floating shapes: slow sinusoidal drift
  const s1y = Math.sin(frame / 80) * 18;
  const s1x = Math.cos(frame / 110) * 12;
  const s2y = Math.sin(frame / 70 + 1.0) * 22;
  const s2x = Math.cos(frame / 95 + 2.0) * 15;
  const s3y = Math.sin(frame / 90 + 3.0) * 14;
  const s3x = Math.cos(frame / 120) * 10;
  const s4y = Math.sin(frame / 100 + 2.0) * 20;
  const s4x = Math.cos(frame / 85 + 1.0) * 14;

  return (
    <AbsoluteFill style={{ background: "#ffffff", overflow: "hidden" }}>
      {/* ── Floating background shapes ── */}
      <div
        style={{
          position: "absolute",
          top: -130 + s1y,
          left: -90 + s1x,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.11) 0%, rgba(29,78,216,0.04) 55%, transparent 100%)",
          opacity: shapesOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -160 + s2y,
          right: -110 + s2x,
          width: 640,
          height: 640,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(96,165,250,0.10) 0%, rgba(59,130,246,0.04) 55%, transparent 100%)",
          opacity: shapesOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 60 + s3y,
          right: 110 + s3x,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(29,78,216,0.08) 0%, transparent 70%)",
          opacity: shapesOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 70 + s4y,
          left: 90 + s4x,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          opacity: shapesOpacity,
        }}
      />

      {/* ── Centre content ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Headline */}
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            fontFamily:
              '"Inter", "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
            fontSize: 92,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#0A1628",
            lineHeight: 1,
            marginBottom: 28,
            whiteSpace: "nowrap",
          }}
        >
          {CONTENT.headline}
        </div>

        {/* Blue gradient accent line */}
        <div
          style={{
            width: 500,
            height: 3,
            borderRadius: 2,
            background: "linear-gradient(90deg, #1D4ED8 0%, #60A5FA 100%)",
            transform: `scaleX(${accentScale})`,
            transformOrigin: "left center",
            marginBottom: 32,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            fontFamily:
              '"Inter", "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
            fontSize: 28,
            fontWeight: 400,
            letterSpacing: "0.22em",
            color: "#3B60A8",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {CONTENT.subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
