import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiNavLinkComponent } from './ui-nav-link.component';

describe('UiNavLinkComponent', () => {
  let component: UiNavLinkComponent;
  let fixture: ComponentFixture<UiNavLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiNavLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiNavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
