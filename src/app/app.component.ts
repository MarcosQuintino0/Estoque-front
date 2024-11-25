import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MenuItem } from 'primeng/api/menuitem';
import { FornecedorService } from './services/fornecedor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent implements OnInit {
  menuItems: MenuItem[];
  fornecedorNome: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private fornecedorService: FornecedorService
  ) {
    this.setupMenuItems();
  }

  ngOnInit() {
    this.carregarDadosFornecedor();
  }

  private setupMenuItems() {
    const fornecedorId = this.authService.getFornecedorLogadoId();
    this.menuItems = [
      {
        label: 'Perfil',
        icon: 'pi pi-user-edit',
        command: () => this.router.navigate([`/${fornecedorId}/editar-perfil`]),
      },
      {
        separator: true,
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logout();
          this.router.navigate(['/login']);
        },
      },
    ];
  }

  private carregarDadosFornecedor() {
    const fornecedorId = this.authService.getFornecedorLogadoId();
    if (fornecedorId) {
      this.fornecedorService.getFornecedorById(fornecedorId).subscribe({
        next: (fornecedor) => {
          this.fornecedorNome = fornecedor.nome;
        },
      });
    }
  }

  get showHeader(): boolean {
    const currentUrl = this.router.url;
    return (
      !currentUrl.includes('/login') &&
      !currentUrl.includes('/cadastro-fornecedor')
    );
  }
}
