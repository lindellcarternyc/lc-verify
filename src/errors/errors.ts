export const primitiveError = (tag: string) => (value: any) => {
  return `${JSON.stringify(value)} is not a valid ${tag}`
}

export const objectError = (validatorName: string) => (key: string) => (error: string): string => {
  return `<${validatorName}> validator failed at key "${key}" with error: ${error}`
}

export const objectMappedKeyError = (validatorName: string) => (key: string) => (mappedKey: string) => (error: string): string => {
  return `<${validatorName}> validator failed at key "${key}" (mapped from object key "${mappedKey}") with error: ${error}`
}