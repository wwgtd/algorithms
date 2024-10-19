export class BinaryHeap<T extends { value: number }> {
    private heap: T[] = [];

    constructor(initialValues?: T[]) {
        if (initialValues) {
            initialValues.forEach(this.insert);
        }
    }

    getSortedValues() {
        const heap = new BinaryHeap(this.heap);

        const result = [];
        while (heap.length > 0) {
            result.push(heap.extractMin());
        }

        return result;
    }

    insert = (value: T) => {
        this.heap.push(value);

        this.bubbleUp(this.heap.length - 1);
    }

    extractMin = (): T => {
        if (this.length === 0) {
            throw new Error(`can't extract from empty heap!`);
        }

        if (this.length === 1) {
            return this.heap.pop()!;
        }

        const min = this.heap[0];

        this.heap[0] = this.heap.pop()!;

        for (let k = 0; k < this.heap.length;) {
            const i = Math.max(k * 2, 1);
            const j = i + 1;

            if (i >= this.heap.length) {
                break;
            }

            const leftNode = this.heap[i];
            if (j === this.heap.length) {
                if (leftNode.value < this.heap[k].value) {
                    this.swap(i, k);
                }
                break;
            }

            const rightNode = this.heap[j];
            if (leftNode.value < rightNode.value) {
                this.swap(i, k);
                k = i;
            } else {
                this.swap(j, k);
                k = j;
            }
        }

        return min;
    }

    public log() {
        console.log("current heap values:" + this.heap.map(node => ` value: ${node.value}`));
    }

    public descreaseKey = (node: T, newValue: number) => {
        node.value = newValue;

        const nodeIndex = this.heap.indexOf(node);
        this.bubbleUp(nodeIndex);
    }

    get length() {
        return this.heap.length;
    }

    private getParentIndex = (idx: number) => {
        return Math.floor(idx / 2);
    }

    private swap = (i: number, j: number) => {
        const temp = this.heap[j];
        this.heap[j] = this.heap[i];
        this.heap[i] = temp;
    }

    private bubbleUp(index: number) {
        if (index >= this.heap.length) {
            throw new Error(`can't bubble up item that not exists`);
        }

        let curIndex = index;
        let parentIndex = this.getParentIndex(curIndex);

        while (curIndex != parentIndex) {
            if (this.heap[curIndex].value < this.heap[parentIndex].value) {
                this.swap(curIndex, parentIndex);
                curIndex = parentIndex;
                parentIndex = this.getParentIndex(parentIndex);
            } else {
                break;
            }
        }
    }
}