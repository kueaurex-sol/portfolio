// utils/wave.js

export function generateWavePath({
  width = 1200,
  height = 160,
  baseHeight = 70,
  amplitude = 18,
  frequency = 2,
  phase = 0,
  points = 120,
}) {
  const step = width / points;

  let path = `M 0 ${height}`;

  // Left edge
  path += ` L 0 ${baseHeight}`;

  for (let i = 0; i <= points; i++) {
    const x = i * step;

    // Large wave
    const wave1 =
      Math.sin((i / points) * Math.PI * frequency + phase) * amplitude;

    // Medium wave
    const wave2 =
      Math.sin((i / points) * Math.PI * (frequency * 2.2) + phase * 1.35) *
      amplitude *
      0.45;

    // Tiny ripple
    const wave3 =
      Math.sin((i / points) * Math.PI * (frequency * 6.4) + phase * 2.4) *
      amplitude *
      0.18;

    const y = baseHeight + wave1 + wave2 + wave3;

    path += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }

  // Close the liquid

  path += ` L ${width} ${height}`;
  path += ` L 0 ${height}`;
  path += ` Z`;

  return path;
}