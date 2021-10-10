class IndexMinPQ<Type> {
    private n: number;
    private maxN: number;
    private readonly keys: Type[];
    private readonly pq: number[];
    private readonly qp: number[];

    constructor(maxN: number, comparator?: any) {
        this.n = 0;
        this.maxN = maxN;
        this.keys = [];
        this.pq = [];
        this.qp = [];
        for (let i = 0; i <= maxN; i++) {
            this.pq.push(-1);
            this.qp.push(-1);
        }
    }

    isEmpty(){
        return this.n === 0;
    }

    contains(i: number){
        return this.qp[i] !== -1;
    }

    insert(i: number, key: Type){
        ++this.n;
        this.pq[this.n] = i;
        this.qp[i] = this.n; // big typo (was pq)
        this.keys[i] = key;
        this.swim(this.n);
    }

    delMin(){
        let min = this.pq[1];
        this.exch(1, this.n--);
        this.sink(1);
        this.qp[min] = -1;
        this.pq[this.n+1] = -1;
        return min;
     }

     print(){
        console.log(this.pq);
     }

     decreaseKey(i:number, key:Type){
        this.keys[i] = key;
        this.swim(this.qp[i]);
     }

    private exch(i:number, j: number){
        let temp = this.pq[i];
        this.pq[i] = this.pq[j];
        this.pq[j] = temp;
        this.qp[this.pq[i]] = i;
        this.qp[this.pq[j]] = j;
    }

    private greater(i:number, j:number){
        return  this.keys[this.pq[i]] > this.keys[this.pq[j]];
    }

    private swim(k: number){
        while(k > 1 && this.greater(Math.floor(k/2), k)){
            this.exch(k, Math.floor(k/2));
            k = Math.floor(k/2);
        }
    }

    private sink(k: number){
        while (2 * k <= this.n){
            let j = 2 * k;
            if (j < this.n && this.greater(j, j+1)) j++;
            if (!this.greater(k, j)) break;
            this.exch(k, j);
            k = j;
        }
    }
}

export default IndexMinPQ;