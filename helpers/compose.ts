const compose = <R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>) => {
  const composedFns: (a: R) => R & { Layout?: React.ReactNode } = fns.reduce(
    (prevFn, nextFn) => (value) => prevFn(nextFn(value)),
    fn1
  )
  return composedFns
}
export default compose
