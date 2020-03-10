import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { Http, Response, HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponentComponent } from './first-component/first-component.component';
import { AppareilComponent } from './appareil/appareil.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppareilService } from './services/Appareil.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/User.service';
import { TypeDeclarationService } from './services/TypeDeclaration.service';

import { AuthGuard } from './services/auth-guard.service';
import { AuthComponent } from './auth/auth.component';

import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { Routes, RouterModule } from '@angular/router';
import { SingleAppareilComponent } from './single-appareil/single-appareil.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { EditAppareilComponent } from './edit-appareil/edit-appareil.component';
import { UserListComponent } from './user-list/user-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { TypeDeclarationListComponent } from './type-declaration-list/type-declaration-list.component';
import { TypeDeclarationEditComponent } from './type-declaration-edit/type-declaration-edit.component';
import { ListingComponent } from './generic/listing/listing.component';
import { EditComponent } from './generic/edit/edit.component';
import { OrganismesService } from './services/Organismes.service';
import { DetailComponent } from './generic/detail/detail.component';
import { TypeDeclarationDetailComponent } from './type-declaration-detail/type-declaration-detail.component';

const appRoutes: Routes = [
  {path: 'appareils', canActivate: [AuthGuard], component: AppareilViewComponent},
  {path: 'appareils/:id', canActivate: [AuthGuard], component: SingleAppareilComponent},
  {path: 'type-declarations', component: TypeDeclarationListComponent},
  {path: 'type-declarations/:id', component: TypeDeclarationEditComponent},
  {path: 'type-declarations-detail/:id', component: TypeDeclarationDetailComponent},
  {path: 'edit', canActivate: [AuthGuard], component: EditAppareilComponent},
  {path: 'users', component: UserListComponent},
  {path: 'new-user', component: NewUserComponent},
  {path: 'auth', component: AuthComponent},
  {path: '', component: AppareilViewComponent},
  {path: 'not-found', component: FourOhFourComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    FirstComponentComponent,
    AppareilComponent,
    AuthComponent,
    AppareilViewComponent,
    SingleAppareilComponent,
    FourOhFourComponent,
    EditAppareilComponent,
    UserListComponent,
    NewUserComponent,
    TypeDeclarationListComponent,
    TypeDeclarationEditComponent,
    ListingComponent,
    EditComponent,
    DetailComponent,
    TypeDeclarationDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    AppareilService,
    TypeDeclarationService,
    OrganismesService,
    AuthService,
    AuthGuard,
    UserService,
    HttpClient
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
