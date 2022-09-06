export interface BotOpciones{
  id: number;
  mensaje: string;
  idPadre: number;
  opcion: boolean;
  titulo: string;
  conApi: boolean;
  urlApi?: string;
  jsonParametros?: string;
  metodoApi?: string;
  opcionesMsjApi?: string;
  opcionesApi?: string;
  tipoRetorno:string;
  rolId: number;
}
