interface ColorGrade {
  [key: string]: string;
}

const gradeTextStyle = (grade: string) => {
  const transGrade: ColorGrade = {
    레전드리: "text-potential-250 dark:text-potential-50",
    유니크: "text-potential-300 dark:text-potential-100",
    에픽: "text-potential-350 dark:text-potential-150",
    레어: "text-potential-400 dark:text-potential-200",
  };
  return transGrade[grade];
};

export default gradeTextStyle;
