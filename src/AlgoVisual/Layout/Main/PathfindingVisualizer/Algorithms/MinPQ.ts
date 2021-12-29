import {Comparable} from "./Comparable";

class MinPQ<E extends Comparable<E>> {
  private n: number;
  private readonly pq: (E | null)[];

  constructor() {
    this.n = 0;
    this.pq = [];
    this.pq.push(null);
  }

  print() {
    console.log(this.pq);
  }

  min(){
    return this.pq[1];
  }

  isEmpty() {
    return this.n === 0;
  }

  size() {
    return this.n;
  }

  insert(i: E) {
    this.pq[++this.n] = i;
    this.swim(this.n);
  }

  delMin() {
    let min = this.pq[1];
    this.exch(1, this.n--);
    this.sink(1);
    this.pq.pop();
    return min;
  }

  private greater(i: number, j: number) {
    return this.pq[i]!.compareTo(this.pq[j] as E) > 0;
  }

  private swim(k: number) {
    while (k > 1 && this.greater(Math.floor(k / 2), k)) {
      this.exch(k, Math.floor(k / 2));
      k = Math.floor(k / 2);
    }
  }

  private sink(k: number) {
    while (2 * k <= this.n) {
      let j = 2 * k;
      if (j < this.n && this.greater(j, j + 1)) j++;
      if (!this.greater(k, j)) break;
      this.exch(k, j);
      k = j;
    }
  }

  private exch(i: number, j: number) {
    let temp = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = temp;
  }
}

export default MinPQ;
