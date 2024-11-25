import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private fornecedorLogadoKey = 'fornecedorLogado';

  login(fornecedorId: number) {
    localStorage.setItem(this.fornecedorLogadoKey, fornecedorId.toString());
  }

  logout() {
    localStorage.removeItem(this.fornecedorLogadoKey);
  }

  getFornecedorLogadoId(): number | null {
    const id = localStorage.getItem(this.fornecedorLogadoKey);
    return id ? Number(id) : null;
  }

  isLogado(): boolean {
    return !!this.getFornecedorLogadoId();
  }
}
