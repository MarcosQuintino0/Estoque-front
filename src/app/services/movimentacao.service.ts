import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Movimentacao {
  id: number;
  produtoId: number;
  nomeProduto: String;
  quantidadeAlterada: number;
  dataMovimentacao: Date;
  tipoMovimentacao: string; // "ENTRADA" ou "SAIDA"
}

@Injectable({
  providedIn: 'root',
})
export class MovimentacaoService {
  private apiUrl = 'http://localhost:8080/movimentacoes';

  constructor(private http: HttpClient) {}

  // Listar todas as movimentacoes
  listarTodas(): Observable<Movimentacao[]> {
    return this.http.get<Movimentacao[]>(`${this.apiUrl}/listar-todas`);
  }

  // Registrar uma saida de produto
  registrarSaida(
    produtoId: number,
    novaQuantidade: number
  ): Observable<Movimentacao> {
    const params = new HttpParams()
      .set('produtoId', produtoId.toString())
      .set('novaQuantidade', novaQuantidade.toString());
    return this.http.post<Movimentacao>(
      `${this.apiUrl}/registrar-saida`,
      null,
      { params }
    );
  }
}
