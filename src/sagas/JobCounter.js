export default class JobCounter {
  constructor(total, concurrency = 3) {
    this.total = total;
    this.concurrency = concurrency;
  }

  add() {
    this.done += 1;
  }

  prepare() {
    this.prepared += 1;
  }
}

JobCounter.prototype.done = 0;
JobCounter.prototype.prepared = 0;
JobCounter.prototype.total = 0;
