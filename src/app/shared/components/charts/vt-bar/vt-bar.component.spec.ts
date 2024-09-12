import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VtBarComponent } from './vt-bar.component';

describe('VtBarComponent', () => {
  let component: VtBarComponent;
  let fixture: ComponentFixture<VtBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VtBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VtBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
