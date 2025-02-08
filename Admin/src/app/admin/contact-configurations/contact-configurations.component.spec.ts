import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactConfigurationsComponent } from './contact-configurations.component';

describe('ContactConfigurationsComponent', () => {
  let component: ContactConfigurationsComponent;
  let fixture: ComponentFixture<ContactConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactConfigurationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
