// export type FirstOrderFunc<T, R> = (T) => R
// export type SecondOrderFunc<T, R> = (T) => FirstOrderFunc<T, R>
// export type ThirdOrderFunc<T, R> = (T) => SecondOrderFunc<T, R>
export type FirstOrderFunc<T, R> = (a: T) => R
export type SecondOrderFunc<T, R> = (b: T) => FirstOrderFunc<T, R>
export type ThirdOrderFunc<T, R> = (c: T) => SecondOrderFunc<T, R>
