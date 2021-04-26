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
  response,
} from '@loopback/rest';
import {Fase} from '../models';
import {FaseRepository} from '../repositories';

export class FaseController {
  constructor(
    @repository(FaseRepository)
    public faseRepository : FaseRepository,
  ) {}

  @post('/fases')
  @response(200, {
    description: 'Fase model instance',
    content: {'application/json': {schema: getModelSchemaRef(Fase)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fase, {
            title: 'NewFase',
            exclude: ['id'],
          }),
        },
      },
    })
    fase: Omit<Fase, 'id'>,
  ): Promise<Fase> {
    return this.faseRepository.create(fase);
  }

  @get('/fases/count')
  @response(200, {
    description: 'Fase model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Fase) where?: Where<Fase>,
  ): Promise<Count> {
    return this.faseRepository.count(where);
  }

  @get('/fases')
  @response(200, {
    description: 'Array of Fase model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Fase, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Fase) filter?: Filter<Fase>,
  ): Promise<Fase[]> {
    return this.faseRepository.find(filter);
  }

  @patch('/fases')
  @response(200, {
    description: 'Fase PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fase, {partial: true}),
        },
      },
    })
    fase: Fase,
    @param.where(Fase) where?: Where<Fase>,
  ): Promise<Count> {
    return this.faseRepository.updateAll(fase, where);
  }

  @get('/fases/{id}')
  @response(200, {
    description: 'Fase model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Fase, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Fase, {exclude: 'where'}) filter?: FilterExcludingWhere<Fase>
  ): Promise<Fase> {
    return this.faseRepository.findById(id, filter);
  }

  @patch('/fases/{id}')
  @response(204, {
    description: 'Fase PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fase, {partial: true}),
        },
      },
    })
    fase: Fase,
  ): Promise<void> {
    await this.faseRepository.updateById(id, fase);
  }

  @put('/fases/{id}')
  @response(204, {
    description: 'Fase PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() fase: Fase,
  ): Promise<void> {
    await this.faseRepository.replaceById(id, fase);
  }

  @del('/fases/{id}')
  @response(204, {
    description: 'Fase DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.faseRepository.deleteById(id);
  }
}
