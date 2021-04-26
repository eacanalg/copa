import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'pruebolsiyo', table: 'partido'}}
})
export class Partido extends Entity {
  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'arbitro', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  arbitro?: string;

  @property({
    type: 'date',
    required: true,
    mysql: {columnName: 'fecha', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  fecha: string;

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

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {columnName: 'idEquipoLocal', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
  })
  idEquipoLocal?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {columnName: 'idEquipoVisitante', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
  })
  idEquipoVisitante?: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'idFase', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  idFase: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'idSede', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  idSede: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'numeroPartido', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  numeroPartido: number;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'resultado', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  resultado?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Partido>) {
    super(data);
  }
}

export interface PartidoRelations {
  // describe navigational properties here
}

export type PartidoWithRelations = Partido & PartidoRelations;
