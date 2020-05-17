import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Risk} from '../models';
import {RiskRepository} from '../repositories';

export class RisksController {
  constructor(
    @repository(RiskRepository)
    public riskRepository : RiskRepository,
  ) {}

  @post('/risks', {
    responses: {
      '200': {
        description: 'Risk model instance',
        content: {'application/json': {schema: getModelSchemaRef(Risk)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Risk, {
            title: 'NewRisk',
            exclude: ['id'],
          }),
        },
      },
    })
    risk: Omit<Risk, 'id'>,
  ): Promise<Risk> {
    return this.riskRepository.create(risk);
  }

  @get('//count', {
    responses: {
      '200': {
        description: 'Risk model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Risk) where?: Where<Risk>,
  ): Promise<Count> {
    return this.riskRepository.count(where);
  }

  @get('/risks', {
    responses: {
      '200': {
        description: 'Array of Risk model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Risk, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Risk) filter?: Filter<Risk>,
  ): Promise<Risk[]> {
    return this.riskRepository.find(filter);
  }

  @patch('/risks', {
    responses: {
      '200': {
        description: 'Risk PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Risk, {partial: true}),
        },
      },
    })
    risk: Risk,
    @param.where(Risk) where?: Where<Risk>,
  ): Promise<Count> {
    return this.riskRepository.updateAll(risk, where);
  }

  @get('//risks/{id}', {
    responses: {
      '200': {
        description: 'Risk model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Risk, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Risk, {exclude: 'where'}) filter?: FilterExcludingWhere<Risk>
  ): Promise<Risk> {
    return this.riskRepository.findById(id, filter);
  }

  @patch('//risks/{id}', {
    responses: {
      '204': {
        description: 'Risk PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Risk, {partial: true}),
        },
      },
    })
    risk: Risk,
  ): Promise<void> {
    await this.riskRepository.updateById(id, risk);
  }

  @put('//risks/{id}', {
    responses: {
      '204': {
        description: 'Risk PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() risk: Risk,
  ): Promise<void> {
    await this.riskRepository.replaceById(id, risk);
  }

  @del('//risks/{id}', {
    responses: {
      '204': {
        description: 'Risk DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.riskRepository.deleteById(id);
  }
}
