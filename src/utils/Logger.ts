

let level: number = 1;
export function setLevel(_level: number) {
  level = _level;
}


export function debug(...params: any[]) {
  if (level <= 0) {
    console.debug(...params);
  }
}

export function log(...params: any[]) {
  if (level <= 1) {
    console.log(...params);
  }
}

export function error(...params: any[]) {
  if (level <= 2) {
    console.error(...params);
  }
}
