const fs = require("fs");
let input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");
const N = Number(input.shift());
input.pop();
input = input.map((i) => i.split(" ").map(Number));

function solution(N, input) {
  const point = Array.from({ length: N + 1 }, () =>
    Array(N + 1).fill(Infinity)
  );

  for (let i = 1; i <= N; i++) {
    point[i][i] = 0;
  }

  for (info of input) {
    point[info[0]][info[1]] = 1;
    point[info[1]][info[0]] = 1;
  }

  // 플로이드 워셜 - 중간 정점: k, 시작 정점: i, 도착 정점: j
  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        point[i][j] = Math.min(point[i][j], point[i][k] + point[k][j]);
      }
    }
  }

  const scores = [];
  for (let i = 1; i <= N; i++) {
    const maxDistance = Math.max(...point[i].slice(1)); // i 회원의 최대 거리
    scores.push(maxDistance);
  }

  // 최소 점수 찾기
  const minScore = Math.min(...scores);
  const candidates = scores
    .map((score, idx) => (score === minScore ? idx + 1 : null))
    .filter((idx) => idx !== null);

  console.log(minScore, candidates.length);
  console.log(candidates.join(" "));
}

solution(N, input);
