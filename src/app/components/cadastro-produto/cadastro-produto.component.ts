import { Component } from '@angular/core';
import { Produto, ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  standalone: false,
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.css',
})
export class CadastroProdutoComponent {
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

  constructor(private produtoService: ProdutoService) {}

  salvarProduto(): void {
    // Ajusta a data para o fuso horário UTC-3 (Brasil)
    const now = new Date();
    now.setHours(now.getHours() - 3);
    this.produto.atualizacao = now; // Define a data de atualização como o horário atual ajustado

    console.log('Produto a ser salvo:', this.produto);

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (this.produto.nome && this.produto.descricao && this.produto.validade) {
      // Salva o produto
      this.produtoService.salvar(this.produto).subscribe(
        (response) => {
          console.log('Produto salvo com sucesso:', response);
          alert('Produto cadastrado com sucesso!');
          this.resetarFormulario();
        },
        (error) => {
          console.error('Erro ao salvar o produto:', error);
          alert('Erro ao salvar o produto.');
        }
      );
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
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
    };
  }
  margemLucro: number = 0;

  calcularMargemLucro(): void {
    const { custo, preco } = this.produto;
    if (custo !== null && preco !== null && preco > 0) {
      this.margemLucro = ((preco - custo) / preco) * 100;
    } else {
      this.margemLucro = 0;
    }
  }
}
