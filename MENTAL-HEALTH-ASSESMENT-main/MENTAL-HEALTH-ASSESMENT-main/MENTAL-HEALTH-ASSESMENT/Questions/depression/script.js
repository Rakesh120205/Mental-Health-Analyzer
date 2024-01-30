//getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const form_btn = document.querySelector(".container button");

// if start quiz buutton clicked
start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); //show the info box
};

//if exit button clicked
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide the info box
};

//if continue is clicked
continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide the info box
  quiz_box.classList.add("activeQuiz"); //show the quiz box
  showQuestions(0);
  queCounter(1);
};

let que_count = 0;
let que_numb = 1;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


quit_quiz.onclick = () => {
  window.location.reload();
};

//if next button clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    next_btn.style.display = "none";
  } else {
    console.log("Questions completed");
    showResultbox();
  }
};

//getting questions and options from array
function showQuestions(index) {
  const que_text = document.querySelector(".que_text");
  const option_list = document.querySelector(".option_list");
  let que_tag =
    "<span>" +
    questions[index].numb +
    "." +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option">' +
    questions[index].options[0] +
    "<span></span></div>" +
    '<div class="option">' +
    questions[index].options[1] +
    "<span></span></div>";

  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  let userAns = answer.textContent;
  let correctAns = questions[que_count].answer;
  let allOptions = option_list.children.length;
  console.log(userAns, correctAns);

  if (userAns == correctAns) {
    userScore += 1;
    console.log(userScore);
    answer.classList.add("correct");
    console.log("Answer is correct");
  } else {
    answer.classList.add("incorrect");
    console.log("Answer is wrong");

    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correctAns) {
        option_list.children[i].setAttribute("class", "option correct");
      }
    }
    next_btn.style.display = "block";
  }

  //once user selected disabled all options
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.style.display = "block";
}

function showResultbox() {
  info_box.classList.remove("activeInfo"); //hide the info box
  quiz_box.classList.remove("activeQuiz"); //show the quiz
  result_box.classList.add("activeResult");
  const scoreText = result_box.querySelector(".complete_text");
  if (userScore == 10) {
    let scoreTag =
      "<span><p>Your Depression Test Score is:" + userScore + "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore >= 7 && userScore <= 9) {
    let scoreTag =
      "<span><p>Your Depression Test Score is: " + userScore + "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore >= 4 && userScore <= 6) {
    let scoreTag =
      "<span><p>Your Depression Test Score is: " + userScore + "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span><p>Your Depression Test Score is:  " + userScore + "</p></span> ";
    scoreText.innerHTML = scoreTag;
  }
}

function queCounter(index) {
  const bottom_ques_counter = quiz_box.querySelector(".total_que");
  let totalQuesCountTag =
    "<span><p>" +
    index +
    "</p>of<p>" +
    questions.length +
    "</p>questions</span>";
  bottom_ques_counter.innerHTML = totalQuesCountTag;
}
