# 🔎 미로만들기

https://www.acmicpc.net/problem/2665

## 💡 아이디어

- BFS를 활용하되 검은 방 부분은 끝 부분으로 넣고 흰 방 부분은 앞에 넣어서 흰 방으로 가는 길을 우선적으로 탐색하도록 한다.

## ✔ 문제풀이

- 먼저 공백이 없는 숫자를 숫자 배열로 담는다.

  > js : line.split("").map(Number) 즉 공백을 안하면 알아서 나눠준다.

  > python : list(map) 까지는 똑같지만 그 뒤의 input().split()을 활용하지 않고 line().rstrip()을 활용하고 그 안에 list로 묶어주면 된다.

- bfs로 만들 되 append하는 부분을 다음과 같이 정한다.
  - 만약 검은 방이라면 끝 부분에 넣는다.
  - 반대로 흰 방이라면 앞 부분에 넣어서 우선적으로 탐색하도록 한다.
  - 순환을 하면서 삭제하는 방이 결과보다 많다면 즉시 멈추고 다른 부분을 탐색한다.

## 🤕 어려웠던 점

- 처음에는 dfs로 다 찾되 백트래킹을 하면 된다고 생각했고 다음과 같이 했었다. 근데 시간초과가 나길래 아... 이건 bfs구나를 생각했다. -> 그래도 재귀로 하면 dfs 구현은 어느 정도 가능한 듯!
  - 그 외엔 흰 방을 끝에 넣어야 하나 순서대로 넣어야 하나 앞에 넣어야 하나 그게 좀 헷갈렸다. 그래서 그냥 3가지 다 해봐서 가장 맞는 걸 했더니 답은 잘 나왔다.

```js
function dfs(x, y, delete_stone) {
  // ... 생략
  if (delete_stone > remove_result) return;
  if (x === n - 1 && y === n - 1) {
    if (delete_stone < remove_result) {
      remove_result = delete_stone;
    }
    return;
  }
  for (let i = 0; i < move_arr.length; i++) {
    const [newR, newC] = [x + move_arr[i][0], y + move_arr[i][1]];
    if (
      0 <= newR &&
      newR < n &&
      0 <= newC &&
      newC < n &&
      check_arr[newR][newC] === false
    ) {
      check_arr[newR][newC] = true;
      dfs(
        newR,
        newC,
        input[newR][newC] === 0 ? delete_stone + 1 : delete_stone
      );
      check_arr[newR][newC] = false;
    }
  }
}
```
