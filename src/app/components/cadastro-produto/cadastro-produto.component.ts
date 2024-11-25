import { Component, OnInit } from '@angular/core';
import { Produto, ProdutoService } from '../../services/produto.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-produto',
  standalone: false,
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.css',
})
// cadastro-produto.component.ts
export class CadastroProdutoComponent implements OnInit {
  public produto: Produto = {
    id: null,
    nome: '',
    descricao: '',
    quantidade: 0,
    atualizacao: new Date(),
    validade: new Date(),
    custo: 0.0,
    preco: 0.0,
    margemLucro: 0.0,
    fornecedorId: null,
  };

  margemLucro: number = 0;
  fornecedorId: number;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.fornecedorId = Number(
      this.route.snapshot.paramMap.get('fornecedorId')
    );
    if (!this.fornecedorId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Fornecedor não identificado',
      });
      this.router.navigate(['/fornecedores']);
    }
  }

  salvarProduto(): void {
    const now = new Date();
    now.setHours(now.getHours() - 3);
    this.produto.atualizacao = now;

    if (this.validarProduto()) {
      this.produtoService.salvar(this.fornecedorId, this.produto).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Produto cadastrado com sucesso!',
          });
          this.resetarFormulario();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao cadastrar produto',
          });
          console.error('Erro:', error);
        },
      });
    }
  }

  validarProduto(): boolean {
    if (
      !this.produto.nome ||
      !this.produto.descricao ||
      !this.produto.validade
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Preencha todos os campos obrigatórios',
      });
      return false;
    }
    return true;
  }

  calcularMargemLucro(): void {
    const { custo, preco } = this.produto;
    if (custo !== null && preco !== null && preco > 0) {
      this.margemLucro = ((preco - custo) / preco) * 100;
    } else {
      this.margemLucro = 0;
    }
  }

  resetarFormulario(): void {
    const newNow = new Date();
    newNow.setHours(newNow.getHours() - 3);
    this.produto = {
      id: null,
      nome: '',
      descricao: '',
      quantidade: 0,
      atualizacao: newNow,
      validade: new Date(),
      custo: 0.0,
      preco: 0.0,
      margemLucro: 0.0,
      fornecedorId: this.fornecedorId,
    };
    this.margemLucro = 0;
  }
}
