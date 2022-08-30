import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, Inject, ChangeDetectorRef, AfterContentChecked, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { BotOpciones } from 'app/models/botOpciones';
import { ApibotService } from 'app/services/apibot.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl } from '@angular/forms';
import { ParamsInput } from 'app/models/paramsInput';
import { MatChipInputEvent } from '@angular/material/chips';
import {MatTable} from '@angular/material/table';
import { MensajesPredtComponent } from 'app/modules/admin/configuration/bot-options/mensajes-predt/mensajes-predt.component'

@Component({
  selector: 'app-bot-options',
  templateUrl: './bot-options.component.html',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BotOptionsComponent implements OnInit, AfterContentChecked {
    addOnBlur = true;
    mostrar = false;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    public opcionesLST: BotOpciones[]=[];
    _id= 1;
    _idPadre=0;
    tituloOpcion='';
    mensaje='';
    addOpc= false;
    urlApi='';
    api= false;
    public columnas: string[]= ['nombre', 'valor', 'tipo', 'valorDefault','accion'];
    public metodosLST: string[]= ['GET', 'POST'];
    public retornoLST: string[]= ['TEXTO', 'PDF','UBICACION'];
    public tipoLST: string[]= ['json', 'url'];
    public opcionesMsjLST: string[]= [];
    public opcionesApiLST: string[]= [];
    selectMetodo= "GET";
    selectRetorno= "TEXTO";
    public opcsLST: string[]= [];
    public paramsLST: ParamsInput[]=[
      // {
      //   nombre:"parameter 1",
      //   valor:"Opcion 2",
      //   tipo:"json",
      //   valorDefault:''
      // }
    ];
    isEditable = true;
    canSave = true;
    @ViewChild(MatTable) table!: MatTable<ParamsInput>;

    valid1 = new FormControl('');
    valid2 = new FormControl('');
    constructor(
      private _api : ApibotService,
      private fb: FormBuilder,
      private _dialog: MatDialog,
      public _dialogRef: MatDialogRef<any>,
      private cd: ChangeDetectorRef,
      @Inject(MAT_DIALOG_DATA) public param: any
    ) {
            if (this.param.id !== undefined)
            {
                if(this.param.addOpc !== undefined)
                    {
                    // alert(this.param.id);
                        this._idPadre= this.param.id;
                        this._id = 0;
                        this.addOpc= true;
                    }
                    else{
                    this._id = this.param.id;

                    }
                    this.mostrar = true;
                    //this.start();
            }
            this.setState(this.valid1,true);
            this.setState(this.valid2,true);
    }
    async ngOnInit() {
        await this.start();
    }
    ngAfterContentChecked() {
        this.cd.detectChanges();
    }

    onKeyup(event: any){
        this.validateStepUrl(event.target.value);
    }

    validateStepUrl(value : string){
        //alert(value);
        if (value != '' && this.checkUrl(value))
            this.setState(this.valid1,false);
        else
            this.setState(this.valid1,true);
    }

    onKeyupParam(event: any){
        this.validateStepParam(event.target.value);
    }

    validateStepParam(value : string){
        //alert(value);
        if (value != '' && value != 'Nuevo Parametro')
            this.setState(this.valid2,false);
        else
            this.setState(this.valid2,true);
    }

    setState(control: FormControl, state: boolean) {
        if (state) {
          control.setErrors({ "required": true })
        } else {
          control.reset()
        }
      }

      checkUrl(value: string){
        var result = false;
        var patt = new RegExp(/((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi);
        var res = patt.test(value);
        if(res){
            result = true;
        }
        //alert(res);

        return result;
    }

    async start(){

       await this.getOpciones();

       this.getOpcion();
       this.getOpcionesById();
    }
    getOpcion(){
      if (this._id > 0)
      {
          this._api.get(this._id).subscribe(res => {
              this.mensaje = res[0].mensaje;
              this.tituloOpcion = res[0].titulo;
              this._idPadre = res[0].idPadre;
              this.api = res[0].conApi;
              this.selectRetorno = res[0].tipoRetorno == null ? 'TEXTO' : res[0].tipoRetorno;
              if(this.api)
              {
                  if(res[0].urlApi != null){
                      this.urlApi = res[0].urlApi;
                      this.validateStepUrl(this.urlApi);
                  }
                  if(res[0].metodoApi != null)
                      this.selectMetodo = res[0].metodoApi;
                  if(res[0].opcionesMsjApi != null)
                  {
                    var opcionesMsj = res[0].opcionesMsjApi.split(',');
                    if(opcionesMsj.length > 0)
                    {
                      opcionesMsj.forEach((o: string) => {
                          this.opcionesMsjLST.push(o);
                      });
                    }

                  }
                  if(res[0].opcionesApi != null)
                  {
                    var opciones = res[0].opcionesApi.split(',');
                    if(opciones.length > 0)
                    {
                      opciones.forEach((o: string) => {
                          this.opcionesApiLST.push(o);
                      });
                    }

                  }
                  if(res[0].jsonParametros != null && this.isJsonString(res[0].jsonParametros))
                  {
                    var jsonArray = JSON.parse(res[0].jsonParametros);
                    jsonArray.forEach((o: ParamsInput) => {
                          // let obj = {};
                          // obj.labelId = o.labelId;
                          // obj.insert = o.insert;
                          // obj.all = o.all;
                          // obj.sds = o.sds;
                          this.paramsLST.push(o);
                        });
                  }
              }
            });
      }
    }
    isJsonString(str: string) {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
  }
  async getOpciones(){
      if(this._id > 0)
      {
        await this._api.getOpciones(this._id).subscribe(res =>{
          this.opcionesLST= [...res];
        });
      }else{
       await this._api.getOpciones(this._idPadre).toPromise()
                .then((res: any) =>{
                  console.log('res', res);
                    if(res.length > 0)
                    {
                      this._id = res[0].id;
                      this.getOpciones();
                    }
                  });
                        // .subscribe(res =>{
                        //           console.log('res', res);
                        //             if(res.length > 0)
                        //             {
                        //               this._id = res[0].id;
                        //               this.opcionesLST= [...res];
                        //             }
                        //           });
      }
    }
    getOpcionesById(){
      if(this._id > 0)
      {
        this._api.getOpcionesById(this._id).subscribe(res =>{
          res.forEach((o: string) => {

          this.opcsLST.push(o);
          });
        });
      }else{
          this._api.getOpcionesById(this._idPadre).subscribe(res =>{
            res.forEach((o: string) => {

              this.opcsLST.push(o);
              });
        });
      }
      console.log('combo', this.opcsLST);
    }
    add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();

      if (value) {
        var _length = this.opcionesLST.length + 1;
        this._api.add({
          id: 0,
          mensaje:'',
          idPadre:this._id,
          opcion:true,
          titulo: _length + ".- " + value,
          conApi: false,
          tipoRetorno: this.selectRetorno
        }).subscribe(res =>{
          if (res !== undefined){
          this.getOpciones();
          }
        });

        //this._api.getOpciones(this._id);
      }

      // Clear the input value
      event.chipInput!.clear();
    }

    remove(opcion: BotOpciones): void {
      // const index = this.fruits.indexOf(fruit);

      // if (index >= 0) {
      //   this.fruits.splice(index, 1);
      // }
    }
    edit(opcion: BotOpciones){
      //alert(opcion.mensaje);
      const dialogRef = this._dialog.open(BotOptionsComponent,{
        width:"1000px", data:{id:opcion.id}
      });
      dialogRef.afterClosed().subscribe(res =>{
        this.getOpciones();
      })
    }
    addOpciones(){
      //alert(opcion.mensaje);
      const dialogRef = this._dialog.open(BotOptionsComponent,{
        width:"1000px", data:{id:this._id, addOpc:true}
      });
      dialogRef.afterClosed().subscribe(res =>{
        //this.getOpciones();
      })
    }
    addOpcMsj(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();

      if (value) {
        this.opcionesMsjLST.push(value);
      }// Clear the input value
      event.chipInput!.clear();
    }

    removeOpcMsj(opcion: string): void {
      const index = this.opcionesMsjLST.indexOf(opcion);

      if (index >= 0) {
        this.opcionesMsjLST.splice(index, 1);
      }
    }
    addOpcApi(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();

      if (value) {
        this.opcionesApiLST.push(value);
      }// Clear the input value
      event.chipInput!.clear();
    }

    removeOpcApi(opcion: string): void {
      const index = this.opcionesApiLST.indexOf(opcion);
       if (index >= 0) {
        this.opcionesApiLST.splice(index, 1);
      }
    }
    addParam(){
      this.paramsLST.push(
        {
          nombre:"Nuevo Parametro",
          valor:"",
          tipo:"json",
          valorDefault:''
        }
      );
      this.table.renderRows();
      this.setState(this.valid2,true);
    }
    deleteParam(param: ParamsInput){
      const index = this.paramsLST.indexOf(param);
       if (index >= 0) {
        this.paramsLST.splice(index, 1);
      }
      this.table.renderRows();
    }
    msg(){
      //alert(opcion.mensaje);
      const dialogRefM = this._dialog.open(MensajesPredtComponent,{
        width:"700px"
      });
      dialogRefM.afterClosed().subscribe(res =>{
        //this.getOpciones();
      })
    }

    close(){
      this._dialogRef.close();
    }
    saveAll(){
      var _opcion = false;

      if(this.mostrar)
        _opcion = true;

        this._api.add({
        id: this._id,
        mensaje:this.mensaje,
        idPadre:this._idPadre,
        opcion:_opcion,
        titulo:this.tituloOpcion,
        conApi:this.api,
        urlApi:this.urlApi,
        jsonParametros: JSON.stringify(this.paramsLST),
        metodoApi:this.selectMetodo,
        opcionesMsjApi: this.opcionesMsjLST.join(),
        opcionesApi: this.opcionesApiLST.join(),
        tipoRetorno: this.selectRetorno
      }).subscribe(res =>{
        if (res !== undefined){
            if(this.mostrar)
            {
              this.close();
            }
            else{
              this.getOpciones();
            }
        }
      });

    }
    conApi(){
        this.api = true;
        this.canSave = false;
    }
    sinApi(){
        this.api = false;
        this.canSave = true;
    }
    validarApi(){
        this.saveAll();
        this.canSave = true;
    }
}
