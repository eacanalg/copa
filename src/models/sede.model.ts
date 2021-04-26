import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'pruebolsiyo', table: 'sede'}}})
export class Sede extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {columnName: 'ciudad', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {columnName: 'estadio', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  estadio: string;

  @property({
    type: 'number',
    required: false,
    generated: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  id: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Sede>) {
    super(data);
  }
}

export interface SedeRelations {
  // describe navigational properties here
}

export type SedeWithRelations = Sede & SedeRelations;
