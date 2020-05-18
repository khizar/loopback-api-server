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
import {Query} from '../models';
import {QueryRepository} from '../repositories';

export class QuestionController {
  constructor(
    @repository(QueryRepository)
    public queryRepository : QueryRepository,
  ) {}

  @post('/questions', {
    responses: {
      '200': {
        description: 'Query model instance',
        content: {'application/json': {schema: getModelSchemaRef(Query)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Query, {
            title: 'NewQuery',
            exclude: ['id'],
          }),
        },
      },
    })
    query: Omit<Query, 'id'>,
  ): Promise<Query> {
    return this.queryRepository.create(query);
  }

  @get('/questions/count', {
    responses: {
      '200': {
        description: 'Query model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Query) where?: Where<Query>,
  ): Promise<Count> {
    return this.queryRepository.count(where);
  }

  @get('/questions', {
    responses: {
      '200': {
        description: 'Array of Query model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Query, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Query) filter?: Filter<Query>,
  ): Promise<Query[]> {
    return this.queryRepository.find(filter);
  }

  @patch('/questions', {
    responses: {
      '200': {
        description: 'Query PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Query, {partial: true}),
        },
      },
    })
    query: Query,
    @param.where(Query) where?: Where<Query>,
  ): Promise<Count> {
    return this.queryRepository.updateAll(query, where);
  }

  @get('/questions/{id}', {
    responses: {
      '200': {
        description: 'Query model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Query, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Query, {exclude: 'where'}) filter?: FilterExcludingWhere<Query>
  ): Promise<Query> {
    return this.queryRepository.findById(id, filter);
  }

  @patch('/questions/{id}', {
    responses: {
      '204': {
        description: 'Query PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Query, {partial: true}),
        },
      },
    })
    query: Query,
  ): Promise<void> {
    await this.queryRepository.updateById(id, query);
  }

  @put('/questions/{id}', {
    responses: {
      '204': {
        description: 'Query PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() query: Query,
  ): Promise<void> {
    await this.queryRepository.replaceById(id, query);
  }

  @del('/questions/{id}', {
    responses: {
      '204': {
        description: 'Query DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.queryRepository.deleteById(id);
  }
}
