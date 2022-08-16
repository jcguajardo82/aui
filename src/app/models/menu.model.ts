export class Menu {
    menuId :number;
    descripcion :string;
    descripcionCorta :string;
    padreId :number;
    posicion :number;
    icono :string;
    habilitado :boolean;
    url :string;
    esMenu :boolean;
    target :string;
    controller :string;
    action :string;

    constructor ()
    {
        this.menuId =0;
        this.descripcion ="";
        this.descripcionCorta ="";
        this.padreId =0;
        this.posicion =0;
        this.icono ="";
        this.habilitado =true;
        this.url ="";
        this.esMenu =false;
        this.target ="";
        this.controller ="";
        this.action ="";
    }
}
