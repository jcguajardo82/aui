import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import {LenguajeService} from 'app/services/lenguaje.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class TranslocoHttpLoader implements TranslocoLoader
{

    etiquetas: Observable<Translation>
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _lenguajeService:LenguajeService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get translation
     *
     * @param lang
     */
    getTranslation(lang: string): Observable<Translation>
    {


        return this._httpClient.get<Translation>(`${environment.API_URL}/api/GetLabels/${lang}`);

        /* this._lenguajeService.getEtiquetas(lang) .subscribe(
            data => {
             this.etiquetas = data.result;
      
             
                 return this.etiquetas;
            },
            error => {
              console.log(error);
             
                return this.etiquetas;
            }); */

        //return this._httpClient.get<Translation>(`./assets/i18n/${lang}.json`);
    }
}
