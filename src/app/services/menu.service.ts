import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  Add(data): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/api/AddMenu`, JSON.stringify(data));
    
  }  
  
  Update(data): Observable<any> {
    return this.http.put<any>(`${environment.API_URL}/api/UpdMenu`, JSON.stringify(data));
   
  }  
  
    getMenusRol(): Observable<any> {
      return this.http.get<any[]>(`${environment.API_URL}/api/UpdMenuGetMenusRol`); 
    }
  
    getMenu(idMenu): Observable<any> {
      return this.http.get<any>(`${environment.API_URL}/api/UpdMenuGetMenu/${idMenu}`) ;
    }
  
    getMenusPadre(): Observable<any> {
      return this.http.get<any[]>(`${environment.API_URL}/api/GetMenusPadre`);
      
    }
  
    
    getMenusHijos(padreId): Observable<any> {
      return this.http.get<any[]>(`${environment.API_URL}/api/GetMenusHijos/${padreId}`);
    
    }
  
    delMenuSub(menuId): Observable<any> {
      return this.http.delete<any>(`${environment.API_URL}/api/DelMenuSub/${menuId}`);
    }
  
    delMenu(menuId): Observable<any> {
      return this.http.delete<any>(`${environment.API_URL}/api/DelMenu/${menuId}`);
    }
}
