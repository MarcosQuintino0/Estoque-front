import { Component, OnInit } from '@angular/core';
import { Produto, ProdutoService } from '../../services/produto.service';
import {
  Movimentacao,
  MovimentacaoService,
} from '../../services/movimentacao.service';
import { ActivatedRoute, Router } from '@angular/router';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-historico-movimentacao',
  standalone: false,
  templateUrl: './historico-movimentacao.component.html',
  styleUrl: './historico-movimentacao.component.css',
})
export class HistoricoMovimentacaoComponent implements OnInit {
  public movimentacoes: Movimentacao[] = [];
  fornecedorId: number;

  constructor(
    private movimentacaoService: MovimentacaoService,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fornecedorId = Number(
      this.route.snapshot.paramMap.get('fornecedorId')
    );

    if (!this.fornecedorId) {
      alert('Fornecedor não identificado');
      this.router.navigate(['/fornecedores']);
      return;
    }

    this.carregarHistoricoMovimentacoes();
  }

  carregarHistoricoMovimentacoes(): void {
    this.movimentacaoService.listarPorFornecedor(this.fornecedorId).subscribe({
      next: (movimentacoes) => {
        console.log('Movimentações recebidas:', movimentacoes);
        this.movimentacoes = movimentacoes;
      },
      error: (error) => {
        console.error('Erro ao carregar movimentações:', error);
        alert('Erro ao carregar histórico de movimentações.');
      },
    });
  }
}
