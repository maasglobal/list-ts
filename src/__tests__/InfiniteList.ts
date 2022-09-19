import { pipe } from 'fp-ts/function';

import type { InfiniteList } from '../InfiniteList';
import * as InfiniteList_ from '../InfiniteList';
import type { List } from '../List';
import * as List_ from '../List';
import type { NonEmptyList } from '../NonEmptyList';

describe('InfiniteList', () => {
  describe('type', () => {
    it('should be assignable to List', async () => {
      const _test: List<number> = InfiniteList_.of(123);
    });
    it('should be assignable to NonEmptyList', async () => {
      const _test: NonEmptyList<number> = InfiniteList_.of(123);
    });
    it('should be assignable to InfiniteList', async () => {
      const _test: InfiniteList<number> = InfiniteList_.of(123);
    });
  });

  it('should be compatible with List take', async () => {
    const list: InfiniteList<number> = function* () {
      while (true) {
        yield 123;
      }
    };
    const result = pipe(list, List_.take(3), List_.toArray);
    expect(result).toStrictEqual([123, 123, 123]);
  });

  describe('of function', () => {
    it('should construct a InfiniteList', async () => {
      const result = pipe(InfiniteList_.of(123), List_.take(3), List_.toArray);
      expect(result).toStrictEqual([123, 123, 123]);
    });
  });

  describe('map function', () => {
    it('should map a NonEmptyList', async () => {
      const double = (x: number) => 2 * x;
      const input = 123;
      const count = 3;
      const result = pipe(
        InfiniteList_.of(input),
        InfiniteList_.map(double),
        List_.take(count),
        List_.toArray,
      );
      const expected = Array(count).fill(input).map(double);
      expect(result).toStrictEqual(expected);
    });
  });
});
