function solution(maps) {
  var answer = [];
  var land_arr = [];
  // 문자열을 배열로 치환하기
  for (let i = 0; i < maps.length; i++) {
    land_arr.push(Array.from(maps[i]));
  }
  var check_arr = Array(land_arr.length)
    .fill()
    .map(() => Array(land_arr[0].length).fill(false));
  var move_arr = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
  ];
  // bfs로 각 섬들 면적 구하기
  function bfs(x, y) {
    var q = [[x, y]];
    check_arr[parseInt(x)][parseInt(y)] = true;
    // 총 면적 구하는 변수
    var sum = parseInt(land_arr[x][y]);
    while (q.length > 0) {
      var [r, c] = q.shift();
      for (let i = 0; i < 4; i++) {
        var [newR, newC] = [
          parseInt(r) + move_arr[i][0],
          parseInt(c) + move_arr[i][1],
        ];
        if (
          0 <= newR &&
          newR < land_arr.length &&
          0 <= newC &&
          newC < land_arr[0].length &&
          !check_arr[newR][newC] &&
          land_arr[newR][newC] !== "X"
        ) {
          sum += parseInt(land_arr[newR][newC]);
          check_arr[newR][newC] = true;
          q.push([newR, newC]);
        }
      }
    }
    return sum;
  }
  for (let i = 0; i < land_arr.length; i++) {
    for (let j = 0; j < land_arr[0].length; j++) {
      if (!check_arr[i][j] && land_arr[i][j] !== "X") {
        var land_width = bfs(i, j);
        answer.push(land_width);
      }
    }
  }

  return answer.length > 0 ? answer.sort((a, b) => a - b) : [-1];
}
