// 이것도 위상정렬이란거를 안다... 근데 문제는 내가 어떻게 구현 해야할지 모른다는 것뿐이지..
const fs = require("fs");
const [firstLine, ...input] = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = parseInt(firstLine);
const arr = input.map((line) => line.split(" ").map(Number));

function solution(n, input) {
  let graph = Array(n + 1)
    .fill()
    .map(() => []);
  let indegree = Array(n + 1).fill(0);
  let totalTime = Array(n + 1).fill(0);
  for (let i = 0; i < input.length; i++) {
    const [time, cnt, ...info] = input[i];
    totalTime[i + 1] = time;
    if (cnt > 0) {
      // 그래프와 진입 지수 초기화 하기
      for (let j = 0; j < info.length; j++) {
        graph[info[j]].push(i + 1);
        indegree[i + 1]++;
      }
    }
  }
  // 진입 지수가 0인 노드를 큐에 추가하기
  let q = [];
  for (let i = 1; i <= n; i++) {
    if (indegree[i] === 0) {
      q.push(i);
    }
  }
  // 위상 정렬 및 소요 시간 갱신
  while (q.length > 0) {
    const current = q.shift();
    for (let i = 0; i < graph[current].length; i++) {
      const next = graph[current][i];
      indegree[next]--;
      totalTime[next] = Math.max(
        totalTime[next],
        totalTime[current] + input[next - 1][0]
      );

      if (indegree[next] === 0) {
        q.push(next); // 진입차수 0이면 추가해주기
      }
    }
  }
  const result = Math.max(...totalTime);
  console.log(result);
}

solution(n, arr);
