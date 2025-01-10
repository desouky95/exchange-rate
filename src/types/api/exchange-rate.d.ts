declare type ExchangeRate = {
  [key: string]: {
    [key: string]: number;
  };
} & {
  date: string;
};
