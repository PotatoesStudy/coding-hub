from collections import deque
# 평범한 bfs문제 (js로 먼저 풀었다)
def solution(maps):
    answer = []
    map_arr = []
    for map in maps:
        map_arr.append([*map])
    checked = [[False] * len(map_arr[0]) for _ in range(len(map_arr))]
    def seek(i, j):
        q = deque([(i, j)])
        checked[i][j] = True
        dr = [-1, 1, 0, 0]
        dc = [0, 0, -1, 1]
        land = int(map_arr[i][j])
        while q:
            r, c = q.popleft()
            for k in range(4):
                newR = r + dr[k]
                newC = c + dc[k]
                if 0 <= newR < len(map_arr) and 0 <= newC < len(map_arr[0]):
                    if map_arr[newR][newC] != 'X' and not checked[newR][newC]:
                        checked[newR][newC] = True
                        q.append((newR, newC))
                        land += int(map_arr[newR][newC])
        answer.append(land)
        return
    for i in range(len(map_arr)):
        for j in range(len(map_arr[i])):
            if map_arr[i][j] != 'X' and not checked[i][j]:
                seek(i, j)
    if not answer:
        return [-1]
    else:
        return sorted(answer)