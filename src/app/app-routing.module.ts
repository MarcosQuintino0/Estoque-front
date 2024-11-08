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

const routes: Routes = [
  { path: '', component: TelaInicioComponent },
  { path: 'cadastro-produto', component: CadastroProdutoComponent },
  { path: 'fornecedores', component: FornecedorListaComponent },
  { path: 'cadastro-fornecedor', component: FornecedorCadastroComponent },
  { path: 'editar-fornecedor/:id', component: FornecedorEdicaoComponent },
  {
    path: 'atualizacao-quantidade/:id',
    component: AtualizacaoQuantidadeComponent,
  },
  { path: 'relatorios-inventario', component: RelatoriosInventarioComponent },
  { path: 'historico-movimentacao', component: HistoricoMovimentacaoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
