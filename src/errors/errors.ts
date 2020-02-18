export const primitiveError = (tag: string) => (value: any) => {
  return `${JSON.stringify(value)} is not a valid ${tag}`
}