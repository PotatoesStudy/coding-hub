const fs = require("fs");
const [firstLine, ...input] = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = parseInt(firstLine);
const arr = input.map((line) => line.split(" ").map(Number));
// pq도 없길래 그냥 이렇게 구현을 해 버렸다.. 이 정도는 할 수 있을 듯?
class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(node) {
    this.values.push(node);
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a[0] - b[0]);
  }
}
function solution(n, input) {
  let graph = Array(n + 1)
    .fill()
    .map(() => []);
  // graph 경로 업데이트! 노드방식을 이용해서 하였다. 가끔 2중 배열은 최적화 난리를 치는 경우가 있기 때문
  for (let i = 0; i < input.length; i++) {
    const [mem1, mem2] = input[i];
    if (mem1 === -1 && mem2 === -1) break;

    // 양방향 간선 추가 (가중치는 1)
    graph[mem1].push([1, mem2]);
    graph[mem2].push([1, mem1]);
  }
  function dijkstra(start) {
    let distance = Array(n + 1).fill(51);
    let pq = new PriorityQueue();
    pq.enqueue([0, start]); // dist, node위치
    distance[start] = 0;
    // 흔한 다익스트라 방식..
    while (pq.values.length > 0) {
      const [dist, now] = pq.dequeue();
      if (distance[now] < dist) continue;

      for (let i = 0; i < graph[now].length; i++) {
        const [next_dist, next_node] = graph[now][i];
        let new_dist = next_dist + dist;

        if (new_dist < distance[next_node]) {
          // 거리 업데이트 조건
          distance[next_node] = new_dist;
          pq.enqueue([new_dist, next_node]);
        }
      }
    }
    let max_num = Math.max(...distance.filter((d) => d < 51));
    return max_num;
  }
  var dijkstra_result = [];
  var result_arr = [0, 0];
  var result_num = [];
  for (let i = 1; i < n + 1; i++) {
    var each_result = dijkstra(i);
    dijkstra_result.push(each_result);
  }
  var result_max = Math.min(...dijkstra_result);
  result_arr[0] = result_max;
  for (let i = 0; i < dijkstra_result.length; i++) {
    if (result_max == dijkstra_result[i]) {
      result_arr[1]++;
      result_num.push(i + 1);
    }
  }
  console.log(result_arr.join(" "));
  console.log(result_num.join(" "));
}
solution(n, arr);
