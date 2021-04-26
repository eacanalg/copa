import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PruebolsiyoDataSource} from '../datasources';
import {Equipo, EquipoRelations} from '../models';

export class EquipoRepository extends DefaultCrudRepository<
  Equipo,
  typeof Equipo.prototype.id,
  EquipoRelations
> {
  constructor(
    @inject('datasources.pruebolsiyo') dataSource: PruebolsiyoDataSource,
  ) {
    super(Equipo, dataSource);
  }
}
