import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const idUsuario = localStorage.getItem('id_usuario');
    const usuario = localStorage.getItem('usuario');
    
    if (idUsuario && usuario) {
      return true;
    }
    
    console.log('Usuário não autenticado, redirecionando para login...');
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url } 
    });
    return false;
  }
}