import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminSubcategoriesComponent } from './create-admin-subcategories.component';

describe('CreateAdminSubcategoriesComponent', () => {
  let component: CreateAdminSubcategoriesComponent;
  let fixture: ComponentFixture<CreateAdminSubcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAdminSubcategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAdminSubcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
