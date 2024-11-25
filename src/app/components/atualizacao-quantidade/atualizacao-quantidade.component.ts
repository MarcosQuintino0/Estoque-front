import { Component, OnInit } from '@angular/core';
import { Produto, ProdutoService } from '../../services/produto.service';
import { MovimentacaoService } from '../../services/movimentacao.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-atualizacao-quantidade',
  standalone: false,
  templateUrl: './atualizacao-quantidade.component.html',
  styleUrl: './atualizacao-quantidade.component.css',
})
export class AtualizacaoQuantidadeComponent implements OnInit {
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

  fornecedorId: number;

  constructor(
    private produtoService: ProdutoService,
    private movimentacaoService: MovimentacaoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fornecedorId = Number(
      this.route.snapshot.paramMap.get('fornecedorId')
    );
    const produtoId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.fornecedorId) {
      alert('Fornecedor não identificado');
      this.router.navigate(['/fornecedores']);
      return;
    }

    if (produtoId) {
      this.buscarProduto(produtoId);
    }
  }

  buscarProduto(produtoId: number): void {
    this.produtoService.buscarPorId(this.fornecedorId, produtoId).subscribe({
      next: (produto) => {
        this.produto = produto;
      },
      error: (error) => {
        console.error('Erro ao buscar produto:', error);
        alert('Erro ao carregar o produto.');
        this.router.navigate([`/${this.fornecedorId}/relatorios-inventario`]);
      },
    });
  }

  atualizarQuantidade(): void {
    const now = new Date();
    now.setHours(now.getHours() - 3);

    if (this.produto.quantidade !== null && this.produto.quantidade >= 0) {
      // Registra a movimentação com o fornecedorId
      this.movimentacaoService
        .registrarMovimentacao(
          this.fornecedorId,
          this.produto.id!,
          this.produto.quantidade
        )
        .subscribe({
          next: () => {
            const produtoAtualizado = {
              ...this.produto,
              atualizacao: now,
            };

            this.produtoService
              .atualizar(this.fornecedorId, this.produto.id!, produtoAtualizado)
              .subscribe({
                next: () => {
                  alert('Quantidade atualizada com sucesso!');
                  this.router.navigate([
                    `/${this.fornecedorId}/relatorios-inventario`,
                  ]);
                },
                error: (error) => {
                  console.error('Erro ao atualizar o produto:', error);
                  alert('Erro ao atualizar o produto.');
                },
              });
          },
          error: (error) => {
            console.error('Erro ao registrar movimentação:', error);
            alert('Erro ao registrar a movimentação.');
          },
        });
    }
  }
}
