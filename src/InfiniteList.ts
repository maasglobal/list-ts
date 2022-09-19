export type InfiniteList<A> = () => Generator<A, never, undefined>;

export function of<A>(a: A): InfiniteList<A> {
  return function* () {
    while (true) {
      yield a;
    }
  };
}

export function map<A, B>(f: (a: A) => B): (ila: InfiniteList<A>) => InfiniteList<B> {
  return (ila) =>
    function* () {
      const ha = ila();
      while (true) {
        const { value } = ha.next();
        yield f(value);
      }
    };
}
