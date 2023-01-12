// export const create = <T>(type: { new (...args): T }, ...args): T => new type(...args)
export const create = <T>(type: { new (...args: any[]): T }, ...args: any[]): T => new type(...args)
