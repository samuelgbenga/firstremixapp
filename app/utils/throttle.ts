export function throttle(func: any, timeFrame: any) {
  let lastTime = 0;

  return function (...args: any) {
    const now: any = new Date();

    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
}
