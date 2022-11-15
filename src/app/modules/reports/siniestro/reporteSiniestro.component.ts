import { Component, ViewEncapsulation } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {PPSService} from  'app/services/pps.service';
import { Order } from 'app/models/pps.Order.model';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Orders } from 'app/models/pps.Pasarela.model';
import { paymentCheckOutModel } from 'app/models/pps.GenerateOrder.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
    }

// @Component({
//     //selector     : 'masterCotizacion',
//     selector: 'app-root',
//     templateUrl  : './masterCotizacion.component.html',
//     encapsulation: ViewEncapsulation.None,
//     styleUrls: ['./app.component.scss'],
//     animations: [
//       trigger('detailExpand', [
//         state('collapsed', style({ height: '0px', minHeight: '0' })),
//         state('expanded', style({ height: '*' })),
//         transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
//       ])
//     ]
// })


@Component({
    selector: 'reporteSiniestro',
    templateUrl: './reporteSiniestro.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
      trigger('detailExpand', [
        state('collapsed', style({ height: '0px', minHeight: '0' })),
        state('expanded', style({ height: '*' })),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
    ],
  })

export class reporteSiniestroComponent
{
    isTableExpanded = false;

  STUDENTS_DATA = [
    {
        "Id_siniestro": 1,
        "NumPoliza": 100009,
        "siniestro_heridos": 1,
        "siniestro_ambulancia": 2,
        "siniestro_ubicacion": "19.16574744961231, -96.11376337052329",
        "siniestro_conductor": "JORGE MANUEL ALVARADO PEREZ",
        "siniestro_autoEstatus": 2,
        "CreadoPor": "system",
        "FechaCreacion": "2022-10-21T06:02:13.3",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "SINIESTRO-AUTO"
    },
    {
        "Id_siniestro": 2,
        "NumPoliza": 100010,
        "siniestro_heridos": 2,
        "siniestro_ambulancia": 1,
        "siniestro_ubicacion": "19.16574744961231, -96.11376337052329",
        "siniestro_conductor": "MARIANO MERCADO SALOMON",
        "siniestro_autoEstatus": 1,
        "CreadoPor": "system",
        "FechaCreacion": "2022-10-21T01:06:55.56",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "SINIESTRO-AMBULANCIA"
    },
    {
        "Id_siniestro": 3,
        "NumPoliza": 100010,
        "siniestro_heridos": 2,
        "siniestro_ambulancia": 1,
        "siniestro_ubicacion": "19.16574744961231, -96.11376337052329",
        "siniestro_conductor": "ERASMO SALCEDO ROCA",
        "siniestro_autoEstatus": 1,
        "CreadoPor": "system",
        "FechaCreacion": "2022-11-03T11:08:56.51",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "SINIESTRO-AUTO"
    },
    {
        "Id_siniestro": 4,
        "NumPoliza": 100007,
        "siniestro_heridos": 2,
        "siniestro_ambulancia": 1,
        "siniestro_ubicacion": "1",
        "siniestro_conductor": "1",
        "siniestro_autoEstatus": 2,
        "CreadoPor": "system",
        "FechaCreacion": "2022-11-03T11:24:28.857",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "SINIESTRO-AUTO"
    },
    {
        "Id_siniestro": 5,
        "NumPoliza": 100008,
        "siniestro_heridos": 2,
        "siniestro_ambulancia": 2,
        "siniestro_ubicacion": "",
        "siniestro_conductor": "",
        "siniestro_autoEstatus": 1,
        "CreadoPor": "system",
        "FechaCreacion": "2022-11-03T11:43:48.46",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "SINIESTRO-AMBULANCIA"
    },
    {
        "Id_siniestro": 6,
        "NumPoliza": 100006,
        "siniestro_heridos": 2,
        "siniestro_ambulancia": 2,
        "siniestro_ubicacion": "19.2181836,-96.212832",
        "siniestro_conductor": "JULIO LOPEZ",
        "siniestro_autoEstatus": 2,
        "CreadoPor": "system",
        "FechaCreacion": "2022-11-03T12:08:54.713",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "SINIESTRO-AUTO"
    }
];

  // , 'actions'
  dataStudentsList = new MatTableDataSource();
  displayedStudentsColumnsList: string[] = ['Id_siniestro','NumPoliza','siniestro_heridos','siniestro_ambulancia','siniestro_ubicacion','siniestro_conductor','siniestro_autoEstatus','CreadoPor','FechaCreacion','ActualizadoPor','FechaActualizaion','Estatus'];


  

  ngOnInit() {
    this.dataStudentsList.data = this.STUDENTS_DATA;
  }

  // Toggel Rows
  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;

    this.dataStudentsList.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    })
  }


    
    

}


export class DialogContentExampleDialog {}
