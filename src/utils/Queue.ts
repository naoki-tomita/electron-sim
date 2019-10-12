export class Queue {
  running: boolean = false;
  queue: Array<() => Promise<void> | void> = [];
  add(fn: () => Promise<void> | void) {
    this.queue.push(fn);
    this.run();
  }

  run() {
    if (this.running) return;
    this.next();
  }

  private async next() {
    if (this.queue.length === 0) {
      this.running = false;
      return;
    }
    this.running = true;
    const fn = this.queue.shift();
    fn && await fn();
    this.next();
  }
}
