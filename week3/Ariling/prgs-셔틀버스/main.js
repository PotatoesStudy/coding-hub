function solution(n, t, m, timetable) {
  var answer = "";
  const timeArr = [];
  const busArr = [];
  // 먼저 각 타임 테이블 애들을 숫자로 바꿔준다.
  for (let i = 0; i < timetable.length; i++) {
    let hour = parseInt(timetable[i].slice(0, 3));
    let minute = parseInt(timetable[i].slice(3));
    timeArr.push(hour * 60 + minute);
  }
  timeArr.sort((a, b) => a - b);
  // 버스 시간 배열 만들기
  for (let i = 0; i < n; i++) {
    busArr.push(9 * 60 + t * i);
  }
  let idx = 0;
  // 콘의 탑승 시간 알아내기 각각 버스의 경우를 보면서
  for (let i = 0; i < busArr.length; i++) {
    let bus = busArr[i];
    let cnt = 0;
    while (idx < timeArr.length && timeArr[idx] <= bus && cnt < m) {
      idx += 1;
      cnt += 1;
    }
    if (cnt < m) {
      answer = bus;
    } else {
      // 0번부터 들어간 것이므로 idx-1을 해주고 1분 전에 얌치기를 해야 콘이 들어갈 수 있다.
      answer = timeArr[idx - 1] - 1;
    }
  }
  // 다시 문자열로 치환하기
  let hour = String(Math.floor(answer / 60));
  let minute = String(answer - Math.floor(answer / 60) * 60);
  hour = hour.length > 1 ? hour : hour.padStart(2, 0);
  minute = minute.length > 1 ? minute : minute.padStart(2, 0);
  answer = hour + ":" + minute;
  return answer;
}
