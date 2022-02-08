export interface PresupuestoInterfaz {
    nombre: string;
    nombrePresupuesto: string;
    servicios: string[];
    precio: number;
    data: string;

}

export class Presupuesto implements PresupuestoInterfaz {

    fecha: Date;
    data: string;


    constructor(public nombre: string, public nombrePresupuesto: string,
        public servicios: string[], public precio: number) {
        this.fecha = new Date(Date.now());
        this.data = (this.fecha.getDate() < 10 ? ("0" + (this.fecha.getDate())) : this.fecha.getDate()) + "." +
            ((this.fecha.getMonth() + 1) < 10 ? ("0" + (this.fecha.getMonth() + 1)) : this.fecha.getMonth() + 1) + "." +
            this.fecha.getFullYear() + " - " +
            (this.fecha.getHours() < 10 ? ("0" + (this.fecha.getHours())) : this.fecha.getHours()) + ":" +
            (this.fecha.getMinutes() < 10 ? ("0" + (this.fecha.getMinutes())) : this.fecha.getMinutes()) + ":" +
            (this.fecha.getSeconds() < 10 ? ("0" + (this.fecha.getSeconds())) : this.fecha.getSeconds());

    }

}