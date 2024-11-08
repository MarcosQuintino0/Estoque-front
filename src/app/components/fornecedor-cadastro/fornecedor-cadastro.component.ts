import { Component } from '@angular/core';
import {
  Fornecedor,
  FornecedorService,
} from '../../services/fornecedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fornecedor-cadastro',
  standalone: false,
  templateUrl: './fornecedor-cadastro.component.html',
  styleUrl: './fornecedor-cadastro.component.css',
})
export class FornecedorCadastroComponent {
  fornecedor: Fornecedor = {
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
  };

  constructor(
    private fornecedorService: FornecedorService,
    private router: Router
  ) {}

  salvarFornecedor(): void {
    this.fornecedorService.criarFornecedor(this.fornecedor).subscribe(() => {
      alert('Fornecedor cadastrado com sucesso!');
      this.router.navigate(['/']);
    });
  }
}
