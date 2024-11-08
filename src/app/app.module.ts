import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// PrimeNG modules
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

import { TelaInicioComponent } from './components/tela-inicio/tela-inicio.component';
import { CadastroProdutoComponent } from './components/cadastro-produto/cadastro-produto.component';
import { AtualizacaoQuantidadeComponent } from './components/atualizacao-quantidade/atualizacao-quantidade.component';
import { RelatoriosInventarioComponent } from './components/relatorios-inventario/relatorios-inventario.component';
import { HistoricoMovimentacaoComponent } from './components/historico-movimentacao/historico-movimentacao.component';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { FornecedorCadastroComponent } from './components/fornecedor-cadastro/fornecedor-cadastro.component';
import { FornecedorListaComponent } from './components/fornecedor-lista/fornecedor-lista.component';
import { FornecedorEdicaoComponent } from './components/fornecedor-edicao/fornecedor-edicao.component';

@NgModule({
  declarations: [
    AppComponent,
    TelaInicioComponent,
    CadastroProdutoComponent,
    AtualizacaoQuantidadeComponent,
    RelatoriosInventarioComponent,
    HistoricoMovimentacaoComponent,
    FornecedorCadastroComponent,
    FornecedorListaComponent,
    FornecedorEdicaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToastModule,
    DropdownModule,
    TagModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
