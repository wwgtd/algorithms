import { BinaryHeap } from "./heap";

test('heap.getSorted() method', () => {
    const array = [5, 1, 3, 6, 7, 2, 1, 10].map(value => ({value}));

    const heap = new BinaryHeap(array);

    const sortedArray = heap.getSortedValues();

    expect(sortedArray.map(({value}) => value)).toEqual([1, 1, 2, 3, 5, 6, 7, 10]);
})