import { pipe } from 'fp-ts/function';
import type { NonEmptyArray } from 'fp-ts/NonEmptyArray';
import * as NonEmptyArray_ from 'fp-ts/NonEmptyArray';

import type { List } from '../List';
import type { NonEmptyList } from '../NonEmptyList';
import * as NonEmptyList_ from '../NonEmptyList';

describe('NonEmptyList', () => {
  describe('type', () => {
    it('should be assignable to List', async () => {
      const _test: List<number> = NonEmptyList_.of(123);
    });
    it('should be assignable to NonEmptyList', async () => {
      const _test: NonEmptyList<number> = NonEmptyList_.of(123);
    });
    it('should not be assignable to InfiniteList', async () => {
      // @ts-expect-error NonEmptyList might be finite
      const _test: InfiniteList<number> = NonEmptyList_.of(123);
    });
  });

  describe('toNonEmptyArray function', () => {
    it('should destruct a NonEmptyList', async () => {
      const list: NonEmptyList<number> = function* () {
        yield 123;
        yield 456;
        return 123;
      };
      const array: NonEmptyArray<number> = NonEmptyList_.toNonEmptyArray(list);
      expect(array).toStrictEqual([123, 456]);
    });
  });

  describe('of function', () => {
    it('should construct a NonEmptyList', async () => {
      const list = NonEmptyList_.of(123);
      const array = NonEmptyList_.toNonEmptyArray(list);
      expect(array).toStrictEqual([123]);
    });
  });

  describe('fromNonEmptyArray function', () => {
    it('should construct a NonEmptyList', async () => {
      const input: NonEmptyArray<number> = [123, 456];
      const list = NonEmptyList_.fromNonEmptyArray(input);
      const array = NonEmptyList_.toNonEmptyArray(list);
      expect(array).toStrictEqual(input);
    });
  });

  describe('map function', () => {
    it('should map a NonEmptyList', async () => {
      const input: NonEmptyArray<number> = [123, 456];
      const double = (x: number) => 2 * x;
      const result = pipe(
        input,
        NonEmptyList_.fromNonEmptyArray,
        NonEmptyList_.map(double),
        NonEmptyList_.toNonEmptyArray,
      );
      const expected = pipe(input, NonEmptyArray_.map(double));
      expect(result).toStrictEqual(expected);
    });
  });
});
