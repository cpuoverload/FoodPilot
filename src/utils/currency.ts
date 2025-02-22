const CNY_TO_SGD_RATE = 5.2;

export const convertCNYtoSGD = (cnyAmount: number): string => {
  return (cnyAmount / CNY_TO_SGD_RATE).toFixed(2);
}; 