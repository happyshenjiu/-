import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// import {AuthGuardService} from '../services';
import {PageNotFoundComponent} from './core/page-not-found';
import {LoginComponent} from "./login/login/login.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'projects',
    redirectTo: '/projects',
    pathMatch: 'full'
  },
  {
    path: 'tasklists',
    redirectTo: '/tasklists',
    pathMatch: 'full'
  }

  /*{
    path: '**', component: PageNotFoundComponent
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
