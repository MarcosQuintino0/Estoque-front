import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const fornecedorId = localStorage.getItem('fornecedorLogado');

    if (!fornecedorId) {
      this.router.navigate(['/login']);
      return false;
    }

    const routeFornecedorId = route.paramMap.get('fornecedorId');
    if (routeFornecedorId && routeFornecedorId !== fornecedorId) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
