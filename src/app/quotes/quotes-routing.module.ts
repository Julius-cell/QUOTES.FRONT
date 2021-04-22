import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ModifyComponent } from './pages/modify/modify.component';

const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: '', component: HomeComponent },
      { path: 'modify', component: ModifyComponent },
      { path: '**', redirectTo: '' },
    ]
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotesRoutingModule { }
