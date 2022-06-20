export const compose = <T>(...functions: readonly Function[]): Function => (x: T): T => {
  const deepCopiedFunctions = [...functions]
  return deepCopiedFunctions.reverse().reduce((value, func) => func(value), x)
}
