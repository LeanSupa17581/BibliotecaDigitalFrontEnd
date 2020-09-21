import { RolGuard } from './guards/rol.guard';
import { TokenGuard } from './guards/token.guard';
import { AuthService } from './../services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthRoutingModule} from './auth-routing.module';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import {MatTableModule} from '@angular/material/table';
import { LibrosComponent } from './libros/libros.component';
import { PalabrasClaveComponent } from './palabras-clave/palabras-clave.component';
import { TemasComponent } from './temas/temas.component';
import { DataTablesModule } from 'angular-datatables';
import { RevistasComponent } from './revistas/revistas.component';
import { HomePrincipalComponent } from './home-principal/home-principal.component';
import { LibrosPrestamoComponent } from './libros-prestamo/libros-prestamo.component';
import { RevistasPrestamoComponent } from './revistas-prestamo/revistas-prestamo.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [RegisterComponent, LoginComponent, HomeComponent, HomeAdminComponent, UsuariosComponent, LibrosComponent, PalabrasClaveComponent, TemasComponent, RevistasComponent, HomePrincipalComponent, LibrosPrestamoComponent, RevistasPrestamoComponent, PrestamosComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule,
    MatTableModule,
    DataTablesModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    MatTableModule
  ],
  providers: [AuthService, TokenGuard, RolGuard]
})
export class AuthModule { }
