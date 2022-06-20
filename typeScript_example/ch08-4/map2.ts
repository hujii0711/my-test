// export const map = <T, R>(f: (T) => R) => (a: T[]): R[] => a.map(f)
export const map =
  <T, R>(f: (arg: T) => R) =>
  (a: T[]): R[] =>
    a.map(f)
