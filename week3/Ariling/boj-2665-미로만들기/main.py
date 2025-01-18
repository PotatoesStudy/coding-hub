import sys
from collections import deque
input = sys.stdin.readline

N = int(input())
arr = [list(map(int, list(input().rstrip()))) for _ in range(N)]
result = int(1e9)
def bfs(x, y):
    global result
    move_arr = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    check = [[False] * N for _ in range(N)]
    check[x][y] = True
    q = deque([])
    # x, y, 검은 방 통과하는 수
    q.append((x, y, 0))
    while q:
        r, c, black_stone = q.popleft()
        if black_stone > result:
            continue
        if r == N-1 and c == N-1 and black_stone < result:
            result = black_stone
            continue
        for i in range(4):
            newR = r + move_arr[i][0]
            newC = c + move_arr[i][1]
            if 0 <= newR < N and 0 <= newC < N and not check[newR][newC]:
                if arr[newR][newC] == 1:
                    q.appendleft((newR, newC, black_stone))
                else:
                    q.append((newR, newC, black_stone + 1))
                check[newR][newC] = True
bfs(0, 0)
print(result)