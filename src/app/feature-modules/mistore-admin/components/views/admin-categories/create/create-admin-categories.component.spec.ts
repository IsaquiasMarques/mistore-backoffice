import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminCategoriesComponent } from './create-admin-categories.component';

describe('CreateAdminCategoriesComponent', () => {
  let component: CreateAdminCategoriesComponent;
  let fixture: ComponentFixture<CreateAdminCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAdminCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAdminCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
