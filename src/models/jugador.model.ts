import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'pruebolsiyo', table: 'jugador'}}
})
export class Jugador extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 1,
    mysql: {columnName: 'altura', dataType: 'decimal', dataLength: null, dataPrecision: 3, dataScale: 1, nullable: 'N'},
  })
  altura: number;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {columnName: 'apellido', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  apellido: string;

  @property({
    type: 'date',
    required: true,
    mysql: {columnName: 'fechaNacimiento', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  fechaNacimiento: string;

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
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'idEquipo', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  idEquipo: number;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {columnName: 'nombre', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  nombre: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'nombreCamiseta', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  nombreCamiseta?: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'nombreClub', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  nombreClub?: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {columnName: 'numeroCamiseta', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
  })
  numeroCamiseta?: number;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {columnName: 'numeroPasaporte', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  numeroPasaporte: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'paisClub', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  paisClub?: string;

  @property({
    type: 'number',
    required: true,
    precision: 4,
    scale: 1,
    mysql: {columnName: 'peso', dataType: 'decimal', dataLength: null, dataPrecision: 4, dataScale: 1, nullable: 'N'},
  })
  peso: number;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {columnName: 'posicion', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  posicion: string;

  @property({
    type: 'string',
    length: 45,
    mysql: {columnName: 'sobrenombre', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  sobrenombre?: string;

  @property({
    type: 'date',
    required: true,
    mysql: {columnName: 'vencimientoPasaporte', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  vencimientoPasaporte: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Jugador>) {
    super(data);
  }
}

export interface JugadorRelations {
  // describe navigational properties here
}

export type JugadorWithRelations = Jugador & JugadorRelations;
