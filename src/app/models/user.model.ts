export class User {
    idUsuario: number;
    nombre: string;
    activo: boolean;
    fechaCreacion?: Date;
    autor: string;
    modificadoPor: string;
    fechaModificacion?: Date;
    usuario?: string;
    rol?: number;

    constructor() {
        this.idUsuario = 0;
        this.nombre = "";
        this.activo= false;
        this.fechaCreacion = null;
        this.autor = "";
        this.modificadoPor = "";
        this.fechaModificacion = null;
        this.usuario = "";
        this.rol = 0;
      }
}
