type Callback = (...params: any[]) => void;

export class Observable {
  event: {
    [key: string]: Callback[];
  } = {};
  eventOnce: {
    [key: string]: Callback[];
  } = {};

  on(type: string, cb: Callback) {
    this.event[type] = this.event[type] || [];
    this.event[type].push(cb);
  }

  once(type: string, cb: Callback) {
    this.eventOnce[type] = this.eventOnce[type] || [];
    this.eventOnce[type].push(cb);
  }

  protected trigger(type: string, ...params: any[]) {
    if (this.event[type]) {
      this.event[type].forEach(x => x(params));
    }
    const list = this.eventOnce[type];
    delete this.eventOnce[type];
    if (list) {
      list.forEach(x => x(params));
    }
  }

  onUpdate(cb: Callback) {
    this.on("update", cb);
  }

  protected triggerUpdate(...params: any[]) {
    this.trigger("update", ...params);
  }
}