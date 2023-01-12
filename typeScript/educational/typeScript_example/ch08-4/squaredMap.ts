import { map } from './map2'

// const square = value => value * value
const square = (value: number): number => value * value
export const squaredMap = map(square)
