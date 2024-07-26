import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePdvComponent } from './page-pdv.component';

describe('PagePdvComponent', () => {
  let component: PagePdvComponent;
  let fixture: ComponentFixture<PagePdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePdvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
