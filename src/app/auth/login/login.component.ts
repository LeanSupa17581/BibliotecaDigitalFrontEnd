import { User } from './../../Models/user';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { NgForm } from '@angular/forms';
interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  mensaje: string;
  msgError: '' | string;
 
  constructor(private authService: AuthService, private router: Router, private modalService: NgbModal) { }
  isError: Boolean = false;
  ngOnInit(): void {
  }

  onLogin(form: NgForm, modal): void{
    console.log(form)
    this.user = form.value;
    console.log(this.user)
    if(form.valid){
      this.authService.login(this.user).subscribe(res =>{
        if(res.message){
          this.mensaje = res.message
          this.modalService.open(modal, {centered: true, size: 'sm'})
        }else{
          if(localStorage.getItem("ROL") === 'admin'){
            console.log(localStorage.getItem("ROL"))
            console.log(localStorage.getItem("ACCESS_TOKEN"))
            this.router.navigateByUrl('/auth/homeAdmin');
          }else{
            this.router.navigateByUrl('/auth/inicio');
          }
        }
      },
      err =>{
        this.msgError = 'El usuario no existe, ponerse en contacto con el administrador para solicitar su reguistro.'
        this.isError = true;
        setTimeout(()=>{
          this.isError = false;
        }, 4000)
      })
    }else{
      this.msgError = 'Formulario invalido'
      this.isError = true;
        setTimeout(()=>{
          this.isError = false;
        }, 4000)
    }
    
  }

}
