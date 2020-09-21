import { Component, OnInit } from '@angular/core';
import { Revista } from './../../Models/revista';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-revistas-prestamo',
  templateUrl: './revistas-prestamo.component.html',
  styleUrls: ['./revistas-prestamo.component.css']
})
export class RevistasPrestamoComponent implements OnInit {

  revistas: Revista[];
  revistaP: Revista;
  revistaC: Revista;
  mensaje: string
  palabras: [];
  temas: [];
  cantRevistas: number;
  formulario = new FormGroup({
    formBusqueda: new FormControl(''),
  });
  constructor(private authService: AuthService, private router: Router, private modalService: NgbModal, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.authService.getRevista()
      .subscribe(
        res => {
          this.revistas = res.revistas;
          this.cantRevistas = this.revistas.length;
          console.log(res.revistas)
        },
        err => console.log(err)
      )
      this.initForms();
  }

  initForms(){
    this.formulario.valueChanges.subscribe(
      valor => {
        console.log(valor.formBusqueda)
        if(valor == "" || valor.formBusqueda.length == 0){
          this.authService.getRevista()
      .subscribe(
        res => {
          this.revistas = res.revistas;
          this.cantRevistas = this.revistas.length;
          console.log(res.revistas)
        },
        err => console.log(err)
      )
        }
      }
    );
  }

  Logout(){
    this.authService.logout();
    this.router.navigate(['/auth/home'])
  }

  ver(id:string, modal){
    this.authService.getRevistaById(id).subscribe(
      res => {
        this.revistaP = res.revistas;
        this.authService.PalabrasRevista(this.revistaP._id)
        .subscribe(
          res => {
            this.palabras = res.palabras;
            console.log(res.palabras)
            console.log(res)
            this.authService.TemasRevista(this.revistaP._id)
            .subscribe(
              res => {
                this.temas = res.temas;
                console.log(res.temas)
                console.log(res)
                this.modalService.open(modal, {size: 'lg', scrollable: true})
              },
              err => console.log(err)
            )
          },
          err => console.log(err)
        )
      },
      err => {
        console.log(err)
      }
    )
  }

  verPrestamo(id:string, modal){
    this.authService.getRevistaById(id).subscribe(
      res => {
        this.revistaC = res.revistas;
        this.modalService.open(modal, {size: 'lg', scrollable: true})
      },
      err => {
        console.log(err)
      }
    )
  }

  prestamo(revitstaId: string, modal){
    this.authService.addPrestamoRevista(revitstaId).subscribe(
      res =>{
        console.log(res)
        this.modalService.dismissAll();
        this.mensaje = res.message
        this.modalService.open(modal, {centered: true, size: 'sm'})
      },
      err =>{
        this.mensaje = err.error.message
        this.modalService.open(modal, {centered: true, size: 'sm'})
      }
    )
  }

  buscar(busqueda: HTMLInputElement, tipo: HTMLSelectElement){
    console.log(busqueda.value)
    console.log(tipo.value)
    switch (tipo.value) {
      case 'titulo':
        this.authService.getRevistaTitulo(busqueda.value).subscribe(
          res => {
            this.revistas = res.revistas;
            this.cantRevistas = this.revistas.length;
            console.log(res.revistas)
          },
          err => console.log(err)
        )
      break;
      case 'palabra':
        this.authService.getRevistaPalabra(busqueda.value).subscribe(
          res => {
            this.revistas = res.revistas;
            this.cantRevistas = this.revistas.length;
            console.log(res.revistas)
          },
          err => console.log(err)
        )
      break;
      case 'tema':
        this.authService.getRevistaTema(busqueda.value).subscribe(
          res => {
            this.revistas = res.revistas;
            this.cantRevistas = this.revistas.length;
            console.log(res.revistas)
          },
          err => console.log(err)
        )
      break;
      default:
        this.authService.getRevista()
        .subscribe(
          res => {
            this.revistas = res.revistas;
            this.cantRevistas = this.revistas.length;
            console.log(res.revistas)
          },
          err => console.log(err)
        )
      break;
    }
  }
}
