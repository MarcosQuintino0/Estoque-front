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

    if (!this.produto.nome.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O nome do produto é obrigatório',
      });
      return;
    }

    if (!this.produto.validade) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'A data de validade é obrigatória',
      });
      return;
    }

    if (this.produto.quantidade <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'A quantidade deve ser maior que zero',
      });
      return;
    }

    if (this.produto.custo <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O custo deve ser maior que zero',
      });
      return;
    }

    if (this.produto.preco <= this.produto.custo) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O preço deve ser maior que o custo',
      });
      return;
    }

    if (this.produto.margemLucro <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'A margem de lucro deve ser maior que zero',
      });
      return;
    }

    this.produtoService.salvar(this.fornecedorId, this.produto).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto cadastrado com sucesso!',
        });
        this.resetarFormulario();
      },
    });
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

  validarCampo(campo: string): void {
    switch (campo) {
      case 'nome':
        if (!this.produto.nome.trim()) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Atenção',
            detail: 'O nome do produto é obrigatório',
          });
        }
        break;

      case 'descricao':
        if (!this.produto.descricao.trim()) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Atenção',
            detail: 'A descrição do produto é obrigatória',
          });
        }
        break;

      case 'validade':
        if (!this.produto.validade) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Atenção',
            detail: 'A data de validade é obrigatória',
          });
        }
        break;

      case 'quantidade':
        if (this.produto.quantidade <= 0) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Atenção',
            detail: 'A quantidade deve ser maior que zero',
          });
        }
        break;

      case 'custo':
        if (this.produto.custo <= 0) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Atenção',
            detail: 'O custo deve ser maior que zero',
          });
        }
        break;
    }
  }

  validarPrecoECalcularMargem(): void {
    if (this.produto.preco <= this.produto.custo) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'O preço deve ser maior que o custo',
      });
      return;
    }
    this.calcularMargemLucro();
  }

  calcularMargemLucro(): void {
    const { custo, preco } = this.produto;
    if (custo > 0 && preco > custo) {
      this.margemLucro = ((preco - custo) / preco) * 100;
      this.produto.margemLucro = this.margemLucro;
    } else {
      this.margemLucro = 0;
      this.produto.margemLucro = 0;
    }
  }
}
