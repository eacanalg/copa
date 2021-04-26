import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PruebolsiyoDataSource} from '../datasources';
import {Sede, SedeRelations} from '../models';

export class SedeRepository extends DefaultCrudRepository<
  Sede,
  typeof Sede.prototype.id,
  SedeRelations
> {
  constructor(
    @inject('datasources.pruebolsiyo') dataSource: PruebolsiyoDataSource,
  ) {
    super(Sede, dataSource);
  }
}
