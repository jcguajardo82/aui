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
    templateUrl: './reporteSoporte.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
      trigger('detailExpand', [
        state('collapsed', style({ height: '0px', minHeight: '0' })),
        state('expanded', style({ height: '*' })),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
    ],
  })

export class reporteSoporteComponent
{
    isTableExpanded = false;

  STUDENTS_DATA = [
    {
        "Id_asistencia": 1,
        "NumPoliza": 100003,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-24T13:08:39.987",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 2,
        "NumPoliza": 100003,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-24T13:10:50.6",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 3,
        "NumPoliza": 100007,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-24T22:33:21.11",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 4,
        "NumPoliza": 100008,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-24T22:36:34.48",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 5,
        "NumPoliza": 100005,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-24T22:40:50.743",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 6,
        "NumPoliza": 100006,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-24T22:45:53.693",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 7,
        "NumPoliza": 100002,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-24T22:52:41.373",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 8,
        "NumPoliza": 100002,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-24T22:53:48.853",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 9,
        "NumPoliza": 100003,
        "tipo_descripcion": "LLANTAS",
        "asist_ubicacion": "19.169430207826718, -96.12427946401479",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-24T23:06:39.47",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-LOCATION"
    },
    {
        "Id_asistencia": 10,
        "NumPoliza": 100003,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-24T23:23:02.59",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 11,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-24T23:24:35.62",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 12,
        "NumPoliza": 100010,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-24T23:30:40.17",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 13,
        "NumPoliza": 100003,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-24T23:50:49.53",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 14,
        "NumPoliza": 100002,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-24T23:56:19.02",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 15,
        "NumPoliza": 100007,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T00:06:49.937",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 16,
        "NumPoliza": 100008,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T10:11:09.073",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 17,
        "NumPoliza": 100001,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T10:21:32.68",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 18,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T10:38:40.56",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 19,
        "NumPoliza": 100001,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T14:30:14.723",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 20,
        "NumPoliza": 100008,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T15:05:35.303",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 21,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T15:16:27.163",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 22,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T16:50:39.787",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 23,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T18:05:34.247",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 24,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T18:08:15.75",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 25,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T18:22:25.32",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 26,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T18:34:26.133",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 27,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T18:37:35.37",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 28,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T18:39:42.337",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 29,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T19:15:09.293",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 30,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T19:16:45.533",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 31,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T19:20:45.887",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 32,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T19:29:10.977",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 33,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T19:33:23.033",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 34,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T19:34:21.513",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 35,
        "NumPoliza": 100003,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T19:39:01.513",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 36,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T19:44:02.53",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 37,
        "NumPoliza": 100009,
        "tipo_descripcion": "LLANTAS",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T19:48:39",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-TIPO"
    },
    {
        "Id_asistencia": 38,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T19:50:30.627",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 39,
        "NumPoliza": 100009,
        "tipo_descripcion": "LLANTAS",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T20:08:13.56",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-TIPO"
    },
    {
        "Id_asistencia": 40,
        "NumPoliza": 100009,
        "tipo_descripcion": "LLANTAS",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-25T20:34:20.423",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-TIPO"
    },
    {
        "Id_asistencia": 41,
        "NumPoliza": 100003,
        "tipo_descripcion": "GASOLINA",
        "asist_ubicacion": "19.169430207826718, -96.12427946401479",
        "asist_comentario": "Requiero 15 litros de gasolina para poder llegar a mi destino, o la siguiente gasolinera en el camino que seguiremos.",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-26T13:05:26.57",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-COMENT"
    },
    {
        "Id_asistencia": 42,
        "NumPoliza": 100002,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-26T13:20:29.337",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-TIPO"
    },
    {
        "Id_asistencia": 43,
        "NumPoliza": 100003,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-26T13:40:56.29",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 44,
        "NumPoliza": 100009,
        "tipo_descripcion": "LLANTAS",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-26T17:30:20.64",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-TIPO"
    },
    {
        "Id_asistencia": 45,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-26T17:49:23.04",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-TIPO"
    },
    {
        "Id_asistencia": 46,
        "NumPoliza": 100009,
        "tipo_descripcion": "LLANTAS",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-26T18:15:00.687",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-TIPO"
    },
    {
        "Id_asistencia": 47,
        "NumPoliza": 100005,
        "tipo_descripcion": "LLANTAS",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-26T18:28:59.543",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-TIPO"
    },
    {
        "Id_asistencia": 48,
        "NumPoliza": 100008,
        "tipo_descripcion": "LLANTAS",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-26T18:48:47.01",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-TIPO"
    },
    {
        "Id_asistencia": 49,
        "NumPoliza": 100009,
        "tipo_descripcion": "LLANTAS",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-26T18:52:56.177",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-TIPO"
    },
    {
        "Id_asistencia": 50,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-26T19:02:03.36",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 51,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-26T19:54:09.967",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-TIPO"
    },
    {
        "Id_asistencia": 52,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-26T19:56:21.96",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 53,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-26T20:55:13.567",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 54,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-26T21:34:35.75",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 55,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-26T21:57:20.643",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 56,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-26T22:11:04.857",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 57,
        "NumPoliza": 100009,
        "tipo_descripcion": "GASOLINA",
        "asist_ubicacion": "2",
        "asist_comentario": "2",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-26T22:21:37.567",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-COMENT"
    },
    {
        "Id_asistencia": 58,
        "NumPoliza": 100009,
        "tipo_descripcion": "LLANTAS",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-26T22:32:28.773",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-TIPO"
    },
    {
        "Id_asistencia": 59,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-27T09:59:18.557",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 60,
        "NumPoliza": 100009,
        "tipo_descripcion": "LLANTAS",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "egijon",
        "FechaCreacion": "2022-10-27T12:41:28.63",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-TIPO"
    },
    {
        "Id_asistencia": 61,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "system",
        "FechaCreacion": "2022-10-27T17:58:34.467",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 62,
        "NumPoliza": 100009,
        "tipo_descripcion": "LLANTAS",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "system",
        "FechaCreacion": "2022-10-27T18:08:16.997",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-TIPO"
    },
    {
        "Id_asistencia": 63,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "system",
        "FechaCreacion": "2022-10-27T18:11:10.197",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 64,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "system",
        "FechaCreacion": "2022-10-27T19:17:06.1",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 65,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "system",
        "FechaCreacion": "2022-10-27T19:20:17.863",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 66,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "system",
        "FechaCreacion": "2022-10-27T19:23:22.993",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 67,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "system",
        "FechaCreacion": "2022-10-27T19:24:51.753",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "REGISTRADO"
    },
    {
        "Id_asistencia": 68,
        "NumPoliza": 100009,
        "tipo_descripcion": "LLANTAS",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "system",
        "FechaCreacion": "2022-10-27T19:28:54.833",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-TIPO"
    },
    {
        "Id_asistencia": 69,
        "NumPoliza": 100009,
        "tipo_descripcion": "LLANTAS",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "system",
        "FechaCreacion": "2022-10-27T19:31:34.97",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-TIPO"
    },
    {
        "Id_asistencia": 70,
        "NumPoliza": 100009,
        "tipo_descripcion": "LLANTAS",
        "asist_ubicacion": "",
        "asist_comentario": "19.148038864135742,-96.16252136230469",
        "CreadoPor": "system",
        "FechaCreacion": "2022-10-27T19:39:53.323",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-COMENT"
    },
    {
        "Id_asistencia": 71,
        "NumPoliza": 100009,
        "tipo_descripcion": "CERRAJERO",
        "asist_ubicacion": "",
        "asist_comentario": "19.148056030273438,-96.16252899169922",
        "CreadoPor": "system",
        "FechaCreacion": "2022-10-28T13:23:34.04",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-COMENT"
    },
    {
        "Id_asistencia": 72,
        "NumPoliza": 100009,
        "tipo_descripcion": "LLANTAS",
        "asist_ubicacion": "",
        "asist_comentario": "19.148054122924805,-96.16251373291016",
        "CreadoPor": "system",
        "FechaCreacion": "2022-10-28T13:35:17.213",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-COMENT"
    },
    {
        "Id_asistencia": 73,
        "NumPoliza": 100003,
        "tipo_descripcion": "CERRAJERO",
        "asist_ubicacion": "",
        "asist_comentario": "",
        "CreadoPor": "system",
        "FechaCreacion": "2022-11-03T09:02:22.553",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-TIPO"
    },
    {
        "Id_asistencia": 74,
        "NumPoliza": 100009,
        "tipo_descripcion": "LLANTAS",
        "asist_ubicacion": "19.14808464050293,-96.16255187988281",
        "asist_comentario": "19.14808464050293,-96.16255187988281",
        "CreadoPor": "system",
        "FechaCreacion": "2022-11-03T19:07:33.843",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-COMENT"
    },
    {
        "Id_asistencia": 75,
        "NumPoliza": 100009,
        "tipo_descripcion": "GRUA",
        "asist_ubicacion": "",
        "asist_comentario": "19.148061752319336,-96.16255187988281",
        "CreadoPor": "system",
        "FechaCreacion": "2022-11-04T15:19:14.907",
        "ActualizadoPor": null,
        "FechaActualizaion": null,
        "Estatus": "PRE-REPORTE-COMENT"
    }
];

  // , 'actions'
  dataStudentsList = new MatTableDataSource();
  displayedStudentsColumnsList: string[] = ['Id_asistencia','NumPoliza','tipo_descripcion','asist_ubicacion','asist_comentario','CreadoPor','FechaCreacion','ActualizadoPor','FechaActualizaion','Estatus'];
  

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
