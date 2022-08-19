import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import {Bandeja} from '../models/bandeja';
import { environment } from 'environments/environment';

const httpOption  = {
  headers:new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ApibandejaService {

  private apiURL = environment.apiURL;

  url: string = this.apiURL + '/Bandeja';
  private bandejaLst : Bandeja[]=[];
  private bandejaSbj = new Subject<Bandeja[]>();
  constructor(
    private _http : HttpClient
  ) { }

  get(){

      this._http.get<any[]>(this.url + '?EmpresaId=1')
      .subscribe((data) => {
        this.bandejaLst = data;
        this.bandejaSbj.next([...this.bandejaLst]);
      });
  }

  obtenerBandejaActual(){
    return this.bandejaSbj.asObservable();
  }
  cerrar(bandeja: Bandeja): Observable<any>{
      return this._http.post<any>(this.url ,bandeja, httpOption);

  }
  // edit(Destinatario: string) {
  //   this._http.put<any>(this.url + '?Destinatario=' + Destinatario, null).subscribe((data) => {

  //     this.get();
  //   });
  // }

}
