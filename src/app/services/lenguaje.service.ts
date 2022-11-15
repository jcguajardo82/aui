import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LenguajeService {

  constructor(private http: HttpClient) { }

  getEtiquetas(lenguaje): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/api/GetLabels/${lenguaje}`) ;
  }

  getLenguajes(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/api/GetLenguajes`) ;
  }

  AddLenguaje(data): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/api/AddLenguaje`, JSON.stringify(data));
  } 

  UpdLenguaje(data): Observable<any> {
    return this.http.put<any>(`${environment.API_URL}/api/UpdLenguaje`, JSON.stringify(data));
  } 

  DelLenguaje(id): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/api/DelLenguaje/${id}`);
  } 

  GetLenguaje(id): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/api/GetLenguajesById/${id}`) ;
  }

  GetCategorias(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/api/GetCategorias`) ;
  }

  GetEtiquetasVal(data): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/api/EtiquetaValorByIdLenguaje`, JSON.stringify(data));
    
  }

  UpdEtiquetaVal(data): Observable<any> {
    return this.http.put<any>(`${environment.API_URL}/api/UpdEtiquetaVal`, JSON.stringify(data));
  } 
}
