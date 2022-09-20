import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import {Conversaciones} from '../models/conversaciones';
import {ConversacionesDTO} from '../models/conversacionesDTO';
import { environment } from 'environments/environment';

const httpOption  = {
  headers:new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiconversacionesService {

  private apiURL = environment.apiURL;

  url: string = this.apiURL + '/Conversaciones';
  private conversacionesLst : Conversaciones[]=[];
  private conversacionesSbj = new Subject<Conversaciones[]>();
  constructor(
    private _http : HttpClient
  ) { }

//   get(): Observable<any[]>{
//     console.log(this._http.get<any[]>(this.url))
//     return this._http.get<any[]>(this.url);
// }

get(_dest: string){
    if(_dest != "---")
    {
      this._http.get<any[]>(this.url + "?Destinatario=" + _dest)
      .subscribe((data) => {
        this.conversacionesLst = data;
        this.conversacionesSbj.next([...this.conversacionesLst]);
      });
    }
  }

  obtenerConversacionActual(){
    return this.conversacionesSbj.asObservable();
  }
  add(conv: ConversacionesDTO){
    //console.log(conv);
    const formData = this.construirFormData(conv);
   this._http.post<any>(this.url,formData).subscribe((data) => {
      //this.conversacionesLst = data;
      //this.conversacionesSbj.next();
      this.get(conv.Destinatario);
    });
  }
  private construirFormData(conver: ConversacionesDTO): FormData{
    const formData = new FormData();
    formData.append('Destinatario', conver.Destinatario);
    formData.append('Tipo', conver.Tipo);
    formData.append('Mensaje', conver.Mensaje);
    formData.append('RolId', conver.RolId.toString());
    formData.append('BandejaId', conver.BandejaId.toString());
    if(conver.Imagen)
      formData.append('Imagen', conver.Imagen);
    return formData;
  }
}
