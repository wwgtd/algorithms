import { Heap } from "../heap/heap";

type VertexData = {
    value: number, // as shortest
    index: number,
    adjacents: { vertex: number, value: number }[]
};

export type Graph = VertexData[];

export const topologicalSort = (graph: Graph): number[] => {
    const inDigree = new Array(graph.length).fill(0);
    for (const vertex of graph) {
        for (const adjacent of vertex.adjacents) {
            inDigree[adjacent.vertex]++;
        }
    }

    const next = [] as number[];
    inDigree.forEach((v, i) => v === 0 && next.push(i));

    const result = [];
    while (next.length > 0) {
        const nextVertex = next.shift()!;
        result.push(nextVertex);
        for (const adjacent of graph[nextVertex].adjacents) {
            inDigree[adjacent.vertex]--;
            if (inDigree[adjacent.vertex] === 0) next.push(adjacent.vertex);
        }
    }

    return result;
}

export const dextra = (graph: Graph) => {
    const vertices = new Heap(graph);
    const previous = new Array(graph.length).fill(null);

    while (vertices.length > 0) {
        const vertex = vertices.extractMin();

        for (const adjacent of vertex.adjacents) {
            const weight = vertex.value + adjacent.value;
            if (weight < graph[adjacent.vertex].value) {
                vertices.descreaseKey(graph[adjacent.vertex], weight);
                previous[adjacent.vertex] = vertex.index;
            }
        }
    }

    return { previous, shortest: graph.map(vertex => vertex.value) };
}