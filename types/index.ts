export type Operator = {
  label: string;
  value: string;
};

export type Num = {
  location: number;
  value: number;
};

export type SessionInfo = {
  num: number;
  guess: string;
  distance: number;
  remainingTime: number;
};
