interface Thread {
  (): Promise<any>;
}

export class ThreadQueue {
  private readonly max: number;
  private readonly threadPool: Thread[] = [];
  private readonly tasks: Thread[] = [];
  private resolve: (result?: any) => void;
  private reject: (reason?: any) => void;
  private running: boolean = false;
  constructor(max: number = 1) {
    this.max = max;
  }
  public push(thread: Thread) {
    this.tasks.push(thread);
    this.run();
  }
  public async run() {
    if (this.running) return;
    this.running = true;
    while (this.threadPool.length < this.max) {
      this.runThreadPool();
    }
    return new Promise((ok, ng) => {
      this.resolve = ok;
      this.reject = ng;
    });
  }
  private runThreadPool() {
    if (this.tasks.length === 0) {
      if (this.threadPool.length === 0) {
        this.resolve();
        this.running = false;
      }
      return;
    }
    const task = this.tasks.shift()!;
    this.threadPool.push(task);
    task()
      .then(() => (this.removePool(task), this.runThreadPool()))
      .catch(e => (this.reject(e), this.running = false));
  }

  private removePool(thread: Thread) {
    this.threadPool.splice(this.threadPool.indexOf(thread), 1);
  }
}
