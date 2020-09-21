import { PrestamosComponent } from './prestamos/prestamos.component';
import { LibrosPrestamoComponent } from './libros-prestamo/libros-prestamo.component';
import { RevistasPrestamoComponent } from './revistas-prestamo/revistas-prestamo.component';
import { HomePrincipalComponent } from './home-principal/home-principal.component';
import { RolGuard } from './guards/rol.guard';
import { TokenGuard as TokenGuard} from './guards/token.guard';
import { RevistasComponent } from './revistas/revistas.component';
import { RegisterComponent } from './register/register.component';
import { TemasComponent } from './temas/temas.component';
import { PalabrasClaveComponent } from './palabras-clave/palabras-clave.component';
import { LibrosComponent } from './libros/libros.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'register', component: RegisterComponent, canActivate: [TokenGuard, RolGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'homeAdmin', component: HomeAdminComponent, canActivate: [TokenGuard, RolGuard]},
    {path: 'usuarios', component: UsuariosComponent, canActivate: [TokenGuard, RolGuard]},
    {path: 'libros', component: LibrosComponent, canActivate: [TokenGuard, RolGuard]},
    {path: 'palabrasClave/:id', component: PalabrasClaveComponent, canActivate: [TokenGuard, RolGuard]},
    {path: 'temas/:id', component: TemasComponent, canActivate: [TokenGuard, RolGuard]},
    {path: 'revistas', component: RevistasComponent, canActivate: [TokenGuard, RolGuard]},
    {path: 'inicio', component: HomePrincipalComponent, canActivate: [TokenGuard]},
    {path: 'prestamoLibros', component: LibrosPrestamoComponent, canActivate: [TokenGuard]},
    {path: 'prestamoRevistas', component: RevistasPrestamoComponent, canActivate: [TokenGuard]},
    {path: 'prestamos', component: PrestamosComponent, canActivate: [TokenGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }