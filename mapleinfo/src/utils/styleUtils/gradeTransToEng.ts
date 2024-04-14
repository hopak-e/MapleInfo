interface ColorGrade {
  [key: string]: string;
}

const gradeTransToEng = (grade: string) => {
  const transGrade: ColorGrade = {
    레전드리: "legendary",
    유니크: "unique",
    에픽: "epic",
    레어: "rare",
  };
  return transGrade[grade];
};

export default gradeTransToEng;
