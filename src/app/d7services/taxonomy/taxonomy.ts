export class Taxonomy {
  name: string;
  vid: number;
  description: string;
  format: string;
  weight: number;

  constructor() {
    this.weight = 0;
    this.format = 'filtered_html';
  }
}
