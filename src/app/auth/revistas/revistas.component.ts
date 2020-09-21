import { NgForm } from '@angular/forms';
import { Revista } from './../../Models/revista';
import { Component, OnInit, NgZone, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';

interface HtmlInputEvent extends Event
{
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-revistas',
  templateUrl: './revistas.component.html',
  styleUrls: ['./revistas.component.css']
})
export class RevistasComponent implements OnInit {

  revistas: Revista[];
  file: File;
  image: string | ArrayBuffer;
  mensaje: string;
  revistaEdit: Revista;
  revistaDelete: Revista;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  copiasRevista: Revista;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  public msgError: '' | string;
  isError: boolean = false;
  constructor(private authService: AuthService, private router: Router, private zone: NgZone, private modalService: NgbModal, private chRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };
    this.authService.getRevista()
      .subscribe(
        res => {
          this.revistas = res.revistas;
          this.chRef.detectChanges();
          console.log(res.revistas)
          this.dtTrigger.next();
        },
        err => console.log(err)
      )
  }

  Logout(){
    this.authService.logout();
    this.router.navigate(['/auth/home'])
  }

  getRevistas(){
    this.authService.getRevista()
      .subscribe(
        res => {
          this.revistas = res.revistas;
          console.log(res.revistas)
        },
        err => console.log(err)
      )
  }

  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();
  }

  imageSelected(event: HtmlInputEvent): void{
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.image = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  verRegister(modal){
    this.modalService.open(modal, {size: 'lg', scrollable: true})
  }

  onAddRevista(form: NgForm, autor: HTMLInputElement, titulo: HTMLInputElement, edicion: HTMLInputElement, palabra: HTMLInputElement, tema: HTMLInputElement, copias: HTMLInputElement, ejemplar: HTMLInputElement, frecuencia: HTMLInputElement, descripcion: HTMLTextAreaElement, modal){
    if(form.valid){
      this.authService.addRevista(autor.value, titulo.value, edicion.value, palabra.value, tema.value, copias.value, descripcion.value, ejemplar.value, frecuencia.value, this.file).subscribe(
        res =>{
          console.log(res)
          this.close();
          this.render();
          this.mensaje = res.message
          this.modalService.open(modal, {centered: true, size: 'sm'})
        },
        err=>{
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

  verEdit(id: string, modal){
    this.authService.getRevistaById(id).subscribe(
      res => {
        this.revistaEdit = res.revistas;
        console.log(this.revistaEdit)
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
    this.authService.editRevista(id, this.revistaEdit, this.file).subscribe(
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
        this.mensaje = err.error.message
        this.modalService.open(modal, {centered: true, size: 'sm'})
      }
    )
  }

  verCopias(id: string, modal){
    this.authService.getRevistaById(id).subscribe(
      res => {
        this.copiasRevista = res.revistas;
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
    console.log(id)
    if(form.valid){
      this.authService.addCopiasRevista(id, copias.value).subscribe(
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

  verDelete(id:string, modal){
    this.authService.getRevistaById(id).subscribe(
      res => {
        this.revistaDelete = res.revistas;
        console.log(this.revistaDelete)
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
    this.authService.deleteRevista(id).subscribe(
      res =>{
        console.log(res)
        this.close();
        this.render();
        this.mensaje = res.message
        this.modalService.open(modal, {centered: true, size: 'sm'})
      },
      err =>{
        console.log(err)
        this.mensaje = err.error.message
        this.modalService.open(modal, {centered: true, size: 'sm'})
      }
    )
  }

  PalabrasRevista(id: string){
    console.log(id);
    localStorage.setItem("PALABRA", "REVISTA")
    this.router.navigate(['/auth/palabrasClave', id]);
  }

  TemasRevista(id: string){
    console.log(id);
    localStorage.setItem("TEMA", "REVISTA")
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
    this.getRevistas();
  }

  close(){
    this.modalService.dismissAll();
  }
}
