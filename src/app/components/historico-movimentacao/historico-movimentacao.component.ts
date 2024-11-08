import { Component, OnInit } from '@angular/core';
import { Produto, ProdutoService } from '../../services/produto.service';
import {
  Movimentacao,
  MovimentacaoService,
} from '../../services/movimentacao.service';

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
export class HistoricoMovimentacaoComponent {
  public movimentacoes: Movimentacao[] = [];

  constructor(
    private movimentacaoService: MovimentacaoService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.carregarHistoricoMovimentacoes();
  }

  carregarHistoricoMovimentacoes(): void {
    this.movimentacaoService.listarTodas().subscribe((movimentacoes) => {
      console.log('Dados recebidos:', movimentacoes); // Adiciona log para verificar os dados
      this.movimentacoes = movimentacoes; // Atualiza a variável movimentacoes com os dados recebidos
    });
  }
}
