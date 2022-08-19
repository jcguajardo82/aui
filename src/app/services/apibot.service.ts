import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import {BotOpciones} from '../models/botOpciones';
import { X } from '@angular/cdk/keycodes';
import { environment } from 'environments/environment';

const httpOption  = {
  headers:new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApibotService {

  private apiURL = environment.apiURL;

  url: string = this.apiURL + '/BotOpciones';
  private botOpcionesLst : BotOpciones[]=[
    // {
    //   id: 1,
    //   mensaje:'Hola esta es la bienvenida al Bot',
    //   idPadre:0,
    //   opcion:false,
    //   titulo:'Mensaje de Inicio'
    // },
    // {
    //   id: 2,
    //   mensaje:'Estos son lo Clientes con los Cuales hemos Trabajado: \n -Soriana \n -CEMEX \n-Tenaris',
    //   idPadre:1,
    //   opcion:true,
    //   titulo:'1.- Ver Clientes'
    // },
    // {
    //   id: 3,
    //   mensaje:'Somos el apoyo empresarial que nuestros clientes necesitan para dar el salto tecnológico tan necesario hoy en día. Lo logramos con pasión, porque nos gusta lo que hacemos, somos pro activos y mantenemos una constante comunicación contigo. Sabemos la responsabilidad que adquirimos y mediante un trabajo en equipo efectivo alcanzamos todas las expectativas.',
    //   idPadre:1,
    //   opcion:true,
    //   titulo:'2.- Ver Mision'
    // },
    // {
    //   id: 4,
    //   mensaje:'Nuestros Horarios son: \n De 9:00 hrs A 14:00 hrs',
    //   idPadre:1,
    //   opcion:true,
    //   titulo:'3.- Ver Horarios'
    // },
    // {
    //   id: 5,
    //   mensaje:'Soriana',
    //   idPadre:2,
    //   opcion:true,
    //   titulo:'1.- Opinion Soriana'
    // },
    // {
    //   id: 6,
    //   mensaje:'CEMEX',
    //   idPadre:2,
    //   opcion:true,
    //   titulo:'2.- Opinion CEMEX'
    // },
    // {
    //   id: 7,
    //   mensaje:'Tenaris',
    //   idPadre:2,
    //   opcion:true,
    //   titulo:'3.- Opinion Tenaris'
    // }
  ];
    private opcionesLst : BotOpciones[]=[];
    private opcionesSbj = new Subject<BotOpciones[]>();

    constructor(
      private _http : HttpClient
    ) { }

   get(_id: number){
    //return this.botOpcionesLst.filter(x => x.id === _id);
    return this._http.get<BotOpciones[]>(this.url + '/mensaje?id=' + _id);
  }

  getOpciones(_idPadre: number){
    //return this.botOpcionesLst.filter(x => x.idPadre === _idPadre);
    return this._http.get<BotOpciones[]>(this.url + '/opciones?idPadre=' + _idPadre)
    // .subscribe((data) => {
    //   this.opcionesLst = data;
    //   this.opcionesSbj.next([...this.opcionesLst]);
    // });
    ;
  }
  getOpcionesById(_id: number){
    return this._http.get<string[]>(this.url + '/opcionesById?id=' + _id);
  }
  obtenerOpcionesActual(){
    return this.opcionesSbj.asObservable();
  }

  add(bot: BotOpciones): Observable<any>{

    //var _item = this.botOpcionesLst.find(x => x.idPadre === bot.idPadre && x.titulo === bot.titulo && x.opcion === bot.opcion);
    //debugger;
    if(bot.id > 0){
      return this._http.put<any>(this.url ,bot, httpOption);
    }
    else
    {
      //this.botOpcionesLst.push(bot);
      return this._http.post<any>(this.url ,bot, httpOption);
      //this.getOpciones(bot.idPadre);
    }

  }
}
