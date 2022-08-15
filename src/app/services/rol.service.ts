import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any[]>(`${environment.API_URL}/api/GetRoles/true`);
   
  }

  getRol(idRol): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/api/GetRol/${idRol}`) 
   
  }

  getMenuRol(idRol): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/api/GetMenuRol/${idRol}`); 
   
  }

  setMenuRol(data): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/api/SetMenuRol`, JSON.stringify(data));
    
  }  

  addRol(data): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/api/AddRol`, JSON.stringify(data));
    
  } 

  updRol(data): Observable<any> {
    return this.http.put<any>(`${environment.API_URL}/api/UpdRol`, JSON.stringify(data));
    
  } 
}
