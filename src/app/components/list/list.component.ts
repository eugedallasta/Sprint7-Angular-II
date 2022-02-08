import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Presupuesto } from '../../budget.modelo';
import { BudgetService } from './../../budget.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private service: BudgetService) { }
  buscar = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]);
  presupuestos: Presupuesto[] = [];
  servicios: string[] = [];
  original: Presupuesto[] = [];
  alfabeto!: boolean;
  pordata!: boolean;
  origin!: boolean;

  ngOnInit(): void {
    this.original = this.service.presupuestos;
    this.presupuestos = this.original;

    this.alfabeto = false;
    this.pordata = false;
    this.origin = false;


    this.service.original$.subscribe(() => {

      if (this.origin) {
        this.incial();
      } else if (this.alfabeto) {
        this.alfabetico();
      } else if (this.pordata) {
        this.porData();
      }
    });
  }
  get busca() { return this.buscar.value };


  comparar(value: string) {

    let comparacion: Presupuesto[] = this.original;

    this.presupuestos = comparacion.filter(presup => presup.nombrePresupuesto === value);

  }

  //Orden INICIAL

  incial(): void {

    this.presupuestos = this.original;
    this.origin = true;
    this.pordata = false;
    this.alfabeto = false;

  }

  //Orden Alfabético

  alfabetico(): void {
    let alfabeticos: Presupuesto[] = this.original.map((elem) => {
      elem.nombre.toLowerCase;
      return elem;
    });

    function ordena(x: Presupuesto, y: Presupuesto) {

      return x.nombre.localeCompare(y.nombre);
    }
    this.presupuestos = alfabeticos.sort(ordena);
    this.alfabeto = true;
    this.pordata = false;
    this.origin = false;

  }

  //Ordenamos por fecha

  porData(): void {
    let porData: Presupuesto[] = this.original;
    function ordena(x: Presupuesto, y: Presupuesto) {
      return x.data.localeCompare(y.data, "en", { sensitivity: 'base' });
    }
    this.presupuestos = porData.sort(ordena);
    this.pordata = true;
    this.origin = false;
    this.alfabeto = false;

  }

}
