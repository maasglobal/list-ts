import { pipe } from 'fp-ts/function';

import type { InfiniteList } from '../InfiniteList';
import type { List } from '../List';
import * as List_ from '../List';
import type { NonEmptyList } from '../NonEmptyList';
import * as InfiniteList_ from '../InfiniteList';

describe('List', () => {
  describe('type', () => {
    it('should be assignable to List', async () => {
      const _test: List<number> = List_.of(123);
    });
    it('should not be assignable to NonEmptyList', async () => {
      // @ts-expect-error List might be empty
      const _test: NonEmptyList<number> = List_.of(123);
    });
    it('should not be assignable to InfiniteList', async () => {
      // @ts-expect-error List might be finite
      const _test: InfiniteList<number> = List_.of(123);
    });
  });

  describe('toArray function', () => {
    it('should destruct a List', async () => {
      const list: List<number> = function* () {
        yield 123;
        yield 456;
      };
      const array: Array<number> = List_.toArray(list);
      expect(array).toStrictEqual([123, 456]);
    });
    it('should destruct an empty List', async () => {
      const list: List<number> = function* () { return };
      const array: Array<number> = List_.toArray(list);
      expect(array).toStrictEqual([]);
    });
  });

  describe('of function', () => {
    it('should construct a List', async () => {
      const list = List_.of(123);
      const array = List_.toArray(list);
      expect(array).toStrictEqual([123]);
    });
  });

  describe('fromArray function', () => {
    it('should construct a List', async () => {
      const input = [123, 456];
      const list = List_.fromArray(input);
      const array = List_.toArray(list);
      expect(array).toStrictEqual(input);
    });
    it('should support empty array', async () => {
      const input: Array<number> = [];
      const list = List_.fromArray(input);
      const array = List_.toArray(list);
      expect(array).toStrictEqual(input);
    });
  });

  describe('map function', () => {
    it('should map a List', async () => {
      const input = [123, 456];
      const double = (x: number) => 2 * x;
      const result = pipe(input, List_.fromArray, List_.map(double), List_.toArray);
      const expected = input.map(double);
      expect(result).toStrictEqual(expected);
    });
  });

  describe('chain function', () => {
      const input = [1, 2, 3];
      const result = pipe(
        input,
        List_.fromArray,
        List_.chain((n: number) => pipe(
          InfiniteList_.of(n),
          List_.take(n),
        )),
        List_.toArray,
      );
      expect(result).toStrictEqual([1, 2, 2, 3, 3, 3]);
  });

  describe('take function', () => {
    const input = [123, 456];
    it('should support limiting list length to zero', async () => {
      const result = pipe(input, List_.fromArray, List_.take(0), List_.toArray);
      expect(result).toStrictEqual([]);
    });
    it('should support limiting list length to one', async () => {
      const result = pipe(input, List_.fromArray, List_.take(1), List_.toArray);
      expect(result).toStrictEqual([123]);
    });
    it('should support limiting list length by the list length', async () => {
      const result = pipe(
        input,
        List_.fromArray,
        List_.take(input.length),
        List_.toArray,
      );
      expect(result).toStrictEqual(input);
    });
    it('should support limiting list length by more than the list length', async () => {
      const result = pipe(
        input,
        List_.fromArray,
        List_.take(input.length + 1),
        List_.toArray,
      );
      expect(result).toStrictEqual(input);
    });
    it('should support limiting empty list length to zero', async () => {
      const empty: Array<number> = [];
      const result = pipe(List_.fromArray(empty), List_.take(0), List_.toArray);
      expect(result).toStrictEqual(empty);
    });
    it('should support limiting empty list length to one', async () => {
      const empty: Array<number> = [];
      const result = pipe(List_.fromArray(empty), List_.take(1), List_.toArray);
      expect(result).toStrictEqual(empty);
    });
  });
});
