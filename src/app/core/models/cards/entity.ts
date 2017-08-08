export enum EntityGridSize {
  WIDE = <any>'wide',
  TALL = <any>'tall',
}

export enum EntityType {
  CHALLENGE = <any>'challenge',
  PROJECT = <any>'project',
  SHOWCASE = <any>'showcase',
  MAKER = <any>'maker',
  LEARNING_SEQUENCE = <any>'learning_sequence',
}

export interface ISimpleOverviewEntity {
  entity_id: string;
  entity_type: string;
  forcedNarrow: boolean;
  type: EntityType;
  size: EntityGridSize;
}

export class SimpleOverviewEntity implements ISimpleOverviewEntity {
  entity_id: string;
  entity_type: string;
  forcedNarrow: boolean = false;
  type: EntityType = null;
  size: EntityGridSize = null;
}
