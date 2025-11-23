// -------------------------------------------------------
// 功能 1 (讀取)：頁面載入時，自動從瀏覽器取出上次存的資料
// -------------------------------------------------------
const savedBirthday = localStorage.getItem("user_birthday");
const savedPetType = localStorage.getItem("user_petType");

// 如果有存過生日，就填回去
if (savedBirthday) {
  document.getElementById("birthday").value = savedBirthday;
}
// 如果有存過種類，就填回去
if (savedPetType) {
  document.getElementById("petType").value = savedPetType;
}


// -------------------------------------------------------
// 原有的按鈕計算邏輯 (包含 功能 2：儲存資料)
// -------------------------------------------------------
document.getElementById("calcBtn").addEventListener("click", function () {
  const birthday = document.getElementById("birthday").value;
  const petType = document.getElementById("petType").value;
  const resultDiv = document.getElementById("result");

  if (!birthday || !petType) {
    resultDiv.style.display = "block";
    resultDiv.innerHTML = "⚠️ 請完整填寫所有欄位！";
    return;
  }

  // [新增功能]：按下按鈕時，將目前的輸入值存到瀏覽器
  localStorage.setItem("user_birthday", birthday);
  localStorage.setItem("user_petType", petType);

  // --- 以下維持您原本的計算邏輯 ---

  // 計算實際年齡（以年為單位，含小數）
  const birthDate = new Date(birthday);
  const today = new Date();
  const diffTime = today - birthDate;
  const petAge = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  const petAgeFixed = petAge.toFixed(2);

  // 換算人類年齡
  let humanAge = 0;

  if (petType === "cat") {
    humanAge =
      petAge <= 1
        ? petAge * 15
        : petAge <= 2
        ? 15 + (petAge - 1) * 9
        : 24 + (petAge - 2) * 4;
  } else {
    let multiplier;
    switch (petType) {
      case "smallDog":
        multiplier = 5.5;
        break;
      case "mediumDog":
        multiplier = 6;
        break;
      case "largeDog":
        multiplier = 7;
        break;
      case "giantDog":
        multiplier = 9;
        break;
    }
    humanAge = petAge * multiplier;
  }

  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    🐾 毛小孩的實際年齡：約 <b>${petAgeFixed} 歲</b><br>
    🧍 換算人類年齡：約 <b>${humanAge.toFixed(1)} 歲</b>
  `;
});