import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosInventarioComponent } from './relatorios-inventario.component';

describe('RelatoriosInventarioComponent', () => {
  let component: RelatoriosInventarioComponent;
  let fixture: ComponentFixture<RelatoriosInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatoriosInventarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatoriosInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
