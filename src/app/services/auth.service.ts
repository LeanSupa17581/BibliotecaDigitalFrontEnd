import { RolGuard } from './../auth/guards/rol.guard';
import { Revista } from './../Models/revista';
import { Libro } from './../Models/libro';
import { JwtResponse } from './../Models/jwt-response';
import { User } from './../Models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from 'rxjs/operators';
import {Observable, BehaviorSubject, Subject} from 'rxjs'


@Injectable()

export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: string;
  private rol: string;
  private _listners = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  refereshData(){
    return this._listners;
  }

  registerAdmin(){
    return this.httpClient.get(`${this.AUTH_SERVER}/api/addAdmin`);
  }

  register(user: User): Observable<JwtResponse>{
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/api/register`, user);
  }

  edit(user: User, id: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/editUsuario/${id}`, user).pipe(tap(
      (res: any)=>{
        if(res){
          // guardar token
          this.saveToken(res.token, res.rol)
        }
      })
    );
  }

  login(usuario: User): Observable<JwtResponse>{
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/api/login`, usuario).pipe(tap(
      (res: any)=>{
        if(res){
          // guardar token
          this.saveToken(res.token, res.rol)
        }
      })
    );
  }
  
  getUsuarios(): Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/api/usuarios`).pipe(tap(
      (res: any)=>{
        if(res){
          // guardar token
        }
      })
    );
  }

  getUsuarioById(id: string): Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/api/getUsuario/${id}`);
  }

  deleteUsuario(id: string): Observable<any>{
    return this.httpClient.delete(`${this.AUTH_SERVER}/api/deleteUsuario/${id}`);
  }

  logout(): void{
    this.token = '';
    this.rol = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("ROL");
  }

  getLibros(): Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/api/libros`)
  }

  addLibro(autor: string, titulo: string, edicion: string, palabra: string, tema: string, copias: string, descripcion: string, image: File):Observable<any>{
    const fd = new FormData();
    fd.append('autor', autor);
    fd.append('titulo', titulo);
    fd.append('edicion', edicion);
    fd.append('palabra', palabra);
    fd.append('tema', tema);
    fd.append('copias', copias);
    fd.append('descripcion', descripcion);
    fd.append('image', image);
    return this.httpClient.post(`${this.AUTH_SERVER}/api/addLibro`, fd)
  }

  editLibro(id: string, libro: Libro, image: File): Observable<any>{
    const fd = new FormData();
    console.log(libro)
    fd.append('autor', libro.autor);
    fd.append('titulo', libro.titulo);
    fd.append('edicion', libro.edicion);
    fd.append('copias', libro.copias.toString());
    fd.append('descripcion', libro.descripcion);
    fd.append('image', image);
    fd.append('imagen', '');
    return this.httpClient.post(`${this.AUTH_SERVER}/api/editLibro/${id}`, fd)
  }

  addCopiasLibro(id: string, copias: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/addCopias/${id}`, {copias})
  }

  deleteLibro(id: string): Observable<any>{
    return this.httpClient.delete(`${this.AUTH_SERVER}/api/deleteLibro/${id}`);
  }

  getLibroById(id: string): Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/api/getLibro/${id}`);
  }

  PalabrasLibro(id: string): Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/api/obtenerPalabras/${id}`);
  }

  addPalabraLibro(id: string, palabra: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/addPalabraClaveLibro/${id}`, {palabra});
  }

  deletePalabraLibro(id: string, idPalabra: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/deletePalabra/${id}`, {idPalabra});
  }

  editPalabraLibro(id: string, palabra: string, idPalabra: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/editPalabra/${id}`, {palabra, idPalabra});
  }

  TemasLibro(id: string): Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/api/obtenerTemas/${id}`);
  }

  addTemaLibro(id: string, tema: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/addTemasLibro/${id}`, {tema});
  }

  deleteTemaLibro(id: string, idTema: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/deleteTema/${id}`, {idTema});
  }

  editTemaLibro(id: string, tema: string, idTema: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/editTema/${id}`, {tema, idTema});
  }

  getLibroTitulo(titulo: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/buscarLibroTitulo`, {titulo});
  }

  getLibroPalabra(palabra: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/buscarLibroPalabra`, {palabra});
  }

  getLibroTema(tema: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/buscarLibroTema`, {tema});
  }

  getLibrosMasPrestados(): Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/api/librosMasPrestados`);
  }

  getLibrosMasBuscados(): Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/api/librosMasBuscados`);
  }

  getLibrosMenosPrestados(): Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/api/librosMenosPrestados`);
  }

  getLibrosMenosBuscados(): Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/api/librosMenosBuscados`);
  }

  getRevista(): Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/api/revistas`)
  }

  addRevista(autor: string, titulo: string, edicion: string, palabra: string, tema: string, copias: string, descripcion: string, ejemplar: string, frecuencia: string, image: File): Observable<any>{
    const fd = new FormData();
    fd.append('autor', autor);
    fd.append('titulo', titulo);
    fd.append('edicion', edicion);
    fd.append('copias', copias);
    fd.append('palabra', palabra);
    fd.append('tema', tema);
    fd.append('descripcion', descripcion);
    fd.append('ejemplar', ejemplar);
    fd.append('frecuencia', frecuencia);
    fd.append('image', image);
    console.log(fd)
    return this.httpClient.post(`${this.AUTH_SERVER}/api/addRevista`, fd)
  }

  editRevista(id: string, revista: Revista, image: File): Observable<any>{
    const fd = new FormData();
    fd.append('autor', revista.autor);
    fd.append('titulo', revista.titulo);
    fd.append('edicion', revista.edicion);
    fd.append('copias', revista.copias.toString());
    fd.append('descripcion', revista.descripcion);
    fd.append('ejemplar', revista.ejemplar);
    fd.append('frecuencia', revista.frecuencia);
    fd.append('image', image);
    fd.append('imagen', '');
    return this.httpClient.post(`${this.AUTH_SERVER}/api/editRevista/${id}`, fd)
  }

  addCopiasRevista(id: string, copias: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/addCopiasRevista/${id}`, {copias})
  }

  deleteRevista(id: string): Observable<any>{
    return this.httpClient.delete(`${this.AUTH_SERVER}/api/deleteRevista/${id}`);
  }

  getRevistaById(id: string): Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/api/getRevista/${id}`);
  }

  PalabrasRevista(id: string): Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/api/obtenerPalabrasRevista/${id}`);
  }

  addPalabraRevista(id: string, palabra: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/addPalabraClaveRevista/${id}`, {palabra});
  }

  deletePalabraRevista(id: string, idPalabra: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/deletePalabraRevista/${id}`, {idPalabra});
  }

  editPalabraRevista(id: string, palabra: string, idPalabra: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/editPalabraRevista/${id}`, {palabra, idPalabra});
  }

  TemasRevista(id: string): Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/api/obtenerTemasRevista/${id}`);
  }

  addTemaRevista(id: string, tema: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/addTemasRevista/${id}`, {tema});
  }

  deleteTemaRevista(id: string, idTema: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/deleteTemaRevista/${id}`, {idTema});
  }

  editTemaRevista(id: string, tema: string, idTema: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/editTemaRevista/${id}`, {tema, idTema});
  }

  getRevistaTitulo(titulo: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/buscarRevistaTitulo`, {titulo});
  }

  getRevistaPalabra(palabra: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/buscarRevistaPalabra`, {palabra});
  }

  getRevistaTema(tema: string): Observable<any>{
    return this.httpClient.post(`${this.AUTH_SERVER}/api/buscarRevistaTema`, {tema});
  }

  getRevistasMasPrestadas(): Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/api/revistasMasPrestadas`);
  }

  getRevistasMasBuscadas(): Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/api/revistasMasBuscadas`);
  }

  getRevistasMenosPrestadas(): Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/api/revistasMenosPrestadas`);
  }

  getRevistasMenosBuscadas(): Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/api/revistasMenosBuscadas`);
  }

  addPrestamoLibro(libroId:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken())
    return this.httpClient.post(`${this.AUTH_SERVER}/api/registrarPrestamoLibro`, {libroId}, {headers: headers})
  }

  addPrestamoRevista(revistaId:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken())
    return this.httpClient.post(`${this.AUTH_SERVER}/api/registrarPrestamoRevista`, {revistaId}, {headers: headers})
  }

  getPrestamos():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken())
    return this.httpClient.get(`${this.AUTH_SERVER}/api/prestamos`, {headers: headers})
  }

  getPrestamoById(id: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken())
    return this.httpClient.get(`${this.AUTH_SERVER}/api/getPrestamo/${id}`, {headers: headers})
  }

  devolucion(id: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken())
    return this.httpClient.get(`${this.AUTH_SERVER}/api/devolucion/${id}`, {headers: headers})
  }

  private saveToken(token: string, rol: string): void{
    console.log(token);
    console.log(rol);
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("ROL", rol);
    this.token = token;
  }

  getToken(): string{
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN")
    }
    return this.token
  }

  getRol(): string{
    if(!this.rol){
      this.rol = localStorage.getItem("ROL")
    }
    return this.rol
  }
}
