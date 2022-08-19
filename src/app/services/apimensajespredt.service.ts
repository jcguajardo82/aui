import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import {MensajesPredt} from '../models/mensajesPredt';
import { environment } from 'environments/environment';

const httpOption  = {
  headers:new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApimensajespredtService {
  private apiURL = environment.apiURL;
  url: string = this.apiURL + '/MensajePredt';
  private mensajesLst : MensajesPredt[]=[];
  private mensajesSbj = new Subject<MensajesPredt[]>();

  constructor(
    private _http : HttpClient
  ) { }

  getAll(){
    return this._http.get<MensajesPredt[]>(this.url);
  }

  getById(_id: number){
    return this._http.get<MensajesPredt>(this.url + '/mensaje?id=' + _id);
  }

  update(_mensaje: MensajesPredt): Observable<any>{
    return this._http.put<any>(this.url, _mensaje, httpOption);
  }
}
