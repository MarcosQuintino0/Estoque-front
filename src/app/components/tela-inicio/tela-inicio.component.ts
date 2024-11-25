import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tela-inicio',
  standalone: false,
  templateUrl: './tela-inicio.component.html',
  styleUrl: './tela-inicio.component.css',
})

// tela-inicio.component.ts
export class TelaInicioComponent implements OnInit {
  fornecedorId: number;
  menuItems: MenuItem[];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.fornecedorId = this.authService.getFornecedorLogadoId();
    if (!this.fornecedorId) {
      this.router.navigate(['/login']);
    }

    this.menuItems = [
      {
        label: 'Perfil',
        icon: 'pi pi-user-edit',
        command: () =>
          this.router.navigate([`/${this.fornecedorId}/editar-perfil`]),
      },
      {
        separator: true,
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
