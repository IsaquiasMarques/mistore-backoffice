import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HzBarComponent } from './hz-bar.component';

describe('HzBarComponent', () => {
  let component: HzBarComponent;
  let fixture: ComponentFixture<HzBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HzBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HzBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
