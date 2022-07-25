import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiProgressBarComponent } from './ui-progress-bar.component';

describe('UiProgressBarComponent', () => {
  let component: UiProgressBarComponent;
  let fixture: ComponentFixture<UiProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiProgressBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
