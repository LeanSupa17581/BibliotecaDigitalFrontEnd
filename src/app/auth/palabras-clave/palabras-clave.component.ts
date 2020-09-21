import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

interface HtmlInputEvent extends Event
{
  target: HTMLInputElement & EventTarget
}
@Component({
  selector: 'app-palabras-clave',
  templateUrl: './palabras-clave.component.html',
  styleUrls: ['./palabras-clave.component.css']
})
export class PalabrasClaveComponent implements OnInit {
  id: string;
  palabras: [];
  model2:any = {};
  constructor(private authService: AuthService, private router: Router, private zone: NgZone, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(localStorage.getItem("PALABRA") && localStorage.getItem("PALABRA") == "REVISTA"){
      console.log(localStorage.getItem("PALABRA"))
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.PalabrasRevista(this.id)
        .subscribe(
          res => {
            this.palabras = res.palabras;
            console.log(res.palabras)
            console.log(res)
          },
          err => console.log(err)
        )
      })
    }else{
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.PalabrasLibro(this.id)
        .subscribe(
          res => {
            this.palabras = res.palabras;
            console.log(res.palabras)
            console.log(res)
          },
          err => console.log(err)
        )
      })
    }
  }

  RegistrarPalabra(palabra: HTMLInputElement): void{
    if(localStorage.getItem("PALABRA") && localStorage.getItem("PALABRA") == "REVISTA"){
      console.log(palabra.value)
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.addPalabraRevista(this.id, palabra.value)
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
      console.log(palabra.value)
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.addPalabraLibro(this.id, palabra.value)
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

  EditarPalabra(i): void{
    if(localStorage.getItem("PALABRA") && localStorage.getItem("PALABRA") == "REVISTA"){
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.PalabrasRevista(this.id)
        .subscribe(
          res => {
            this.palabras = res.palabras;
            this.model2 = this.palabras[i]
            console.log(res.palabras)
            console.log(this.model2)
          },
          err => console.log(err)
        )
      })
    }else{
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.PalabrasLibro(this.id)
        .subscribe(
          res => {
            this.palabras = res.palabras;
            this.model2 = this.palabras[i]
            console.log(res.palabras)
            console.log(this.model2)
          },
          err => console.log(err)
        )
      })
    }
  }

  EliminarPalabra(idPalabra: string){
    if(localStorage.getItem("PALABRA") && localStorage.getItem("PALABRA") == "REVISTA"){
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.deletePalabraRevista(this.id, idPalabra)
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
        this.authService.deletePalabraLibro(this.id, idPalabra)
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

  updatePalabra(idPalabra: string){
    if(localStorage.getItem("PALABRA") && localStorage.getItem("PALABRA") == "REVISTA"){
      console.log(idPalabra)
      console.log(this.model2.palabra)
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.editPalabraRevista(this.id, this.model2.palabra, idPalabra)
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
      console.log(idPalabra)
      console.log(this.model2.palabra)
      this.activateRoute.params.subscribe(params =>{
        this.id = params['id'];
        this.authService.editPalabraLibro(this.id, this.model2.palabra, idPalabra)
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
    if(localStorage.getItem("PALABRA") && localStorage.getItem("PALABRA") == "REVISTA"){
      localStorage.removeItem("PALABRA");
      this.router.navigateByUrl('/auth/revistas');
    }else{
      this.router.navigateByUrl('/auth/libros');
    }
  }

}
