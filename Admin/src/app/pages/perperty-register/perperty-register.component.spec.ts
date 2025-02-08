import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerpertyRegisterComponent } from './perperty-register.component';

describe('PerpertyRegisterComponent', () => {
  let component: PerpertyRegisterComponent;
  let fixture: ComponentFixture<PerpertyRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerpertyRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerpertyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
