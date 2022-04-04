export const getLevel = (acorn: number) => {
  if (acorn < 10) {
    return "Lv 1. 씨앗 도토리";
  } else if (acorn < 30) {
    return "Lv 2. 새싹 도토리";
  } else if (acorn < 60) {
    return "Lv 3. 무럭무럭 도토리";
  } else if (acorn < 100) {
    return "Lv 4. 도토리 나무";
  } else {
    return "Lv 5. 전설 도토리";
  }
};
