import { Component, OnInit } from '@angular/core';
import {RolService} from  'app/services/rol.service';
import { MatDialog } from '@angular/material/dialog';
import { SetMenuRol } from 'app/models/set-menu-rol.model'
import {Rol} from 'app/models/rol.model'; 
import { RolModalComponent } from '../rol-modal/rol-modal.component';
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { NestedTreeControl } from "@angular/cdk/tree";


interface MenuNode {
  name: string;
  id?: number;
  children?: MenuNode[];
  selected?: boolean;
  indeterminate?: boolean;
  parent?: MenuNode;
}

;


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styles: [`
  .example-tree-invisible {
  display: none;
}

.example-tree ul,
.example-tree li {
  margin-top: 0;
  margin-bottom: 0;
  list-style-type: none;
}

.checklist-leaf-node {
  padding-left: 40px;
}


`],
})
export class RolesComponent implements OnInit {
 roles: Rol[];
 rol:Rol;
 selectedRolId : number;

 public treeControl = 
 new NestedTreeControl<MenuNode>(node => node.children);
  public dataSource = new MatTreeNestedDataSource<MenuNode>();

   TREE_DATA: MenuNode[]=[]

  constructor(
    private rolService:RolService,
    private _modal :MatDialog) {  }

  ngOnInit(): void {
    this.rolService.getAll() .subscribe(
      data => {
        if(data.isSuccess){
        this.roles = data.result;}
        else{
          console.log(data.message);
        }    
      },
      error => {
        console.log(error.message);
      });

  }

  addNew(): void
  {
    this.showModal(new Rol);
  }

  startEdit():void{
       
    if (this.selectedRolId != undefined) {
          this.rolService.getRol(this.selectedRolId).subscribe(
            data => {
              if (data.isSuccess) {
                data.result 
                this.showModal(data.result)         
              
              }
              else {
                console.log(data.message);
              }
      
            },
            error => {
              console.log(error.message);
              
            });
    } 
   
  }

  onChangeRol(id):void{
   this.selectedRolId=id;
   this.loadMenus(this.selectedRolId);
  }


  showModal(_rol:Rol):void{
    //this.user = new User;  
    this._modal.afterAllClosed.subscribe(data=> this.ngOnInit() );
    this._modal.open(RolModalComponent, {
        autoFocus: false,
        data     : {
            rol: _rol
        }
    });
  }

  public hasChild = (_: number, node: MenuNode) =>
  !!node.children && node.children.length > 0;

/*   private setParent(node: MenuNode, parent: MenuNode) {
    node.parent = parent;
    if (node.children) {
      node.children.forEach(childNode => {
        this.setParent(childNode, node);
      });
    }
  } */

  private checkAllParents(node: MenuNode) {
    if (node.parent) {
      const descendants = this.treeControl.getDescendants(node.parent);
      node.parent.selected = 
        descendants.every(child => child.selected);
      node.parent.indeterminate = 
        descendants.some(child => child.selected);
      this.checkAllParents(node.parent);
    }
  }

  private itemToggle(checked: boolean, node: MenuNode) {
    node.selected = checked;
    this.addMenuRol(node.selected,node.id);
    if (node.children) {
      node.children.forEach(child => {
        this.itemToggle(checked, child);
        this.addMenuRol(checked,child.id);
      });
    }
    this.checkAllParents(node);
  }



  loadMenus(id:number):void{
    this.rolService.getMenuRol(id) .subscribe(
      data => {
        if(data.isSuccess){
            this.TREE_DATA= data.result;
            this.dataSource.data = this.TREE_DATA;
           /*  Object.keys(this.dataSource.data).forEach(key => {
              this.setParent(this.dataSource.data[key], null);
            });  */
         }
        else{
          console.log(data.message);
        }
       /*  console.log(data.result);
        console.log(data.message); */
      },
      error => {
        console.log(error);
      
      });

  }

  addMenuRol(activo:boolean,idMenu:number){

    var menuRol =new SetMenuRol;
    menuRol.activo=activo;
    menuRol.idMenu=idMenu;
    menuRol.idRol = this.selectedRolId;
    this.rolService.setMenuRol(menuRol) .subscribe(
      data => {
        if(data.isSuccess){
          console.log(data.message)
          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Movimiento realizado con ??xito', life: 3000});
        }
        else{
          console.log(data.message)
          //this.messageService.add({severity:'error', summary: 'Error', detail: data.message, life: 3000});
        }
       /*  console.log(data.result);
        console.log(data.message); */
      },
      error => {
        console.log(error.message);
        
      });
    }
    
}
