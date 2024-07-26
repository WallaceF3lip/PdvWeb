import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFluxControlComponent } from './page-flux-control.component';

describe('PageFluxControlComponent', () => {
  let component: PageFluxControlComponent;
  let fixture: ComponentFixture<PageFluxControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageFluxControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFluxControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
