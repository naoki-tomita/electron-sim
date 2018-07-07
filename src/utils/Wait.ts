export async function wait(time: number) {
  return new Promise(ok => setTimeout(ok, time));
}