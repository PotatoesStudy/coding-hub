function solution(maps) {
  var answer = [];
  const [h, w] = [maps.length, maps[0].length];
  const nmaps = maps.map((m) => m.split(""));
  const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  function bfs(nmaps, sy, sx) {
    const queue = [[sy, sx]];
    let days = Number(nmaps[sy][sx]);
    nmaps[sy][sx] = "X";

    while (queue.length) {
      const [cy, cx] = queue.shift();
      for (let [dy, dx] of dir) {
        const [ny, nx] = [cy + dy, cx + dx];
        if (0 <= ny && ny < h && 0 <= nx && nx < w && nmaps[ny][nx] !== "X") {
          days += Number(nmaps[ny][nx]);
          nmaps[ny][nx] = "X";
          queue.push([ny, nx]);
        }
      }
    }
    return days;
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (nmaps[y][x] !== "X") answer.push(bfs(nmaps, y, x));
    }
  }

  return answer.length ? answer.sort((a, b) => a - b) : [-1];
}
