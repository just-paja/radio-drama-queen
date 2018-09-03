export default class JobCounter {
  constructor(total, concurrency = 3) {
    this.setTotal(total);
    this.setConcurrency(concurrency);
  }

  add() {
    this.done += 1;
  }

  prepare() {
    this.prepared += 1;
  }

  setConcurrency(concurrency) {
    this.concurrency = concurrency;
  }

  setTotal(total) {
    this.total = total;
  }
}

JobCounter.prototype.done = 0;
JobCounter.prototype.prepared = 0;
JobCounter.prototype.total = 0;
