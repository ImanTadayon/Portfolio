// ##########################################################

const time = document.querySelector(".time");
const ring = new Audio("./file/911.wav");
setInterval(() => {
  var MyDate = new Date();
  var MyHour = MyDate.getHours();
  var MyMin = MyDate.getMinutes();
  var MySecond = MyDate.getSeconds();

  MyHour = MyHour < 10 ? "0" + MyHour : MyHour;
  MyMin = MyMin < 10 ? "0" + MyMin : MyMin;
  MySecond = MySecond < 10 ? "0" + MySecond : MySecond;

  time.innerHTML = MyHour + ":" + MyMin + ":" + MySecond;
  if (alarmTime == MyHour + ":" + MyMin) {
    time.style.backgroundColor = "red";
    ring.play();
    ring.loop = true;
  }
}, 1000);

// or

// function showTime() {
//   var MyDate = new Date();
//   var MyHour = MyDate.getHours();
//   var MyMin = MyDate.getMinutes();
//   var MySecond = MyDate.getSeconds();
//   var time = document.getElementById("time");
//   MyHour = MyHour < 10 ? "0" + MyHour : MyHour;
//   MyMin = MyMin < 10 ? "0" + MyMin : MyMin;
//   MySecond = MySecond < 10 ? "0" + MySecond : MySecond;
//   time.innerHTML = MyHour + ":" + MyMin + ":" + MySecond;
// }
// setInterval(showTime, 1000);

// ##############################################################

const selectTime = document.querySelectorAll("select");

for (let i = 23; i >= 0; i--) {
  i = i < 10 ? "0" + i : i--;
  let Hours = `<option value="${i}">${i}</option>`;
  selectTime[0].firstElementChild.insertAdjacentHTML("afterend", Hours);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i--;
  let Minutes = `<option value="${i}">${i}</option>`;
  selectTime[1].firstElementChild.insertAdjacentHTML("afterend", Minutes);
}

// ##############################################################

const button = document.querySelector("button");
const content = document.querySelector(".content");

let alarmTime;
let alarmState = "noset";
button.addEventListener("click", () => {
  alarmTime = `${selectTime[0].value}:${selectTime[1].value}`;
  if (alarmTime.includes("Hour") || alarmTime.includes("Minute")) {
    return alert("یک زمان برای بیدارباش انتخاب کنید");
  }
  checkState(alarmState);
});

// ##############################################################

function checkState(state) {
  if (state == "noset") {
    content.classList.add("disable");
    button.innerText = "Clear Alarm";
    alarmState = "set";
    button.style.backgroundColor = "rgb(110 78 57)";
  } else {
    content.classList.remove("disable");
    alarmTime = "";
    ring.pause();
    alarmState = "noset";
    button.innerText = "Set Alarm";
    button.style.backgroundColor = "rgb(141 40 34)";
    time.style.backgroundColor = "";
  }
}
