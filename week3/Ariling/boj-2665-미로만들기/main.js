const fs = require("fs");
const [firstLine, ...input] = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = parseInt(firstLine);
const arr = input.map((line) => line.split("").map(Number));

function solution(n, input) {
  // 무조건 시작은 0,0 도착지점은 n-1, n-1인 것
  const check_arr = Array(n)
    .fill()
    .map(() => Array(n).fill(false));
  let remove_result = Infinity;
  // 그냥 다 찾는게 맞는 것 같음... -> 는 bfs구나? 바로 시초가 나옴!
  function bfs(x, y) {
    // x, y, 검은 방 삭제
    const q = [[x, y, 0]];
    const move_arr = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    check_arr[x][y] = true;
    while (q.length > 0) {
      const [r, c, black_stone] = q.shift();
      if (black_stone > remove_result) continue;
      if (r === n - 1 && c === n - 1 && black_stone < remove_result) {
        remove_result = black_stone;
        continue;
      }
      for (let i = 0; i < move_arr.length; i++) {
        const [newR, newC] = [r + move_arr[i][0], c + move_arr[i][1]];
        if (
          0 <= newR &&
          newR < n &&
          0 <= newC &&
          newC < n &&
          check_arr[newR][newC] === false
        ) {
          if (input[newR][newC] === 0) {
            // 검은 방 인 부분은 최후로 미뤄내야 짧은 길로 가기 때문
            q.push([newR, newC, black_stone + 1]);
          } else {
            q.unshift([newR, newC, black_stone]);
          }
          check_arr[newR][newC] = true;
        }
      }
    }
    return;
  }
  bfs(0, 0);
  console.log(remove_result);
}

solution(n, arr);
