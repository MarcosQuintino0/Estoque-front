import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorEdicaoComponent } from './fornecedor-edicao.component';

describe('FornecedorEdicaoComponent', () => {
  let component: FornecedorEdicaoComponent;
  let fixture: ComponentFixture<FornecedorEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FornecedorEdicaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FornecedorEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
