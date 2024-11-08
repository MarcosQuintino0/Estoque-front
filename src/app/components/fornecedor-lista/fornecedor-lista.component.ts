import { Component, OnInit } from '@angular/core';
import {
  Fornecedor,
  FornecedorService,
} from '../../services/fornecedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fornecedor-lista',
  standalone: false,
  templateUrl: './fornecedor-lista.component.html',
  styleUrl: './fornecedor-lista.component.css',
})
export class FornecedorListaComponent implements OnInit {
  fornecedores: Fornecedor[] = [];

  constructor(
    private fornecedorService: FornecedorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarFornecedores();
  }

  listarFornecedores(): void {
    this.fornecedorService.getFornecedores().subscribe((data) => {
      this.fornecedores = data;
    });
  }

  editarFornecedor(id: number): void {
    this.router.navigate([`/editar-fornecedor/${id}`]);
  }

  excluirFornecedor(id: number): void {
    if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
      this.fornecedorService.deletarFornecedor(id).subscribe(() => {
        alert('Fornecedor excluído com sucesso!');
        this.listarFornecedores();
      });
    }
  }
}
