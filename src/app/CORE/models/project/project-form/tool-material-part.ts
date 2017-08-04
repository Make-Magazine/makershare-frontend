import { Node } from 'app/CORE/models';

export interface IToolMaterialPart extends Node {
  type: string;
}

export class ToolMaterialPart extends Node implements IToolMaterialPart {
  constructor(ControlName: string) {
    super();
    this.type = ControlName;
  }
}
