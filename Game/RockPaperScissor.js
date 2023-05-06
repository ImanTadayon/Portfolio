// ###############   متغیر های بازی و دسترسی ها  ################

let myList = ["Rock", "Paper", "Scissors"];
let result = document.querySelector(".result");
let userScore = document.querySelector(".userScore");
let AIScore = document.querySelector(".compScore");
let userSelect = document.querySelectorAll("img");
let scoreUser = 0;
let scoreAI = 0;
let random;

// ###############  متغیرهای مربوط به افزودن تصویر انتخابی توسط کامپیوتر    #############

const Rock = '<img src="./Pic/1.png" alt="" class="choice" id="Rock">';
const Paper = '<img src="./Pic/2.png" alt="" class="choice" id="Paper">';
const Scissors = '<img src="./Pic/3.png" alt="" class="choice" id="Scissors">';

// ############### انتخاب توسط کامپیوتر به صورت اتفاقی   #############

let AI = () => {
  random = myList[Math.floor(Math.random() * myList.length)];
  if (random === "Rock") {
    document.querySelector(".aichoices").innerHTML = Rock;
  } else if (random === "Paper") {
    document.querySelector(".aichoices").innerHTML = Paper;
  } else {
    document.querySelector(".aichoices").innerHTML = Scissors;
  }
  return random;
};

// ###############   انتخاب توسط کاربر و شرط های بازی     #############

userSelect.forEach((Select) =>
  Select.addEventListener("click", (e) => {
    document.getElementById("resetScore").style.display = "inline-block";
    const AiRandom = AI();

    if (
      (e.target.id == "Paper" && AiRandom == "Rock") ||
      (e.target.id == "Rock" && AiRandom == "Scissors") ||
      (e.target.id == "Scissors" && AiRandom == "Paper")
    ) {
      scoreUser += 1;
      result.innerHTML = "WON";
      userScore.innerHTML = scoreUser;
    } else if (
      (AiRandom == "Paper" && e.target.id == "Rock") ||
      (AiRandom == "Rock" && e.target.id == "Scissors") ||
      (AiRandom == "Scissors" && e.target.id == "Paper")
    ) {
      result.innerHTML = "Ai WON";
      scoreAI++;
      AIScore.innerHTML = scoreAI;
    } else if (e.target.id === AiRandom) {
      result.innerHTML = "Draw";
    }
  })
);

// ###############   تنظیمات و ایجاد دکمه ریست    #############

let resetButton = document.getElementById("resetScore");

resetButton.addEventListener("click", () => {
  scoreUser = 0;
  scoreAI = 0;
  document.getElementById("resetScore").style.display = "none";
  document.querySelector(".aichoices").innerHTML = "";
  result.innerHTML = "";
  userScore.innerHTML = 0;
  AIScore.innerHTML = 0;
});
