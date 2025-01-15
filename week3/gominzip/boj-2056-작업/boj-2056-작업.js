const fs = require("fs");
let [N, ...arr] = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

N = Number(N);
arr = arr.map((a) => a.split(" ").map(Number));

function solution(N, arr) {
  const graph = Array.from({ length: N + 1 }, () => []);
  const inDegree = Array(N + 1).fill(0);
  const time = Array(N + 1).fill(0);
  const finishTime = Array(N + 1).fill(0);

  for (let i = 0; i < N; i++) {
    const [t, count, ...dependencies] = arr[i];
    time[i + 1] = t;
    inDegree[i + 1] = count;
    for (const dep of dependencies) {
      graph[dep].push(i + 1);
    }
  }

  const queue = [];

  // 초기 선행 조건 없는 작업
  for (let i = 1; i <= N; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
      finishTime[i] = time[i];
    }
  }

  // 위상정렬
  while (queue.length) {
    const curr = queue.shift();
    for (const next of graph[curr]) {
      inDegree[next]--;
      finishTime[next] = Math.max(
        finishTime[next],
        finishTime[curr] + time[next]
      ); // 종료 시간 갱신
      if (inDegree[next] === 0) {
        queue.push(next); // 선행작업 완료
      }
    }
  }

  return Math.max(...finishTime);
}

console.log(solution(N, arr));
