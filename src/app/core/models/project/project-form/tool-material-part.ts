import { NodeEntity } from '../../';

export class ToolMaterialPart extends NodeEntity{
  constructor(ControlName: string) {
    super();
    this.type = ControlName;
  }
  updateField() {
    
  }
}
