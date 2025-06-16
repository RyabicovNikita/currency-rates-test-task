export function joinClassNames(...classNames: (string | undefined | null)[]): string {
  return classNames.filter((c) => !!c).join(' ');
}
