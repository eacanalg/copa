import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PruebolsiyoDataSource} from '../datasources';
import {Fase, FaseRelations} from '../models';

export class FaseRepository extends DefaultCrudRepository<
  Fase,
  typeof Fase.prototype.id,
  FaseRelations
> {
  constructor(
    @inject('datasources.pruebolsiyo') dataSource: PruebolsiyoDataSource,
  ) {
    super(Fase, dataSource);
  }
}
