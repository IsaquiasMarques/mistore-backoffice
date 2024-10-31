import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsStatisticsComponent } from './products-statistics.component';

describe('ProductsStatisticsComponent', () => {
  let component: ProductsStatisticsComponent;
  let fixture: ComponentFixture<ProductsStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
