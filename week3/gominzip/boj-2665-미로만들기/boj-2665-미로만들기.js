const fs = require("fs");
let [n, ...graph] = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

n = Number(n);
graph = graph.map((g) => g.split("").map(Number));

const offset = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function solution(n, graph) {
  const dist = Array.from({ length: n }, () => new Array(n).fill(Infinity));
  dist[0][0] = 0;

  const deque = [[0, 0]];

  while (deque.length) {
    const [cy, cx] = deque.shift();
    for (const [dy, dx] of offset) {
      const [ny, nx] = [cy + dy, cx + dx];
      if (0 > ny || ny >= n || 0 > nx || nx >= n) continue;

      const newDist = graph[ny][nx] ? dist[cy][cx] : dist[cy][cx] + 1;
      if (newDist < dist[ny][nx]) {
        dist[ny][nx] = newDist;
        if (graph[ny][nx]) deque.unshift([ny, nx]);
        else deque.push([ny, nx]);
      }
    }
  }

  return dist[n - 1][n - 1];
}

console.log(solution(n, graph));
