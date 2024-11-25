import { Component } from '@angular/core';
import {
  Fornecedor,
  FornecedorService,
} from '../../services/fornecedor.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-fornecedor-cadastro',
  standalone: false,
  templateUrl: './fornecedor-cadastro.component.html',
  styleUrl: './fornecedor-cadastro.component.css',
})
// fornecedor-cadastro.component.ts
export class FornecedorCadastroComponent {
  fornecedor: Fornecedor = {
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    endereco: '',
  };

  constructor(
    private fornecedorService: FornecedorService,
    private router: Router,
    private messageService: MessageService
  ) {}

  salvarFornecedor(): void {
    console.log('Dados enviados:', this.fornecedor); // Adicione esta linha

    this.fornecedorService.criarFornecedor(this.fornecedor).subscribe({
      next: (response) => {
        console.log('Resposta:', response); // Adicione esta linha
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Fornecedor cadastrado com sucesso!',
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro completo:', error); // Adicione esta linha
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Erro ao cadastrar fornecedor: ${error.message}`,
        });
      },
    });
  }

  irParaLogin(): void {
    this.router.navigate(['/login']);
  }
}
