import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateTokenGuard } from './auth/guards/validate-token.guard';

const routes: Routes = [
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  { 
    path: 'quotes', 
    loadChildren: () => import('./quotes/quotes.module').then(m => m.QuotesModule),
    canActivate: [ValidateTokenGuard],
    canLoad: [ValidateTokenGuard] 
  },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
