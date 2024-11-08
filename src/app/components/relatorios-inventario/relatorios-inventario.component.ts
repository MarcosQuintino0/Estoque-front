import { Component, OnInit } from '@angular/core';
import { Produto, ProdutoService } from '../../services/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-relatorios-inventario',
  standalone: false,
  templateUrl: './relatorios-inventario.component.html',
  styleUrl: './relatorios-inventario.component.css',
})
export class RelatoriosInventarioComponent implements OnInit {
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  filtroNome: string = '';
  filtroStatus: string = '';

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit(): void {
    this.listarTodosProdutos();
  }

  listarTodosProdutos(): void {
    this.produtoService.listarTodos().subscribe(
      (produtos) => {
        this.produtos = produtos;
        this.produtosFiltrados = produtos;
      },
      (error) => {
        console.error('Erro ao listar produtos:', error);
        alert('Erro ao carregar o relatório de inventário.');
      }
    );
  }

  obterStatusEstoque(quantidade: number): string {
    if (quantidade === 0) {
      return 'Sem Estoque';
    } else if (quantidade < 10) {
      return 'Baixo Estoque';
    } else {
      return 'Em Estoque';
    }
  }

  filtrarProdutos(): void {
    this.produtosFiltrados = this.produtos.filter((produto) => {
      const nomeCorresponde = produto.nome
        .toLowerCase()
        .includes(this.filtroNome.toLowerCase());
      const statusCorresponde =
        this.filtroStatus === '' ||
        this.obterStatusEstoque(produto.quantidade) === this.filtroStatus;

      return nomeCorresponde && statusCorresponde;
    });
  }

  editarProduto(id: number): void {
    this.router.navigate([`/atualizacao-quantidade/${id}`]);
  }

  excluirProduto(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.deletar(id).subscribe(
        () => {
          alert('Produto excluído com sucesso!');
          this.listarTodosProdutos();
        },
        (error) => {
          console.error('Erro ao excluir produto:', error);
          alert('Erro ao excluir o produto.');
        }
      );
    }
  }

  obterCorEstoque(quantidade: number): 'success' | 'warning' | 'danger' {
    if (quantidade === 0) {
      return 'danger';
    } else if (quantidade < 10) {
      return 'warning';
    } else {
      return 'success';
    }
  }

  obterStatusValidade(validade: Date): string {
    const hoje = new Date();
    const diasRestantes = Math.ceil(
      (new Date(validade).getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diasRestantes < 0) {
      return 'Vencido';
    } else if (diasRestantes <= 7) {
      return 'Próximo do Vencimento';
    } else {
      return 'Dentro da Validade';
    }
  }

  obterCorValidade(validade: Date): 'success' | 'warning' | 'danger' {
    const status = this.obterStatusValidade(validade);
    if (status === 'Vencido') {
      return 'danger';
    } else if (status === 'Próximo do Vencimento') {
      return 'warning';
    } else {
      return 'success';
    }
  }
}
