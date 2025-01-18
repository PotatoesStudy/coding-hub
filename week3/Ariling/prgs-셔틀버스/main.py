def solution(n, t, m, timetable):
    # 그래... 규칙은 알아냈다.
    answer = ''
    # 다 분으로 변환하기
    timeArr = []
    for time in timetable:
        hour = int(time[:2])*60
        minute = int(time[3:])
        timeArr.append(hour+minute)
    timeArr = sorted(timeArr)
    # 버스 시간 만들기
    busTime = [9*60+t*i for i in range(n)]
    i = 0 # 버스에 탈 크루의 인덱스
    for bus in busTime:
        cnt = 0
        while cnt < m and i < len(timeArr) and timeArr[i] <= bus:
            i += 1
            cnt += 1
        if cnt < m:
            answer = bus
        else:
            answer = timeArr[i-1] - 1 # 맨 마지막 크루보다 1분전에 해서 들어가면 된다.
    # 숫자를 문자열로 바꾸기
    hour = answer // 60
    minute = answer - (hour * 60)
    # zfill이라는 메서드로 숫자앞에 0을 붙이는 걸 알았습니당
    answer = str(hour).zfill(2) + ":" + str(minute).zfill(2)
    return answer