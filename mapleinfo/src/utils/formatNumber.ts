const formatNumber = (num: number) => {
  const trillion = Math.floor(num / 1000000000000);
  const oneHunderedMillion = Math.floor((num % 1000000000000) / 100000000);
  const tenThousand = Math.floor((num % 100000000) / 10000);

  let result = "";

  if (trillion > 0) {
    result += `${trillion}조 `;
  }

  if (oneHunderedMillion > 0) {
    result += `${oneHunderedMillion}억 `;
  }

  if (tenThousand > 0) {
    result += `${tenThousand}만 `;
  }

  return result;
};

export default formatNumber;
