import { Component } from '@angular/core';
import { FornecedorService } from '../../services/fornecedor.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

// login.component.ts
export class LoginComponent {
  loginData = {
    email: '',
    senha: '',
  };

  constructor(
    private fornecedorService: FornecedorService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  login() {
    if (this.loginData.email && this.loginData.senha) {
      this.fornecedorService.login(this.loginData).subscribe({
        next: (fornecedor) => {
          this.authService.login(fornecedor.id);
          this.router.navigate([`/${fornecedor.id}`]); // Navega para a rota base do fornecedor
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Email ou senha inválidos',
          });
        },
      });
    }
  }
}
