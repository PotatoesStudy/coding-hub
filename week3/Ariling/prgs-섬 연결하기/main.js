function solution(n, costs) {
  // 최소신장트리를 생각하였다. 딱봐도 그래프 문제인데 다익스트라는 출발점이 안 정해져있어서 아닌 것 같기 때문이었다.
  costs = costs.sort((a, b) => a[2] - b[2]);
  let node_arr = new Array(n);
  for (let i = 0; i < node_arr.length; i++) {
    node_arr[i] = i;
  }
  // Union - find는 기억이 가물가물해서 과거에 공부했던 것을 찾아보았다.
  function find(x) {
    if (node_arr[x] === x) {
      return x;
    }
    return find(node_arr[x]);
  }
  function union(x, y) {
    x = find(x);
    y = find(y);
    if (x == y) {
      return false;
    }
    if (x < y) {
      node_arr[y] = x;
    } else {
      node_arr[x] = y;
    }
    return true;
  }
  var answer = 0;
  for (let i = 0; i < costs.length; i++) {
    var [st, ed, cost] = costs[i];
    if (union(st, ed)) {
      answer += cost;
    }
  }
  return answer;
}

console.log(
  solution(4, [
    [0, 1, 1],
    [0, 2, 2],
    [1, 2, 5],
    [1, 3, 1],
    [2, 3, 8],
  ])
);
