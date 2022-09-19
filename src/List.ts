export type List<A> = () => Generator<A, unknown, undefined>;

export function of<A>(a: A): List<A> {
  return function* () {
    yield a;
  };
}

export function fromArray<A>(aa: Array<A>): List<A> {
  return function* () {
    yield* aa;
  };
}

export function toArray<A>(la: List<A>): Array<A> {
  const ha = la();
  return [...ha];
}

export function map<A, B>(f: (a: A) => B): (la: List<A>) => List<B> {
  return (la) =>
    function* () {
      const ha = la();
      for (const a of ha) {
        yield f(a);
      }
    };
}

export function take(n: number): <A>(la: List<A>) => List<A> {
  return (la) =>
    function* () {
      const ha = la();
      for (let i = 0; i < n; i += 1) {
        const { done, value } = ha.next();
        if (done) {
          return;
        }
        yield value;
      }
    };
}
