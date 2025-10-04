export const icons = import.meta.glob("../assets/icons/*.svg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export function getIconSrc(code: string): string | undefined {
  const key: string = `../assets/icons/${code}.svg`;
  return icons[key];
}
