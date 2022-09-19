import type { NonEmptyArray } from 'fp-ts/NonEmptyArray';

export type NonEmptyList<A> = () => Generator<A, A, undefined>;

export function of<A>(a: A): NonEmptyList<A> {
  return function* () {
    const sample = a;
    yield a;
    return sample;
  };
}

export function fromNonEmptyArray<A>(nea: NonEmptyArray<A>): NonEmptyList<A> {
  return function* () {
    const [sample] = nea;
    yield* nea;
    return sample;
  };
}

export function toNonEmptyArray<A>(la: NonEmptyList<A>): NonEmptyArray<A> {
  const ha = la();
  return [...ha] as NonEmptyArray<A>;
}

export function map<A, B>(f: (a: A) => B): (nela: NonEmptyList<A>) => NonEmptyList<B> {
  return (nela) =>
    function* () {
      const ha = nela();
      while (true) {
        const { done, value } = ha.next();
        if (done) {
          const sample = value;
          return f(sample);
        }
        yield f(value);
      }
    };
}
