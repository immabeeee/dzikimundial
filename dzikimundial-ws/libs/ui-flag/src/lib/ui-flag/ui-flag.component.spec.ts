import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFlagComponent } from './ui-flag.component';

describe('UiFlagComponent', () => {
  let component: UiFlagComponent;
  let fixture: ComponentFixture<UiFlagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiFlagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
