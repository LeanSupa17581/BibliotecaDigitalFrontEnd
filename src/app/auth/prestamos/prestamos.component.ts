import { Prestamo } from './../../Models/prestamo';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {

  prestamos: Prestamo[];
  prestamoC: Prestamo;
  mensaje: string;
  constructor(private authService: AuthService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.authService.getPrestamos()
      .subscribe(
        res => {
          this.prestamos = res.prestamos;
          console.log(res.prestamos)
        },
        err => console.log(err)
      )
  }
  
  ver(id:string, modal){
    this.authService.getPrestamoById(id).subscribe(
      res => {
        this.prestamoC = res.prestamos;
        this.modalService.open(modal, {size: 'lg', scrollable: true})
      },
      err => {
        console.log(err)
      }
    )
  }

  devolucion(id:string, modal){
    this.authService.devolucion(id).subscribe(
      res=>{
        console.log(res)
        this.modalService.dismissAll();
        this.mensaje = res.message
        this.modalService.open(modal, {centered: true, size: 'sm'})
      },
      err=>{
        this.mensaje = err.error.message
        this.modalService.open(modal, {centered: true, size: 'sm'})
      }
    )
  }

  Logout(){
    this.authService.logout();
    this.router.navigate(['/auth/home'])
  }

  close(){
    this.modalService.dismissAll();
    this.ngOnInit()
  }

}
