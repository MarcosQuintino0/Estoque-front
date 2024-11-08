import { Component } from '@angular/core';
import { Produto, ProdutoService } from '../../services/produto.service';
import { MovimentacaoService } from '../../services/movimentacao.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-atualizacao-quantidade',
  standalone: false,
  templateUrl: './atualizacao-quantidade.component.html',
  styleUrl: './atualizacao-quantidade.component.css',
})
export class AtualizacaoQuantidadeComponent {
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
  };

  constructor(
    private produtoService: ProdutoService,
    private movimentacaoService: MovimentacaoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.buscarProduto(id);
    }
  }

  buscarProduto(id: number): void {
    this.produtoService.buscarPorId(id).subscribe(
      (produto) => {
        this.produto = produto;
      },
      (error) => {
        console.error('Erro ao buscar produto:', error);
        alert('Erro ao carregar o produto.');
        this.router.navigate(['/relatorios-inventario']);
      }
    );
  }

  atualizarQuantidade(): void {
    const now = new Date();
    now.setHours(now.getHours() - 3);

    if (this.produto.quantidade !== null && this.produto.quantidade >= 0) {
      // Registra a movimentação antes de atualizar o produto
      this.movimentacaoService
        .registrarSaida(this.produto.id!, this.produto.quantidade)
        .subscribe(
          () => {
            const produtoAtualizado = {
              ...this.produto,
              atualizacao: now,
            };

            this.produtoService
              .atualizar(this.produto.id!, produtoAtualizado)
              .subscribe(
                () => {
                  alert('Quantidade atualizada com sucesso!');
                  this.router.navigate(['/relatorios-inventario']);
                },
                (error) => {
                  console.error('Erro ao atualizar o produto:', error);
                  alert('Erro ao atualizar o produto.');
                }
              );
          },
          (error) => {
            console.error('Erro ao registrar movimentação:', error);
            alert('Erro ao registrar a movimentação.');
          }
        );
    }
  }
}
