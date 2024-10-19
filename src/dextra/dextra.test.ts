import { dextra, Graph } from "./dextra";

const graph = [] as Graph;

graph[0] = { value: 0, index: 0, adjacents: [{ vertex: 1, value: 6 }, { vertex: 2, value: 4 }] };
graph[1] = { value: Infinity, index: 1, adjacents: [{ vertex: 3, value: 3 }, { vertex: 2, value: 2 }] };
graph[2] = { value: Infinity, index: 2, adjacents: [{ vertex: 1, value: 1 }, { vertex: 3, value: 9 }, { vertex: 4, value: 3 }] };
graph[3] = { value: Infinity, index: 3, adjacents: [{ vertex: 4, value: 4 }] };
graph[4] = { value: Infinity, index: 4, adjacents: [{ vertex: 0, value: 7 }, { vertex: 3, value: 5 }] };

test('dextra algorihm', () => {
    const { shortest, previous } = dextra(graph);

    expect(shortest).toEqual([0, 5, 4, 8, 7]);
    expect(previous).toEqual([null, 2, 0, 1, 2]);
})