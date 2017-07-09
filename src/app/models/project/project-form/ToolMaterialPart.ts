import { Node } from '../../';

export interface ToolMaterialPart extends Node{
  
}

export class ToolMaterialPart extends Node implements ToolMaterialPart{
  constructor(ControlName:string){
    super();
    this.type = ControlName;
  }
}