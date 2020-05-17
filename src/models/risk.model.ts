import {Entity, model, property} from '@loopback/repository';

@model()
export class Risk extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  level?: string;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<Risk>) {
    super(data);
  }
}

export interface RiskRelations {
  // describe navigational properties here
}

export type RiskWithRelations = Risk & RiskRelations;
