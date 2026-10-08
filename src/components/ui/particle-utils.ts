export interface ParticlePoint {
  idx: number;
  position: [number, number, number];
  color: string;
}

export const MIN_RADIUS = 7.5;
export const MAX_RADIUS = 15;
export const DEPTH = 2;
export const LEFT_COLOR = "0085eb"; // Tehnonusa Official Primary
export const RIGHT_COLOR = "4dabf7"; // Tehnonusa Official Accent

export const calculateColor = (x: number): string => {
  const maxDiff = MAX_RADIUS * 2;
  const currentDiff = x + MAX_RADIUS;
  const percentage = Math.max(0, Math.min(1, currentDiff / maxDiff));

  const hexLeft = parseInt(LEFT_COLOR, 16);
  const hexRight = parseInt(RIGHT_COLOR, 16);

  const rLeft = (hexLeft >> 16) & 255;
  const gLeft = (hexLeft >> 8) & 255;
  const bLeft = hexLeft & 255;

  const rRight = (hexRight >> 16) & 255;
  const gRight = (hexRight >> 8) & 255;
  const bRight = hexRight & 255;

  const r = Math.round(rLeft + (rRight - rLeft) * percentage);
  const g = Math.round(gLeft + (gRight - gLeft) * percentage);
  const b = Math.round(bLeft + (bRight - bLeft) * percentage);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

export const randomFromInterval = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const generatePoints = (
  count: number,
  minRadius: number,
  maxRadius: number
): ParticlePoint[] => {
  return Array.from({ length: count }, (_, k) => {
    const randomRadius = randomFromInterval(minRadius, maxRadius);
    const randomAngle = Math.random() * Math.PI * 2;
    const x = Math.cos(randomAngle) * randomRadius;
    const y = Math.sin(randomAngle) * randomRadius;
    const z = randomFromInterval(-DEPTH, DEPTH);
    const color = calculateColor(x);
    return {
      idx: k,
      position: [x, y, z] as [number, number, number],
      color,
    };
  });
};

export const pointsInner: ParticlePoint[] = generatePoints(250, MIN_RADIUS, 10);
export const pointsOuter: ParticlePoint[] = generatePoints(250, 10, MAX_RADIUS);
