import {getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {Risk, Query} from '../models';
import {repository} from '@loopback/repository';
import {RiskRepository} from '../repositories';

export class RiskAssessmentController {
  constructor(
    @repository(RiskRepository)
    public riskRepository : RiskRepository,
  ) {}

  @post('/assess', {
    responses: {
      '200': {
        description: 'Risk model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Risk, {includeRelations: true}),
          }
        },
      },
    },
  })
  assess(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Query, {
            title: 'queries',
            exclude: ['id'],
          }),
        },
      },
    })
    answers: Query[]
  ): Promise<Risk> {
    console.log(answers);
    const assesedRiskId = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    return this.riskRepository.findById(assesedRiskId);
  }

}
