import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PruebolsiyoDataSource} from '../datasources';
import {Partido, PartidoRelations} from '../models';

export class PartidoRepository extends DefaultCrudRepository<
  Partido,
  typeof Partido.prototype.id,
  PartidoRelations
> {
  constructor(
    @inject('datasources.pruebolsiyo') dataSource: PruebolsiyoDataSource,
  ) {
    super(Partido, dataSource);
  }
}
