import { Libro } from './../../Models/libro';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  libros: Libro[]
  cant1: number;
  cant2: number;
  cant3: number;
  cant4: number;
  cant5: number;
  chart: [];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getLibrosMasPrestados().subscribe(res =>{
      console.log(res)
      this.libros = res.libros;
      console.log(this.libros[0].prestamo)
      this.cant1 = this.libros[0].prestamo;
      this.cant2 = this.libros[1].prestamo;
      this.cant3 = this.libros[2].prestamo;
      this.cant4 = this.libros[3].prestamo;
      this.cant5 = this.libros[4].prestamo;
      this.chart = new Chart('canvas',{
        type: 'line',
        data: {
          datasets: [{
              label: 'Libos más Prestados',
              data: [this.cant1, this.cant2, this.cant3, this.cant4, this.cant5],
              backgroundColor:[
                '#06ECAD','#06EC68','#53EC06','#D7EC06','#EC9106'
              ]
          }],
          labels: [this.libros[0].titulo, this.libros[1].titulo, this.libros[2].titulo, this.libros[3].titulo, this.libros[4].titulo]
        },
        options: {
          legend:{
            display: false
          },
          scales:{
            xAxes: [
              {display:true}
            ],
            yAxes:[{
              display:true
            }]
          }
        }
      })
    })
  }

  genarar(libroRevista: HTMLSelectElement, sobre: HTMLSelectElement, tipo: HTMLSelectElement){
    this.chart =[];
    this.cant1 = null;
    this.cant2 = null;
    this.cant3 = null;
    this.cant4 = null;
    this.cant5 = null;
    this.libros = []
    switch (libroRevista.value) {
      case 'libro':
        switch (sobre.value) {
          case 'masp':
            this.authService.getLibrosMasPrestados().subscribe(res =>{
              console.log(res)
              this.libros = res.libros;
              console.log(this.libros[0].prestamo)
              this.cant1 = this.libros[0].prestamo;
              this.cant2 = this.libros[1].prestamo;
              this.cant3 = this.libros[2].prestamo;
              this.cant4 = this.libros[3].prestamo;
              this.cant5 = this.libros[4].prestamo;
              this.chart = new Chart('canvas',{
                type: tipo.value,
                data: {
                  datasets: [{
                      label: 'Libros más Prestados',
                      data: [this.cant1, this.cant2, this.cant3, this.cant4, this.cant5],
                      backgroundColor:[
                        '#06ECAD','#06EC68','#53EC06','#D7EC06','#EC9106'
                      ]
                  }],
                  labels: [this.libros[0].titulo, this.libros[1].titulo, this.libros[2].titulo, this.libros[3].titulo, this.libros[4].titulo]
                },
                options: {
                  legend:{
                    display: false
                  },
                  scales:{
                    xAxes: [
                      {display:true}
                    ],
                    yAxes:[{
                      display:true
                    }]
                  }
                }
              })
            })
          break;
          case 'masb':
            this.authService.getLibrosMasBuscados().subscribe(res =>{
              console.log(res)
              this.libros = res.libros;
              console.log(this.libros[0].prestamo)
              this.cant1 = this.libros[0].prestamo;
              this.cant2 = this.libros[1].prestamo;
              this.cant3 = this.libros[2].prestamo;
              this.cant4 = this.libros[3].prestamo;
              this.cant5 = this.libros[4].prestamo;
              this.chart = new Chart('canvas',{
                type: tipo.value,
                data: {
                  datasets: [{
                      label: 'Libros más Buscados',
                      data: [this.cant1, this.cant2, this.cant3, this.cant4, this.cant5],
                      backgroundColor:[
                        '#06ECAD','#06EC68','#53EC06','#D7EC06','#EC9106'
                      ]
                  }],
                  labels: [this.libros[0].titulo, this.libros[1].titulo, this.libros[2].titulo, this.libros[3].titulo, this.libros[4].titulo]
                },
                options: {
                  legend:{
                    display: false
                  },
                  scales:{
                    xAxes: [
                      {display:true}
                    ],
                    yAxes:[{
                      display:true
                    }]
                  }
                }
              })
            })
          break;
        
          default:
            console.log('Error Libros')
          break;
        }
      break;
      case 'revista':
        switch (sobre.value) {
          case 'masp':
            this.authService.getRevistasMasPrestadas().subscribe(res =>{
              console.log(res)
              this.libros = res.libros;
              console.log(this.libros[0].prestamo)
              this.cant1 = this.libros[0].prestamo;
              this.cant2 = this.libros[1].prestamo;
              this.cant3 = this.libros[2].prestamo;
              this.cant4 = this.libros[3].prestamo;
              this.cant5 = this.libros[4].prestamo;
              this.chart = new Chart('canvas',{
                type: tipo.value,
                data: {
                  datasets: [{
                      label: 'Revistas más Prestadas',
                      data: [this.cant1, this.cant2, this.cant3, this.cant4, this.cant5],
                      backgroundColor:[
                        '#06ECAD','#06EC68','#53EC06','#D7EC06','#EC9106'
                      ]
                  }],
                  labels: [this.libros[0].titulo, this.libros[1].titulo, this.libros[2].titulo, this.libros[3].titulo, this.libros[4].titulo]
                },
                options: {
                  legend:{
                    display: false
                  },
                  scales:{
                    xAxes: [
                      {display:true}
                    ],
                    yAxes:[{
                      display:true
                    }]
                  }
                }
              })
            })
          break;
          case 'masb':
            this.authService.getRevistasMasBuscadas().subscribe(res =>{
              console.log(res)
              this.libros = res.libros;
              console.log(this.libros[0].prestamo)
              this.cant1 = this.libros[0].prestamo;
              this.cant2 = this.libros[1].prestamo;
              this.cant3 = this.libros[2].prestamo;
              this.cant4 = this.libros[3].prestamo;
              this.cant5 = this.libros[4].prestamo;
              this.chart = new Chart('canvas',{
                type: tipo.value,
                data: {
                  datasets: [{
                      label: 'Revistas más Buscadas',
                      data: [this.cant1, this.cant2, this.cant3, this.cant4, this.cant5],
                      backgroundColor:[
                        '#06ECAD','#06EC68','#53EC06','#D7EC06','#EC9106'
                      ]
                  }],
                  labels: [this.libros[0].titulo, this.libros[1].titulo, this.libros[2].titulo, this.libros[3].titulo, this.libros[4].titulo]
                },
                options: {
                  legend:{
                    display: false
                  },
                  scales:{
                    xAxes: [
                      {display:true}
                    ],
                    yAxes:[{
                      display:true
                    }]
                  }
                }
              })
            })
          break;
          default:
            console.log('Error revistas')
          break;
        }
      break;
      default:
        console.log('Error')
      break;
    }
  }

  Logout(){
    this.authService.logout();
    this.router.navigate(['/auth/home'])
  }

}
