import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MistoreAdminComponent } from './mistore-admin.component';

describe('MistoreAdminComponent', () => {
  let component: MistoreAdminComponent;
  let fixture: ComponentFixture<MistoreAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MistoreAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MistoreAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
