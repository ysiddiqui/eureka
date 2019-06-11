import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebsiteComponent } from './website/website.component';

const routes: Routes = [
  { path: 'website', component: WebsiteComponent },
  { path: '', redirectTo: '/website', pathMatch: 'full' },
  { path: '**', component: WebsiteComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
