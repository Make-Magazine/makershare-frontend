export abstract class DrupalCustomField  {
  abstract init(): DrupalCustomField|DrupalCustomField[];
  abstract updateValue(value: any): void;
}