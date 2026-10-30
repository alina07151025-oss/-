// 建立英文單字測驗題目，包含單字、中文意思與四個選項。
const questions = [
  {
    word: "apple",
    prompt: "圖片代表的英文單字是什麼？",
    choices: ["apple", "banana", "orange", "grape"],
    answer: 0,
    emoji: "🍎"
  },
  {
    word: "cat",
    prompt: "圖片代表的英文單字是什麼？",
    choices: ["dog", "cat", "rabbit", "bird"],
    answer: 1,
    emoji: "🐱"
  },
  {
    word: "water",
    prompt: "圖片代表的英文單字是什麼？",
    choices: ["milk", "juice", "water", "tea"],
    answer: 2,
    emoji: "💧"
  },
  {
    word: "sun",
    prompt: "圖片代表的英文單字是什麼？",
    choices: ["moon", "star", "cloud", "sun"],
    answer: 3,
    emoji: "☀️"
  },
  {
    word: "book",
    prompt: "圖片代表的英文單字是什麼？",
    choices: ["book", "pencil", "desk", "school"],
    answer: 0,
    emoji: "📖"
  },
  {
    word: "happy",
    prompt: "圖片代表的英文單字是什麼？",
    choices: ["sad", "angry", "tired", "happy"],
    answer: 3,
    emoji: "😊"
  },
  {
    word: "red",
    prompt: "圖片代表的英文單字是什麼？",
    choices: ["red", "blue", "green", "yellow"],
    answer: 0,
    emoji: "🔴"
  },
  {
    word: "five",
    prompt: "圖片代表的英文單字是什麼？",
    choices: ["one", "three", "four", "five"],
    answer: 3,
    emoji: "5️⃣"
  },
  {
    word: "fish",
    prompt: "圖片代表的英文單字是什麼？",
    choices: ["fish", "horse", "duck", "sheep"],
    answer: 0,
    emoji: "🐟"
  },
  {
    word: "run",
    prompt: "圖片代表的英文單字是什麼？",
    choices: ["sleep", "eat", "run", "draw"],
    answer: 2,
    emoji: "🏃"
  }
];

// 設定測驗目前的題目、分數與操作狀態。
let currentQuestion = 0;
let score = 0;
let selectedAnswer = -1;
let answerLocked = false;
let quizStarted = false;
let choiceRects = [];

// 設定 P5.js 畫布，並讓畫布充滿瀏覽器視窗。
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Arial, sans-serif");
}

// 持續繪製測驗畫面。
function draw() {
  // 使用指定粉紅色作為背景。
  background("#ffc8dd");
  choiceRects = [];

  if (!quizStarted) {
    drawStartScreen();
  } else if (currentQuestion >= questions.length) {
    drawResultScreen();
  } else {
    drawQuestionScreen();
  }
}

// 當視窗大小改變時，同步調整畫布尺寸。
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// 繪製歡迎畫面與開始測驗按鈕。
function drawStartScreen() {
  // 計算響應式版面尺寸。
  const cardWidth = min(width * 0.88, 620);
  const cardHeight = min(height * 0.72, 470);
  const cardX = (width - cardWidth) / 2;
  const cardY = (height - cardHeight) / 2;
  const buttonWidth = min(cardWidth * 0.58, 300);
  const buttonHeight = 64;

  // 繪製半透明裝飾圓圈。
  noStroke();
  fill(255, 255, 255, 90);
  ellipse(width * 0.12, height * 0.18, 110, 110);
  ellipse(width * 0.88, height * 0.74, 150, 150);

  // 繪製白色卡片。
  drawCard(cardX, cardY, cardWidth, cardHeight);

  // 顯示標題與說明文字。
  fill("#4A4A68");
  textAlign(CENTER, CENTER);
  textSize(clamp(width * 0.045, 28, 48));
  textStyle(BOLD);
  text("English Word Quiz", width / 2, cardY + 78);

  textSize(clamp(width * 0.025, 18, 24));
  textStyle(NORMAL);
  fill("#77728A");
  text("適合 9～12 歲初學者", width / 2, cardY + 132);
  text(`${questions.length} 題小挑戰 • 每題都有 4 個選項`, width / 2, cardY + 170);

  // 顯示可愛的圖示列。
  textSize(clamp(width * 0.06, 38, 58));
  text("📚  ✏️  🌈", width / 2, cardY + 245);

  // 繪製開始按鈕。
  drawButton(width / 2 - buttonWidth / 2, cardY + cardHeight - 105, buttonWidth, buttonHeight, "開始測驗", "#ff70a6", "#ffffff");
  choiceRects.push({
    x: width / 2 - buttonWidth / 2,
    y: cardY + cardHeight - 105,
    w: buttonWidth,
    h: buttonHeight,
    action: "start"
  });
}

// 繪製目前題目、進度條與答案選項。
function drawQuestionScreen() {
  const question = questions[currentQuestion];
  const cardWidth = min(width * 0.92, 760);
  const cardX = (width - cardWidth) / 2;
  const topY = max(18, height * 0.05);
  const progressHeight = 12;
  const cardTop = topY + 48;
  const cardHeight = height - cardTop - 24;

  // 顯示題目數量與分數。
  fill("#4A4A68");
  textAlign(LEFT, CENTER);
  textSize(clamp(width * 0.018, 16, 22));
  textStyle(BOLD);
  text(`Question ${currentQuestion + 1} / ${questions.length}`, cardX, topY + 12);
  textAlign(RIGHT, CENTER);
  fill("#ff4d88");
  text(`Score: ${score}`, cardX + cardWidth, topY + 12);

  // 繪製進度條。
  noStroke();
  fill(255, 255, 255, 180);
  rect(cardX, topY + 34, cardWidth, progressHeight, 20);
  fill("#ff70a6");
  rect(cardX, topY + 34, cardWidth * ((currentQuestion + (selectedAnswer >= 0 ? 1 : 0)) / questions.length), progressHeight, 20);

  // 繪製題目卡片。
  drawCard(cardX, cardTop, cardWidth, cardHeight);

  // 顯示大型圖片提示，不另外顯示英文單字。
  textAlign(CENTER, CENTER);
  textSize(clamp(width * 0.09, 58, 96));
  textStyle(NORMAL);
  text(question.emoji, width / 2, cardTop + min(cardHeight * 0.27, 120));

  textSize(clamp(width * 0.022, 16, 22));
  fill("#77728A");
  text(question.prompt, width / 2, cardTop + min(cardHeight * 0.39, 175));

  // 設定四個答案按鈕的版面。
  const gap = 12;
  const optionWidth = cardWidth < 560 ? cardWidth - 42 : (cardWidth - 54) / 2;
  const optionHeight = cardHeight < 420 ? 52 : 62;
  const startX = cardX + (cardWidth - optionWidth * (cardWidth < 560 ? 1 : 2) - (cardWidth >= 560 ? gap : 0)) / 2;
  let startY = cardTop + min(cardHeight * 0.49, 215);

  if (cardWidth < 560 && cardHeight < 500) {
    startY = cardTop + cardHeight * 0.46;
  }

  // 繼續繪製每個選項。
  for (let i = 0; i < question.choices.length; i++) {
    const column = cardWidth < 560 ? 0 : i % 2;
    const row = cardWidth < 560 ? i : floor(i / 2);
    const optionX = startX + column * (optionWidth + gap);
    const optionY = startY + row * (optionHeight + gap);
    let fillColor = "#f8f6fb";
    let textColor = "#4A4A68";

    // 選錯答案顯示紅色，正確答案顯示綠色。
    if (selectedAnswer >= 0) {
      if (i === question.answer) {
        fillColor = "#ccefdc";
        textColor = "#267347";
      } else if (i === selectedAnswer) {
        fillColor = "#ffd0d0";
        textColor = "#a73737";
      }
    }

    drawButton(optionX, optionY, optionWidth, optionHeight, question.choices[i], fillColor, textColor);
    choiceRects.push({
      x: optionX,
      y: optionY,
      w: optionWidth,
      h: optionHeight,
      action: "answer",
      index: i
    });
  }

  // 顯示答題回饋與下一題按鈕。
  if (answerLocked) {
    const feedbackY = startY + 2 * (optionHeight + gap) + 4;
    textAlign(CENTER, CENTER);
    textSize(clamp(width * 0.019, 15, 20));
    textStyle(BOLD);
    if (selectedAnswer === question.answer) {
      fill("#267347");
      text("Good job! 答對了！", width / 2, feedbackY);
    } else {
      fill("#a73737");
      text("再試一次也很好！正確答案是 " + question.choices[question.answer], width / 2, feedbackY);
    }

    const nextWidth = min(cardWidth * 0.34, 180);
    const nextHeight = 48;
    const nextY = min(feedbackY + 28, cardTop + cardHeight - 58);
    drawButton(width / 2 - nextWidth / 2, nextY, nextWidth, nextHeight, "Next ▶", "#ff70a6", "#ffffff");
    choiceRects.push({
      x: width / 2 - nextWidth / 2,
      y: nextY,
      w: nextWidth,
      h: nextHeight,
      action: "next"
    });
  }
}

// 繪製測驗結束畫面與成績。
function drawResultScreen() {
  const cardWidth = min(width * 0.88, 620);
  const cardHeight = min(height * 0.72, 480);
  const cardX = (width - cardWidth) / 2;
  const cardY = (height - cardHeight) / 2;
  const percent = floor(score / questions.length * 100);
  let message = "Keep practicing! 加油！";

  // 根據分數提供鼓勵訊息。
  if (percent >= 80) {
    message = "Excellent! 你太棒了！";
  } else if (percent >= 50) {
    message = "Good work! 做得很好！";
  }

  drawCard(cardX, cardY, cardWidth, cardHeight);

  fill("#4A4A68");
  textAlign(CENTER, CENTER);
  textSize(clamp(width * 0.06, 38, 62));
  textStyle(BOLD);
  text("🎉 Quiz Complete! 🎉", width / 2, cardY + 78);

  textSize(clamp(width * 0.07, 48, 72));
  fill("#ff4d88");
  text(`${score} / ${questions.length}`, width / 2, cardY + 180);

  textSize(clamp(width * 0.025, 18, 26));
  fill("#77728A");
  text(message, width / 2, cardY + 245);
  text(`${percent}%`, width / 2, cardY + 285);

  const buttonWidth = min(cardWidth * 0.58, 300);
  const buttonHeight = 62;
  drawButton(width / 2 - buttonWidth / 2, cardY + cardHeight - 90, buttonWidth, buttonHeight, "再玩一次", "#ff70a6", "#ffffff");
  choiceRects.push({
    x: width / 2 - buttonWidth / 2,
    y: cardY + cardHeight - 90,
    w: buttonWidth,
    h: buttonHeight,
    action: "restart"
  });
}

// 繪製帶有陰影的圓角卡片。
function drawCard(x, y, w, h) {
  noStroke();
  fill(80, 60, 100, 18);
  rect(x + 6, y + 8, w, h, 24);
  fill("#ffffff");
  rect(x, y, w, h, 24);
}

// 繪製統一樣式的測驗按鈕。
function drawButton(x, y, w, h, label, fillColor, textColor) {
  noStroke();
  fill(red(color(fillColor)) * 0.9, green(color(fillColor)) * 0.9, blue(color(fillColor)) * 0.9, 35);
  rect(x, y + 5, w, h, 16);
  fill(fillColor);
  rect(x, y, w, h, 16);
  fill(textColor);
  textAlign(CENTER, CENTER);
  textSize(clamp(w * 0.07, 16, 22));
  textStyle(BOLD);
  text(label, x + w / 2, y + h / 2);
}

// 限制數值在指定的最小值與最大值之間。
function clamp(value, minimum, maximum) {
  return min(max(value, minimum), maximum);
}

// 點擊畫布時處理開始、選答案與下一題動作。
function mousePressed() {
  // 由後往前檢查按鈕，避免重疊時誤觸。
  for (let i = choiceRects.length - 1; i >= 0; i--) {
    const rectData = choiceRects[i];
    if (mouseX >= rectData.x && mouseX <= rectData.x + rectData.w &&
        mouseY >= rectData.y && mouseY <= rectData.y + rectData.h) {

      if (rectData.action === "start") {
        quizStarted = true;
      } else if (rectData.action === "restart") {
        resetQuiz();
      } else if (rectData.action === "answer") {
        handleAnswer(rectData.index);
      } else if (rectData.action === "next") {
        goToNextQuestion();
      }
      break;
    }
  }
}

// 接收使用者選擇的答案並更新分數。
function handleAnswer(index) {
  if (answerLocked) {
    return;
  }

  selectedAnswer = index;
  answerLocked = true;
  if (index === questions[currentQuestion].answer) {
    score++;
  }
}

// 前往下一題並清除上一題的選擇狀態。
function goToNextQuestion() {
  currentQuestion++;
  selectedAnswer = -1;
  answerLocked = false;
}

// 重設所有測驗資料，以便再次遊玩。
function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedAnswer = -1;
  answerLocked = false;
  quizStarted = true;
}
