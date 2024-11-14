import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminStoresComponent } from './create-admin-stores.component';

describe('CreateAdminStoresComponent', () => {
  let component: CreateAdminStoresComponent;
  let fixture: ComponentFixture<CreateAdminStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAdminStoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAdminStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
