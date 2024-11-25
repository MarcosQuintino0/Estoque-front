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
import { LoginComponent } from './components/login/login.component';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordModule } from 'primeng/password';

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
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToastModule,
    DropdownModule,
    TagModule,
    MessagesModule,
    CardModule,
    MenuModule,
    PasswordModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
