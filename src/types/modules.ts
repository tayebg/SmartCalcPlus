// TypeScript interfaces for modules
export interface Module {
  code: string;
  name: string;
  coeff: number;
  credit: number;
  has_td: boolean;
  has_tp: boolean;
  has_cc: boolean;
  has_exam: boolean;
}

export interface Unit {
  ue: string;
  type: string;
  credit: number;
  coeff: number;
  modules: Module[];
}