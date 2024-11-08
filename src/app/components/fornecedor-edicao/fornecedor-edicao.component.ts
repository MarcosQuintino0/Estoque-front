import { Component, OnInit } from '@angular/core';
import {
  Fornecedor,
  FornecedorService,
} from '../../services/fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fornecedor-edicao',
  standalone: false,
  templateUrl: './fornecedor-edicao.component.html',
  styleUrl: './fornecedor-edicao.component.css',
})
export class FornecedorEdicaoComponent implements OnInit {
  fornecedor: Fornecedor = {
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
  };

  constructor(
    private fornecedorService: FornecedorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.fornecedorService.getFornecedorById(id).subscribe((data) => {
      this.fornecedor = data;
    });
  }

  atualizarFornecedor(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.fornecedorService
      .atualizarFornecedor(id, this.fornecedor)
      .subscribe(() => {
        alert('Fornecedor atualizado com sucesso!');
        this.router.navigate(['/fornecedores']);
      });
  }
}
