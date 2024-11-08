import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizacaoQuantidadeComponent } from './atualizacao-quantidade.component';

describe('AtualizacaoQuantidadeComponent', () => {
  let component: AtualizacaoQuantidadeComponent;
  let fixture: ComponentFixture<AtualizacaoQuantidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtualizacaoQuantidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtualizacaoQuantidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
