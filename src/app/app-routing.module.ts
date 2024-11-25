import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaInicioComponent } from './components/tela-inicio/tela-inicio.component';
import { CadastroProdutoComponent } from './components/cadastro-produto/cadastro-produto.component';
import { AtualizacaoQuantidadeComponent } from './components/atualizacao-quantidade/atualizacao-quantidade.component';
import { RelatoriosInventarioComponent } from './components/relatorios-inventario/relatorios-inventario.component';
import { HistoricoMovimentacaoComponent } from './components/historico-movimentacao/historico-movimentacao.component';
import { FornecedorCadastroComponent } from './components/fornecedor-cadastro/fornecedor-cadastro.component';
import { FornecedorListaComponent } from './components/fornecedor-lista/fornecedor-lista.component';
import { FornecedorEdicaoComponent } from './components/fornecedor-edicao/fornecedor-edicao.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro-fornecedor', component: FornecedorCadastroComponent },
  {
    path: ':fornecedorId',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: TelaInicioComponent },
      {
        path: 'relatorios-inventario',
        component: RelatoriosInventarioComponent,
      },
      { path: 'cadastro-produto', component: CadastroProdutoComponent },
      {
        path: 'atualizacao-quantidade/:id',
        component: AtualizacaoQuantidadeComponent,
      },
      {
        path: 'historico-movimentacao',
        component: HistoricoMovimentacaoComponent,
      },
      { path: 'editar-perfil', component: FornecedorEdicaoComponent },
      // Redireciona qualquer rota não encontrada dentro da área do fornecedor para a tela inicial
      { path: '**', redirectTo: '' },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // Redireciona qualquer outra rota não encontrada para login
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
