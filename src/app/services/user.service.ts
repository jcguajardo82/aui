import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any[]>(`${environment.API_URL}/api/GetUsers`);
  }

  Add(data): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/api/AddUser`, JSON.stringify(data));
  }  

  Update(data): Observable<any> {
    return this.http.put(`${environment.API_URL}/api/UpdUser`, data);
  }
}
