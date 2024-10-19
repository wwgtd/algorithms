type VertexData = {vertex: number, weight: number}[]

type Graph = VertexData[];

const graph = [] as Graph;

graph[0] = [{vertex: 1, weight: 6}, {vertex: 2, weight: 4}];
graph[1] = [{vertex: 3, weight: 3}, {vertex: 2, weight: 2}];
graph[2] = [{vertex: 1, weight: 1}, {vertex: 3, weight: 9}, {vertex: 4, weight: 3}];;
graph[3] = [{vertex: 4, weight: 4}]
graph[4] = [{vertex: 0, weight: 7}, {vertex: 3, weight: 5}];

const topologicalSort = (graph: Graph): number[] => {
    const inDigree = new Array(graph.length).fill(0);
    for (let vertex of graph) {
        for (let adjacent of vertex) {
            inDigree[adjacent.vertex]++;
        }
    }

    const next = [] as number[];
    inDigree.forEach((v, i) => v === 0 && next.push(i));

    const result = [];
    while (next.length > 0) {
        const nextVertex = next.shift()!;
        result.push(nextVertex);
        for (let adjacent of graph[nextVertex]) {
            inDigree[adjacent.vertex]--;
            if (inDigree[adjacent.vertex] === 0) next.push(adjacent.vertex);
        }
    }

    return result;
}

const findMin = (arr: any) => {
    let curmin = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[curmin].shortest > arr[i].shortest) curmin = i;
    }

    return curmin;
}

const dextra = (graph: Graph) => {
    const copy = graph.map((adj, i) => ({ adjacents: adj, shortest: Infinity, i }));
    copy[0].shortest = 0;

    const shortest = new Array(graph.length).fill(Infinity);
    shortest[0] = 0;
    const pred = new Array(graph.length).fill(null);

    while(copy.length > 0) {
        const j = findMin(copy);
        const vertexData = copy[j];
        const i = vertexData.i;
        for (const adjacent of vertexData.adjacents) {
            const weight = shortest[i] + adjacent.weight;
            if (weight < shortest[adjacent.vertex]) {
                shortest[adjacent.vertex] = weight;
                copy.find(v => v.i === adjacent.vertex)!.shortest = weight;
                pred[adjacent.vertex] = i;
            }
        }
        copy.splice(j, 1);
        console.log(copy);
    }

    console.log(shortest, pred);
}


dextra(graph);