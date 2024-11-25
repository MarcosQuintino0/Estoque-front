import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Fornecedor {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: string;
}
@Injectable({
  providedIn: 'root',
})
export class FornecedorService {
  private apiUrl = `http://localhost:8080/api/fornecedores`;

  constructor(private http: HttpClient) {}

  getFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.apiUrl);
  }

  getFornecedorById(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.apiUrl}/${id}`);
  }

  criarFornecedor(fornecedor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastro`, fornecedor);
  }

  login(loginData: { email: string; senha: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  atualizarFornecedor(
    id: number,
    fornecedor: Fornecedor
  ): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(`${this.apiUrl}/${id}`, fornecedor);
  }

  deletarFornecedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
