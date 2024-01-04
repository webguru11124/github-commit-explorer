export function generateColorFromRepositoryId(repositoryId: number) {
  // Ensure the repositoryId is a positive number
  const id = Math.abs(repositoryId);

  // Extract three components for R, G, and B values
  const r = id % 255;
  const g = (id * 2) % 255;
  const b = (id * 3) % 255;

  // Return the RGB color string
  return `rgb(${r}, ${g}, ${b})`;
}
