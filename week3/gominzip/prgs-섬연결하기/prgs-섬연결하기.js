function findParent(parent, x) {
  if (parent[x] === x) return x;
  return findParent(parent, parent[x]);
}

function union(parent, a, b) {
  const rootA = findParent(parent, a);
  const rootB = findParent(parent, b);
  if (rootA < rootB) parent[rootB] = rootA;
  else parent[rootA] = rootB;
}

function solution(n, costs) {
  var answer = 0;
  const parent = Array.from({length: n}, (_, i) => i);
  costs = costs.sort((a, b) => a[2] - b[2]);

  for (const [a, b, cost] of costs) {
    if (findParent(parent, parent[a]) !== findParent(parent, parent[b])) {
      union(parent, a, b);
      answer += cost;
    }
  }
  return answer;
}
