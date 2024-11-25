import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Movimentacao {
  id: number;
  fornecedorId: number;
  produtoId: number;
  nomeProduto: string;
  quantidadeAlterada: number;
  dataMovimentacao: Date;
  tipoMovimentacao: string;
}

@Injectable({
  providedIn: 'root',
})
export class MovimentacaoService {
  private apiUrl = 'http://localhost:8080/api/fornecedores';

  constructor(private http: HttpClient) {}

  listarPorFornecedor(fornecedorId: number): Observable<Movimentacao[]> {
    return this.http.get<Movimentacao[]>(
      `${this.apiUrl}/${fornecedorId}/movimentacoes`
    );
  }

  registrarMovimentacao(
    fornecedorId: number,
    produtoId: number,
    novaQuantidade: number
  ): Observable<Movimentacao> {
    const params = new HttpParams()
      .set('produtoId', produtoId.toString())
      .set('novaQuantidade', novaQuantidade.toString());
    return this.http.post<Movimentacao>(
      `${this.apiUrl}/${fornecedorId}/movimentacoes/registrar`,
      null,
      { params }
    );
  }
}
