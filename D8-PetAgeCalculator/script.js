document.getElementById("calcBtn").addEventListener("click", function () {
  const birthday = document.getElementById("birthday").value;
  const petType = document.getElementById("petType").value;
  const resultDiv = document.getElementById("result");

  if (!birthday || !petType) {
    resultDiv.style.display = "block";
    resultDiv.innerHTML = "⚠️ 請完整填寫所有欄位！";
    return;
  }

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
