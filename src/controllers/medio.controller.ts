import {
  repository
} from '@loopback/repository';
import {
  get, param, response
} from '@loopback/rest';
import {
  EquipoRepository,
  FaseRepository, JugadorRepository, PartidoRepository,
  SedeRepository
} from '../repositories';

export class MedioController {
  constructor(
    @repository(SedeRepository)
    public sedeRepository: SedeRepository,
    @repository(EquipoRepository)
    public equipoRepository: EquipoRepository,
    @repository(FaseRepository)
    public faseRepository: FaseRepository,
    @repository(PartidoRepository)
    public partidoRepository: PartidoRepository,
    @repository(JugadorRepository)
    public jugadorRepository: JugadorRepository,
  ) { }

  @get('/info')
  @response(200, {
    description: 'Informacion general',
    content: {
      'application/json': {
      },
    }
  })
  async getInfo() {
    // se buscan los modelos necesarios
    const sedes = await this.sedeRepository.find()
    const fases = await this.faseRepository.find()
    const partidos = await this.partidoRepository.find()
    const equipos = await this.equipoRepository.find()
    return {
      // Alguna info se toma estatica
      edicion: 'Copa America 2021, edicion 47',
      fechas: '13 de junio al 10 de julio de 2021',
      organizadores: 'Colombia - Argentina ',
      // se retornan todas las sedes
      sedes: sedes,
      grupos: {
        // Se buscan los grupos relacionados a la fase de grupo A
        grupoA: partidos.filter((p) => p.idFase === fases.find(
          (f) => f.nombre === 'Grupo A')?.id
        ) // Se obtienen los equipos relacionados en cada partido
          .map((p) => [p.idEquipoLocal, p.idEquipoVisitante])
          // Se eliminan los elementos repetidos pues cada equipo aparece en 4 partidos
          .flat().filter((item, pos, self) => self.indexOf(item) === pos)
          // se obtiene el nombre  del equipo para retornar
          .map((id) => equipos.find((e) => e.id === id)?.nombre),

        grupoB: partidos.filter((p) => p.idFase === fases.find(
          (f) => f.nombre === 'Grupo B')?.id
        )
          .map((p) => [p.idEquipoLocal, p.idEquipoVisitante])
          .flat().filter((item, pos, self) => self.indexOf(item) === pos)
          .map((id) => equipos.find((e) => e.id === id)?.nombre)
      }
    }
  }

  @get('/jugadoresEquipo/{name}')
  @response(200, {
    description: 'Personal del equipo',
    content: {
      'application/json': {
      },
    }
  })
  async getTeamPlayers(
    @param.path.string('name') name: string,
  ) {
    // se busca el equipo por nombre
    const equipo = await this.equipoRepository.findOne({where: {nombre: name}})
    return {
      tecnico: equipo?.tecnico,
      // se retornan los campos requeridos para los jugadores relacionados
      jugadores: await this.jugadorRepository.find({
        where: {idEquipo: equipo?.id},
        fields: ['apellido', 'numeroCamiseta', 'posicion'],
      })
    }
  }
}
