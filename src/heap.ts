class Heap<T extends { value: number }> {
    private heap: T[] = [];

    constructor(initialValues?: T[]) {
        if (initialValues) {
            initialValues.forEach(this.insert);
        }
    }

    insert = (value: T) => {
        this.heap.push(value);

        this.bubbleUp(this.heap.length - 1);
    }

    extractMin = () => {
        if (this.heap.length === 0) {
            throw new Error(`can't extract from empty heap!`);
        }

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const min = this.heap[0];

        this.heap[0] = this.heap.pop()!;

        for (let k = 0; k < this.heap.length;) {
            const i = Math.max(k * 2, 1);
            const j = i + 1;

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

    public descreaseKey = (node: T, newValue: number) => {
        node.value = newValue;

        const nodeIndex = this.heap.indexOf(node);
        this.bubbleUp(nodeIndex);
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

    public log() {
        console.log("current heap values:" + this.heap.map(node => ` ${node.value}`));
    }
}

const valuesToInsert = [14, 13, 15, 17, 11, 16, 10, 8, 4, 2].map(value => ({value}));
const heap = new Heap(valuesToInsert);
heap.log();
heap.descreaseKey(valuesToInsert[5], 0);
heap.log();