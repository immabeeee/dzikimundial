import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiLogoComponent } from './ui-logo.component';

describe('UiLogoComponent', () => {
  let component: UiLogoComponent;
  let fixture: ComponentFixture<UiLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
