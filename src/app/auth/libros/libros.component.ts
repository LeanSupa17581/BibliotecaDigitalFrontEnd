import { OnDestroy, Component, OnInit, NgZone, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Libro } from './../../Models/libro';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
interface HtmlInputEvent extends Event
{
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnDestroy, OnInit {

  libros: Libro[];
  file: File;
  image: string | ArrayBuffer;
  mensaje: string;
  libroEdit: Libro;
  libroDelete: Libro;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  copiasLibro: Libro;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  public msgError: '' | string;
  isError: boolean = false;
  constructor(private authService: AuthService, private router: Router, private zone: NgZone, private modalService: NgbModal, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };
    this.authService.getLibros()
      .subscribe(
        res => {
          this.libros = res.libros;
          console.log(res.libros)
          this.chRef.detectChanges();
          this.dtTrigger.next();
        },
        err => console.log(err)
      )
  }

  Logout(){
    this.authService.logout();
    this.router.navigate(['/auth/home'])
  }

  getLibros(){
    this.authService.getLibros()
      .subscribe(
        res => {
          this.libros = res.libros;
          console.log(res.libros)
        },
        err => console.log(err)
      )
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

  imageSelected(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.image = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  verCopias(id: string, modal){
    this.authService.getLibroById(id).subscribe(
      res => {
        this.copiasLibro = res.libros;
        this.modalService.open(modal, {size: 'sm', scrollable: true})
      },
      err => {
        console.log(err)
        this.mensaje = err.error.message
        this.modalService.open(modal, {centered: true, size: 'sm'})
      }
    )
  }

  onAddCopias(form: NgForm, id:string, copias: HTMLInputElement, modal){
    if(form.valid){
      this.authService.addCopiasLibro(id, copias.value).subscribe(
        res =>{
          console.log(res)
          this.close();
          this.render();
          this.mensaje = res.message
          this.modalService.open(modal, {centered: true, size: 'sm'})
        },
        err =>{
          console.log(err)
          this.render();
          this.msgError = err.error.message
          this.isError = true;
          setTimeout(()=>{
            this.isError = false;
          }, 6000)
        }
      )
    }else{
      this.msgError = 'Valores invalidos'
      this.isError = true;
      setTimeout(()=>{
        this.isError = false;
      }, 6000)
    }
  }

  verRegister(modal){
    this.modalService.open(modal, {size: 'lg', scrollable: true})
  }

  onAddLibro(form: NgForm, autor: HTMLInputElement, titulo: HTMLInputElement, edicion: HTMLInputElement, palabra: HTMLInputElement, tema: HTMLInputElement, copias: HTMLInputElement, descripcion: HTMLTextAreaElement, modal){
    console.log(form)
    if(form.valid){
      this.authService.addLibro(autor.value, titulo.value, edicion.value, palabra.value, tema.value, copias.value, descripcion.value, this.file).subscribe(
        res =>{
          console.log(res)
          this.close();
          this.render();
          this.mensaje = res.message
          this.modalService.open(modal, {centered: true, size: 'sm'})
        },
        err =>{
          console.log(err)
          this.render();
          this.msgError = err.error.message
          this.isError = true;
          setTimeout(()=>{
            this.isError = false;
          }, 6000)
        })
    }else{
          this.msgError = 'Valores invalidos'
          this.isError = true;
          setTimeout(()=>{
            this.isError = false;
          }, 6000)
    }
  }

  verEdit(id: string, modal){
    this.authService.getLibroById(id).subscribe(
      res => {
        this.libroEdit = res.libros;
        this.modalService.open(modal, {size: 'lg', scrollable: true})
      },
      err => {
        console.log(err)
        this.mensaje = err.error.message
        this.modalService.open(modal, {centered: true, size: 'sm'})
      }
    )
  }

  onSave(id: string, modal){
    this.authService.editLibro(id, this.libroEdit, this.file).subscribe(
      res =>{
        console.log(res)
        this.close();
        this.render();
        this.mensaje = res.message
        this.modalService.open(modal, {centered: true, size: 'sm'})
      },
      err => {
        console.log(err)
        this.render();
        this.mensaje = err.error.message
        this.modalService.open(modal, {centered: true, size: 'sm'})
      }
    )
  }

  verDelete(id:string, modal){
    this.authService.getLibroById(id).subscribe(
      res => {
        this.libroDelete = res.libros;
        this.modalService.open(modal, {size: 'lg', scrollable: true})
      },
      err => {
        console.log(err)
        this.mensaje = err.error.message
        this.modalService.open(modal, {centered: true, size: 'sm'})
      }
    )
  }

  delete(id: string, modal){
    this.authService.deleteLibro(id).subscribe(
      res =>{
        console.log(res)
        this.close();
        this.render();
        this.mensaje = res.message
        this.modalService.open(modal, {centered: true, size: 'sm'})
      },
      err => {
        console.log(err)
        this.render();
        this.mensaje = err.error.message
        this.modalService.open(modal, {centered: true, size: 'sm'})
      }
    )
  }

  PalabrasLibro(id: string){
    console.log(id);
    this.router.navigate(['/auth/palabrasClave', id]);
  }

  TemasLibro(id: string){
    console.log(id);
    this.router.navigate(['/auth/temas', id]);
  }

  render(){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api)=>{
      dtInstance.destroy();
      this.dtTrigger.next()
    })
  }

  onClose(){
    this.modalService.dismissAll();
    this.render();
    this.getLibros();
  }

  close(){
    this.modalService.dismissAll();
  }


}
