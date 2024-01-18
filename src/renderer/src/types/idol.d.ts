interface idol {
  name: string;
  nameKana: string;
  id: string;
  hash: string;
  age: string;
  bloodType: string;
  birthDay: string;
  starSign: string;
  height: number;
  weight: number;
  bust: number;
  waist: number;
  hip: number;
  arm: string;
  place: string;
  hobby: string;
  specialty: string;
  characterVoice: string;
  produceIdols: Record<string, any>[];
  supportIdols: Record<string, any>[];
  voices: Record<string, string | number | boolean>[];
  idolCostumes: Record<string, string | number | boolean>[];
  unit: Record<string, any>;
}
