import { Component, OnInit } from '@angular/core';
import { Libro } from './../../Models/libro';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-libros-prestamo',
  templateUrl: './libros-prestamo.component.html',
  styleUrls: ['./libros-prestamo.component.css']
})
export class LibrosPrestamoComponent implements OnInit {

  libros: Libro[];
  libroP: Libro;
  libroC: Libro;
  mensaje: string
  palabras: [];
  temas: [];
  cantLibros: number;
  formulario = new FormGroup({
    formBusqueda: new FormControl(''),
  });
  
  constructor(private authService: AuthService, private router: Router, private modalService: NgbModal, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.authService.getLibros()
      .subscribe(
        res => {
          this.libros = res.libros;
          this.cantLibros = this.libros.length;
          console.log(res.libros)
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
          this.authService.getLibros()
          .subscribe(
            res => {
              this.libros = res.libros;
              this.cantLibros = this.libros.length;
              console.log(res.libros)
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
    this.authService.getLibroById(id).subscribe(
      res => {
        this.libroP = res.libros;
        this.authService.PalabrasLibro(this.libroP._id)
        .subscribe(
          res => {
            this.palabras = res.palabras;
            console.log(res.palabras)
            console.log(res)
            this.authService.TemasLibro(this.libroP._id)
            .subscribe(
              res => {
                this.temas = res.temas;
                this.modalService.open(modal, {size: 'lg', scrollable: true})
                console.log(res.temas)
                console.log(res)
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

  validar(){
    
  }

  buscar(busqueda: HTMLInputElement, tipo: HTMLSelectElement){
    console.log(busqueda.value)
    console.log(tipo.value)
    switch (tipo.value) {
      case 'titulo':
        this.authService.getLibroTitulo(busqueda.value).subscribe(
          res => {
            this.libros = res.libros;
            this.cantLibros = this.libros.length;
            console.log(res.libros)
          },
          err => console.log(err)
        )
      break;
      case 'palabra':
        this.authService.getLibroPalabra(busqueda.value).subscribe(
          res => {
            this.libros = res.libros;
            console.log(res.libros)
            this.cantLibros = this.libros.length;
          },
          err => console.log(err)
        )
      break;
      case 'tema':
        this.authService.getLibroTema(busqueda.value).subscribe(
          res => {
            this.libros = res.libros;
            console.log(res.libros)
            this.cantLibros = this.libros.length;
          },
          err => console.log(err)
        )
      break;
      default:
        this.authService.getLibros()
        .subscribe(
          res => {
            this.libros = res.libros;
            this.cantLibros = this.libros.length;
            console.log(res.libros)
          },
          err => console.log(err)
        )
      break;
    }
  }

  verPrestamo(id:string, modal){
    this.authService.getLibroById(id).subscribe(
      res => {
        this.libroC = res.libros;
        this.modalService.open(modal, {size: 'lg', scrollable: true})
      },
      err => {
        console.log(err)
      }
    )
  }

  prestamo(libroId: string, modal){
    this.authService.addPrestamoLibro(libroId).subscribe(
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

}
