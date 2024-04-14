export function repeatCall(fn: () => void, times: number) {
  for (let i = 0; i < times; i++) {
    fn();
  }
}
