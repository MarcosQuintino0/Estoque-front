import { Component, OnInit } from '@angular/core';
import {
  Fornecedor,
  FornecedorService,
} from '../../services/fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-fornecedor-edicao',
  standalone: false,
  templateUrl: './fornecedor-edicao.component.html',
  styleUrl: './fornecedor-edicao.component.css',
})
// fornecedor-edicao.component.ts
export class FornecedorEdicaoComponent implements OnInit {
  fornecedor: Fornecedor = {
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    endereco: '',
  };

  editingField: string | null = null;

  constructor(
    private fornecedorService: FornecedorService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const fornecedorId = this.authService.getFornecedorLogadoId();
    if (fornecedorId) {
      this.fornecedorService.getFornecedorById(fornecedorId).subscribe({
        next: (data) => {
          this.fornecedor = data;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao carregar dados do fornecedor',
          });
          this.router.navigate(['/']);
        },
      });
    }
  }

  editField(field: string): void {
    this.editingField = field;
  }

  saveField(field: string): void {
    this.editingField = null;
    const fornecedorId = this.authService.getFornecedorLogadoId();

    if (fornecedorId) {
      this.fornecedorService
        .atualizarFornecedor(fornecedorId, this.fornecedor)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Campo atualizado com sucesso!',
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao atualizar campo',
            });
          },
        });
    }
  }
}
