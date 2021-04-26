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
import {Jugador} from '../models';
import {JugadorRepository} from '../repositories';

export class JugadorController {
  constructor(
    @repository(JugadorRepository)
    public jugadorRepository : JugadorRepository,
  ) {}

  @post('/jugadores')
  @response(200, {
    description: 'Jugador model instance',
    content: {'application/json': {schema: getModelSchemaRef(Jugador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jugador, {
            title: 'NewJugador',
            exclude: ['id'],
          }),
        },
      },
    })
    jugador: Omit<Jugador, 'id'>,
  ): Promise<Jugador> {
    return this.jugadorRepository.create(jugador);
  }

  @get('/jugadores/count')
  @response(200, {
    description: 'Jugador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Jugador) where?: Where<Jugador>,
  ): Promise<Count> {
    return this.jugadorRepository.count(where);
  }

  @get('/jugadores')
  @response(200, {
    description: 'Array of Jugador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Jugador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Jugador) filter?: Filter<Jugador>,
  ): Promise<Jugador[]> {
    return this.jugadorRepository.find(filter);
  }

  @patch('/jugadores')
  @response(200, {
    description: 'Jugador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jugador, {partial: true}),
        },
      },
    })
    jugador: Jugador,
    @param.where(Jugador) where?: Where<Jugador>,
  ): Promise<Count> {
    return this.jugadorRepository.updateAll(jugador, where);
  }

  @get('/jugadores/{id}')
  @response(200, {
    description: 'Jugador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Jugador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Jugador, {exclude: 'where'}) filter?: FilterExcludingWhere<Jugador>
  ): Promise<Jugador> {
    return this.jugadorRepository.findById(id, filter);
  }

  @patch('/jugadores/{id}')
  @response(204, {
    description: 'Jugador PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jugador, {partial: true}),
        },
      },
    })
    jugador: Jugador,
  ): Promise<void> {
    await this.jugadorRepository.updateById(id, jugador);
  }

  @put('/jugadores/{id}')
  @response(204, {
    description: 'Jugador PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() jugador: Jugador,
  ): Promise<void> {
    await this.jugadorRepository.replaceById(id, jugador);
  }

  @del('/jugadores/{id}')
  @response(204, {
    description: 'Jugador DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.jugadorRepository.deleteById(id);
  }
}
