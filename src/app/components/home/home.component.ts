import { BudgetService } from './../../budget.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Presupuesto } from '../../budget.modelo';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /* TOTAL */

  total!: number;

  /* Parámetros para la URL */

  panell!: boolean;
  seo!: boolean;
  campanya!: boolean;
  paginas: number = 1;
  idiomas!: string;
  origin!: ActivatedRoute;

  formulario!: FormGroup;
  presupuestos: Presupuesto[] = [];


  constructor(private service: BudgetService,
    public modal: NgbModal,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      myChoices: new FormArray([], Validators.required),
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      nombrePresupuesto: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
    })

    this.total = 0;
    this.seo = false;
    this.campanya = false;

    //aumento en funcion de las PAGINAS
    this.service.aumento1$.subscribe(aumento => {
      this.paginas = aumento;
      this.total = this.service.totalWeb(aumento, this.seo, this.campanya);
    });

    //aumento en funcion de los idiomas
    this.service.aumento2$.subscribe(aumento => {
      this.total = this.service.totalWeb(aumento, this.seo, this.campanya);
    });
  }
  //Getters para las Validaciones
  get nombre() { return this.formulario.get('nombre'); };
  get nombrePresupuesto() { return this.formulario.get('nombrePresupuesto'); };

  /* Array de checkboxes, envío al servicio los datos */
  onCheckChange(event: any) {
    const formArray: FormArray = this.formulario.get('myChoices') as FormArray;
    let selecionado: boolean;
    if (event.target.checked) {
      // Añadimos nuevo FormControl al FormArray (MyChoices)
      formArray.push(new FormControl(event.target.value));
      selecionado = true;
      //abrir panel web
      if (event.target.value === 'Página Web') {
        this.panell = true;

      }
      //Para pasar parámetro al total de la suma WEB
      if (event.target.value === 'Consultoria SEO') {
        this.seo = true;
      }
      if (event.target.value === 'Campaña de Google Ads') {
        this.campanya = true;
      }
    } else {
      // Detectar los elementos deseleccionados
      let i: number = 0;
      selecionado = false
      //Cerrar el panel de la WEB
      if (event.target.value === 'Página Web') {
        this.panell = false;

      }
      //Para pasar parámetro al total de la suma WEB
      if (event.target.value === 'Consultoria SEO') {
        this.seo = false;
      }
      if (event.target.value === 'Campaña de Google Ads') {
        this.campanya = false;
      }
      formArray.controls.forEach(ctrl => {
        if (ctrl.value == event.target.value) {
          // Quitar seleccion del Array
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
    this.total = this.service.calculaTotal(event.target.value, selecionado);

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          paginaWeb: this.panell, campaniaSeo: this.seo, campaniaAds: this.campanya
        },
        queryParamsHandling: "merge"
      });
  }
  /*   Mandamos Datos al Servicio para crear presupuesto y añadirlo al array
 */
  addPost(formulario: Presupuesto) {
    let nuevo: Presupuesto = new Presupuesto(formulario.nombre, formulario.nombrePresupuesto, this.formulario.get('myChoices')?.value, this.total);
    this.service.nuevoPresupuesto(nuevo);
    this.presupuestos = this.service.presupuestos;
  }
  clear() {
    this.panell = false;
  }
}
