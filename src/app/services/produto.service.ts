import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Produto {
  id?: number;
  fornecedorId: number;
  nome: string;
  descricao: string;
  quantidade: number;
  atualizacao: Date;
  validade: Date;
  custo: number;
  preco: number;
  margemLucro: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private apiUrl = 'http://localhost:8080/api/fornecedores';

  constructor(private http: HttpClient) {}

  listarTodosPorFornecedor(fornecedorId: number): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/${fornecedorId}/produtos`);
  }

  buscarPorId(fornecedorId: number, produtoId: number): Observable<Produto> {
    return this.http.get<Produto>(
      `${this.apiUrl}/${fornecedorId}/produtos/${produtoId}`
    );
  }

  salvar(fornecedorId: number, produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(
      `${this.apiUrl}/${fornecedorId}/produtos`,
      produto
    );
  }

  atualizar(
    fornecedorId: number,
    produtoId: number,
    produto: Produto
  ): Observable<Produto> {
    return this.http.put<Produto>(
      `${this.apiUrl}/${fornecedorId}/produtos/${produtoId}`,
      produto
    );
  }

  deletar(fornecedorId: number, produtoId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${fornecedorId}/produtos/${produtoId}`
    );
  }
}
