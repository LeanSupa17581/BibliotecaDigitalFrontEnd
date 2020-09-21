import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

interface HtmlInputEvent extends Event
{
  target: HTMLInputElement & EventTarget
}
@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  id: string;
  temas: [];
  model2:any = {};
  constructor(private authService: AuthService, private router: Router, private zone: NgZone, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(localStorage.getItem("TEMA") && localStorage.getItem("TEMA") == "REVISTA"){
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.TemasRevista(this.id)
        .subscribe(
          res => {
            this.temas = res.temas;
            console.log(res.temas)
            console.log(res)
          },
          err => console.log(err)
        )
      })
    }else{
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.TemasLibro(this.id)
        .subscribe(
          res => {
            this.temas = res.temas;
            console.log(res.temas)
            console.log(res)
          },
          err => console.log(err)
        )
      })
    }
  }

  RegistrarTema(tema: HTMLInputElement): void{
    if(localStorage.getItem("TEMA") && localStorage.getItem("TEMA") == "REVISTA"){
      console.log(tema.value)
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.addTemaRevista(this.id, tema.value)
        .subscribe(
          res => {
            console.log(res)
            this.zone.runOutsideAngular(() => {
              location.reload();
            });
          },
          err => console.log(err)
        )
      })
    }else{
      console.log(tema.value)
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.addTemaLibro(this.id, tema.value)
        .subscribe(
          res => {
            console.log(res)
            this.zone.runOutsideAngular(() => {
              location.reload();
            });
          },
          err => console.log(err)
        )
      })
    }
    
  }

  EditarTema(i): void{
    if(localStorage.getItem("TEMA") && localStorage.getItem("TEMA") == "REVISTA"){
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.TemasRevista(this.id)
        .subscribe(
          res => {
            this.temas = res.temas;
            this.model2 = this.temas[i]
            console.log(res.temas)
            console.log(this.model2)
          },
          err => console.log(err)
        )
      })
    }else{
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.TemasLibro(this.id)
        .subscribe(
          res => {
            this.temas = res.temas;
            this.model2 = this.temas[i]
            console.log(res.temas)
            console.log(this.model2)
          },
          err => console.log(err)
        )
      })
    }
    
  }

  EliminarTema(idTema: string){
    if(localStorage.getItem("TEMA") && localStorage.getItem("TEMA") == "REVISTA"){
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.deleteTemaRevista(this.id, idTema)
        .subscribe(
          res => {
            console.log(res)
            this.zone.runOutsideAngular(() => {
              location.reload();
            });
          },
          err => console.log(err)
        )
      })
    }else{
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.deleteTemaLibro(this.id, idTema)
        .subscribe(
          res => {
            console.log(res)
            this.zone.runOutsideAngular(() => {
              location.reload();
            });
          },
          err => console.log(err)
        )
      })
    }
    
  }

  updateTema(idTema: string){
    if(localStorage.getItem("TEMA") && localStorage.getItem("TEMA") == "REVISTA"){
      console.log(idTema)
      console.log(this.model2.tema)
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.editTemaRevista(this.id, this.model2.tema, idTema)
        .subscribe(
          res => {
            console.log(res)
            this.zone.runOutsideAngular(() => {
              location.reload();
            });
          },
          err => console.log(err)
        )
      })
    }else{
      console.log(idTema)
      console.log(this.model2.tema)
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.editTemaLibro(this.id, this.model2.tema, idTema)
        .subscribe(
          res => {
            console.log(res)
            this.zone.runOutsideAngular(() => {
              location.reload();
            });
          },
          err => console.log(err)
        )
      })
    }
    
  }

  regresar(){
    if(localStorage.getItem("TEMA") && localStorage.getItem("TEMA") == "REVISTA"){
      localStorage.removeItem("TEMA");
      this.router.navigateByUrl('/auth/revistas');
    }else{
      this.router.navigateByUrl('/auth/libros');
    }
  }

}
