import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdvCardProductComponent } from './pdv-card-product.component';

describe('PdvCardProductComponent', () => {
  let component: PdvCardProductComponent;
  let fixture: ComponentFixture<PdvCardProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdvCardProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdvCardProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
