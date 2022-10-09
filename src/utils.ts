export function joinStrings(...values: (string|undefined|null|false)[]): string {
  return values.filter(Boolean).join(' ')
}