export interface field_text{
  value?: string;
  format: string|null;
  safe_value?: string;
}

export class field_text implements field_text{
  constructor(Format:string|null){
    this.format = Format;
    this.value = "";
  }
}