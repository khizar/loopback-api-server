import {DefaultCrudRepository} from '@loopback/repository';
import {Risk, RiskRelations} from '../models';
import {RiskDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RiskRepository extends DefaultCrudRepository<
  Risk,
  typeof Risk.prototype.id,
  RiskRelations
> {
  constructor(
    @inject('datasources.risk') dataSource: RiskDataSource,
  ) {
    super(Risk, dataSource);
  }
}
