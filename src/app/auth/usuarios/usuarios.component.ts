import { User } from './../../Models/user';
import { AuthService } from './../../services/auth.service';
import {  OnDestroy, Component, OnInit, NgZone, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnDestroy, OnInit {
 
  usuarios: User[];
  modal: NgbModalRef
  usuariosDelete: User;
  usuariosEdit: User;
  user: User;
  mensaje: string;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  msgError: '' | string;
  isError: boolean = false;
  constructor(private authService: AuthService, private router: Router, private zone: NgZone, private modalService: NgbModal,
    private chRef: ChangeDetectorRef) { }
  
  
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };
    this.authService.getUsuarios()
      .subscribe(
        res => {
          this.usuarios = res.usuarios;
          console.log(res.usuarios)
          console.log(res)
          this.chRef.detectChanges();
          this.dtTrigger.next();
        },
        err => console.log(err)
      )
    
  }

  getUsuarios(){
    this.authService.getUsuarios()
      .subscribe(
        res => {
          this.usuarios = res.usuarios;
          console.log(res.usuarios)
          console.log(res)
        },
        err => console.log(err)
      )
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

  verEdit(id: string, modal){
    this.authService.getUsuarioById(id).subscribe(
      res => {
        this.usuariosEdit = res.usuarios;
        console.log(res.usuarios)
        this.modalService.open(modal, {size: 'lg'})
      },
      err => {
        console.log(err)
        this.mensaje = err.error.message
        this.modalService.open(modal, {centered: true, size: 'sm'})
      }
    )
  }

  editUser(id: string, modal){
    this.authService.edit(this.usuariosEdit, id).subscribe(
      res =>{
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

  ver(id: string, modal){
    this.authService.getUsuarioById(id).subscribe(
      res => {
        this.usuariosDelete = res.usuarios;
        console.log(res.usuarios)
        this.modalService.open(modal, {size: 'lg'})
      },
      err => {
        console.log(err)
        this.mensaje = err.error.message
        this.modalService.open(modal, {centered: true, size: 'sm'})
      }
    )
    
  }
  verRegister(modal){
    this.modalService.open(modal, {size: 'lg', scrollable: true})
  }

  onRegister(form, rol:HTMLSelectElement, modal){
  console.log(form.value)
  console.log(rol.value)
  this.user= form.value;
  this.user.rol = rol.value;
  console.log(this.user)
    if(form.valid){
      this.authService.register(this.user).subscribe(
        res =>{
          this.close();
          this.render();
          this.mensaje = res.message
          this.modalService.open(modal, {centered: true, size: 'sm'})
        },
        err =>{
          console.log(err)
          this.msgError = err.error.message
          this.isError = true;
          setTimeout(()=>{
            this.isError = false;
          }, 6000)
          
        }
      )
    }else{
      this.msgError = 'Formulario invalido'
      this.isError = true;
      setTimeout(()=>{
        this.isError = false;
      }, 6000)
    }
  }

  deleteUser(id: string, modal){
    this.authService.deleteUsuario(id).subscribe(
      res =>{
        this.close();
        this.render();
        this.mensaje = res.message
        this.modalService.open(modal, {centered: true, size: 'sm'})
        console.log(res)
      },
      err =>{
        console.log(err)
        this.mensaje = err.error.message
        this.modalService.open(modal, {centered: true, size: 'sm'})
      }
    )
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
    this.getUsuarios()
    
  }

  close(){
    this.modalService.dismissAll();
  }

  Logout(){
    this.authService.logout();
    this.router.navigate(['/auth/home'])
  }

}
