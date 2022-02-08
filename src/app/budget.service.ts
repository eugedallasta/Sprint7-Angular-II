import { Injectable, EventEmitter } from '@angular/core';
import { Presupuesto } from './budget.modelo';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  //-----OBSERVABLES
  paginas$ = new EventEmitter<string>();
  idiomas$ = new EventEmitter<string>();
  aumento1$ = new EventEmitter<number>();
  aumento2$ = new EventEmitter<number>();
  original$ = new EventEmitter<Presupuesto[]>();
  //-----VARIABLES
  total: number = 0;
  aumentar: number = 30;
  paginas: number = 1;
  idiomas: number = 1;

  constructor() { }

  //LISTA DE PRESUPUESTOS
  presupuestos: Presupuesto[] = [];

  //PRECIO TOTAL en funcion del nro. de páginas y de idiomas
  aumento = (pag: number, idiom: number) => {
    return pag * idiom * 30;
  };

  //TOTAL Web

  totalWeb = (aumentar: number, seo: boolean, campanya: boolean) => {
    let miSeo: number = 0;
    let miCampanya: number = 0;

    if (seo) miSeo = 300;
    if (campanya) miCampanya = 200;

    this.total = 500 + aumentar + miSeo + miCampanya;
    this.aumentar = aumentar;
    return this.total;
  }
  //Recibe parámetros del componente INPUT y manda la respuesta directamente al Home

  infoInput(nombre: string, valor: number): void {

    if (nombre === "paginas") {

      this.paginas = valor;

      this.aumentar = this.aumento(this.paginas, this.idiomas);
      this.aumento1$.emit(this.aumentar);

    } else if (nombre === "idiomas")
      this.idiomas = valor;

    this.aumentar = this.aumento(this.paginas, this.idiomas);
    this.aumento2$.emit(this.aumentar);
  }
  calculaTotal(nombre: string, select: boolean) {

    if (nombre === 'Página Web') {
      select ? (this.total += 530) : (this.total -= 530);
    } else if (nombre === 'Consultoria SEO') {
      select ? (this.total += 300) : (this.total -= 300);
    } else {
      select ? (this.total += 200) : (this.total -= 200);
    }

    return this.total;

  }
  // Nuevo Presupuesto
  nuevoPresupuesto(presupuesto: Presupuesto) {
    this.presupuestos.push(presupuesto);
    this.original$.emit(this.presupuestos);
  }
  pag() { return this.paginas; }
  idiom() { return this.idiomas; }

}
