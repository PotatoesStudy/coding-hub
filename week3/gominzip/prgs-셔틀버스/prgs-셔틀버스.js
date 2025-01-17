function solution(n, t, m, timetable) {
  var answer = "";
  let latestCrew = null;
  let firstBusTime = toMinute("09:00");
  let currentTime = firstBusTime;
  let remainingBuses = n;

  timetable = timetable.map(toMinute);
  timetable.sort((a, b) => a - b);

  while (remainingBuses > 0) {
    let availableSeats = m;
    remainingBuses--;

    while (availableSeats > 0) {
      if (timetable.length && timetable[0] <= currentTime) {
        latestCrew = timetable.shift();
        availableSeats--;
      } else {
        if (remainingBuses === 0) latestCrew = null; // 마지막 자리가 남는 경우
        break;
      }
    }

    currentTime += t;
  }

  answer = latestCrew ? latestCrew - 1 : firstBusTime + t * (n - 1);
  return toString(answer);
}

function toMinute(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function toString(minute) {
  const h = Math.floor(minute / 60);
  const m = minute % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
