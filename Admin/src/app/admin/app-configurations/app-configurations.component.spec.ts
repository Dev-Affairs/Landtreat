import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConfigurationsComponent } from './app-configurations.component';

describe('AppConfigurationsComponent', () => {
  let component: AppConfigurationsComponent;
  let fixture: ComponentFixture<AppConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppConfigurationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
