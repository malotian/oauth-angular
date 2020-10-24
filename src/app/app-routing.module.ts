import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OauthProvidersComponent } from './oauth-providers/oauth-providers.component';

const routes: Routes = [
  { path: 'oauth', component: OauthProvidersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
