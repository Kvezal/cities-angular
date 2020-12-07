export interface IRatingStar {
  value: number;
  filling: string;
}

export enum ERatingSize {
  NANO = `nano`,
  SMALL = `small`,
  MIDDLE = `middle`,
  LARGE = `large`,
}
