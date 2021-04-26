import {
  repository
} from '@loopback/repository';
import {
  get, getModelSchemaRef, param, patch, requestBody, response
} from '@loopback/rest';
import {Partido} from '../models';
import {
  EquipoRepository,
  FaseRepository, JugadorRepository, PartidoRepository,
  SedeRepository
} from '../repositories';

type Result = {
  resultado: string;
}

export class AltoController {
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

  @get('/partidoInfo/{num}')
  @response(200, {
    description: 'Informacion del partido',
    content: {
      'application/json': {
      },
    }
  })
  async getInfo(
    @param.path.string('num') num: string,
  ) {
    // partido solicitado
    const partido = await this.partidoRepository.findOne(
      {where: {numeroPartido: num}}
    )
    // relaciones del partido
    const sede = await this.sedeRepository.findById(Number(partido?.idSede))
    const fase = await this.faseRepository.findById(Number(partido?.idFase))
    const equipoLocal = await this.equipoRepository.findById(
      Number(partido?.idEquipoLocal), {fields: ['nombre']}
    )
    const equipoVisitante = await this.equipoRepository.findById(
      Number(partido?.idEquipoVisitante), {fields: ['nombre']}
    )
    // usado para dar formato a la hora. Se usa para corregir zona horaria
    const dtString = new Date(String(partido?.fecha))
    dtString.setHours(dtString.getHours() + 5);
    // objeto de respuesta
    return {
      fecha: new Date(String(partido?.fecha)).toDateString(),
      hora: dtString.toTimeString(),
      ciudad: sede.ciudad,
      estadio: sede.estadio,
      fase: fase.nombre,
      equipoLocal: equipoLocal.nombre,
      equipoVisitante: equipoVisitante.nombre,
      arbitro: partido?.arbitro
    }
  }

  @patch('/resultado/{id}')
  @response(204, {
    description: 'result PATCH success',
  })
  async resultado(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partido, {partial: true}),
        },
      },
    })
    partido: Result,
  ) {
    // se modifica el partido
    await this.partidoRepository.updateById(id, partido);
    // Se busca el modelo completo para tener los equipos relacionados
    const complete = await this.partidoRepository.findById(id);
    // se segmenta el resultado. se espera un string de la forma 'x-x' (ej: 1-1)
    const goles = partido.resultado?.split('-');
    // se verifica formato y si es partido de grupos
    if (
      goles?.length === 2
      && complete.numeroPartido <= 20
    ) {
      // si gana local
      if (
        goles[0] > goles[1]
      ) {
        const local = await this.equipoRepository.findById(
          Number(complete.idEquipoLocal)
        )
        const visitante = await this.equipoRepository.findById(
          Number(complete.idEquipoVisitante)
        )
        await this.equipoRepository.updateById(
          Number(complete.idEquipoLocal),
          {
            puntos: Number(local.puntos) + 3,
            golesFavor: Number(local.golesFavor + goles[0]),
            golesContra: Number(local.golesContra + goles[1])
          }
        )
        await this.equipoRepository.updateById(
          Number(complete.idEquipoVisitante),
          {
            golesFavor: Number(visitante.golesFavor + goles[1]),
            golesContra: Number(visitante.golesContra + goles[0])
          }
        )
      }
      // si gana visitante
      if (
        goles[0] < goles[1]
      ) {
        const visitante = await this.equipoRepository.findById(
          Number(complete.idEquipoVisitante)
        )
        const local = await this.equipoRepository.findById(
          Number(complete.idEquipoLocal)
        )
        await this.equipoRepository.updateById(
          Number(complete.idEquipoVisitante),
          {
            puntos: Number(visitante.puntos) + 3,
            golesFavor: Number(visitante.golesFavor + goles[1]),
            golesContra: Number(visitante.golesContra + goles[0])
          }
        )
        await this.equipoRepository.updateById(
          Number(complete.idEquipoLocal),
          {
            golesFavor: Number(local.golesFavor + goles[0]),
            golesContra: Number(local.golesContra + goles[1])
          }
        )
      }
      // si hay empate
      if (
        goles[0] === goles[1]
      ) {
        const visitante = await this.equipoRepository.findById(
          Number(complete.idEquipoVisitante)
        )
        const local = await this.equipoRepository.findById(
          Number(complete.idEquipoLocal)
        )
        await this.equipoRepository.updateById(
          Number(complete.idEquipoVisitante),
          {
            puntos: Number(visitante.puntos) + 1,
            golesFavor: Number(visitante.golesFavor + goles[1]),
            golesContra: Number(visitante.golesContra + goles[0])
          }
        )
        await this.equipoRepository.updateById(
          Number(complete.idEquipoLocal),
          {
            puntos: Number(local.puntos) + 1,
            golesFavor: Number(local.golesFavor + goles[0]),
            golesContra: Number(local.golesContra + goles[1])
          }
        )
      }
    }
  }

}
