import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { ComboModel } from 'app/models/combo-model.model'
import { LenguajeService } from 'app/services/lenguaje.service';



class Etiqueta {
  idValue: number;
  valor: string;
  descripcion:string;
}

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',

})
export class LabelsComponent implements OnInit {
   categories : ComboModel[]=[];
   labels : Etiqueta[]=[] ;
   filters : ComboModel;
   
  constructor(private route: ActivatedRoute,
    private lenguajeService:LenguajeService
    ) { }

  ngOnInit(): void {

    // Add updated headerSchema to the map.
    //var id= this.route.snapshot.paramMap.get('id');    
    //console.log(id);

         // Get the data
         this.lenguajeService.GetCategorias()
         .pipe()
         .subscribe((data) => {
    
             // Store the data
             this.categories = data;
         });

         this.getLabels("all");   
  }


  /**
   * Filter by category
   *
   * @param change
   */
    filterByCategory(change: MatSelectChange): void
    {

      this.getLabels(change.value);   
    } 
    
    /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    } 

    onChangeEvent(event: any){
/*        console.log(event.target.value);
       console.log(event.target.id);
 */
      var data =new ComboModel;
      data.id=event.target.id;
      data.value=event.target.value;
       this.lenguajeService.UpdEtiquetaVal(data)
       .subscribe(
         response => {
           //console.log("agrego");
           //console.log(response);
           if (response.isSuccess) {
            console.log("OK")
           }
           else {
          console.log(response.message);
           }
         
         },
         error => {
           console.log(error.message);
         
         });
  
    }

    getLabels(modulo:any):void{
      this.filters = {
        id: this.route.snapshot.paramMap.get('id'),
         value: modulo      
      };

       
        // Get the data
        this.lenguajeService.GetEtiquetasVal(this.filters)
        .pipe()
        .subscribe((data) => {
   
            // Store the data
            this.labels = data;
            //console.log(this.labels);
        });
    }
}
