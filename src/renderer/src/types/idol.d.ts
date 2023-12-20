interface idol {
  name: string;
  id: string;
  hash: string;
  produceIdols: Record<string, any>[];
  supportIdols: Record<string, any>[];
  voices: Record<string, string | number | boolean>[];
  idolCostumes: Record<string, string | number | boolean>[];
}
