import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser'
import { UiFlagComponent } from './ui-flag.component';

describe('UiFlagComponent', () => {
  let component: UiFlagComponent;
  let fixture: ComponentFixture<UiFlagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiFlagComponent ]
    })
    .overrideComponent(UiFlagComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
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

  it('should display a flag with default decription', () => {
    // given
    component.url = 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/33px-Flag_of_France.svg.png'
    fixture.detectChanges()
    const image: HTMLImageElement = fixture.debugElement.query(
      By.css('img[data-test-id="flag-img"]'),
    ).nativeElement

    // when

    // then
    expect(image).toBeDefined()
    expect(image.src).toEqual('https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/33px-Flag_of_France.svg.png')
    expect(image.alt).toEqual('default description')
  })

  it('should display a flag with decription', () => {
    // given
    component.url = 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/33px-Flag_of_France.svg.png'
    component.description = 'France'
    fixture.detectChanges()
    const image: HTMLImageElement = fixture.debugElement.query(
      By.css('img[data-test-id="flag-img"]'),
    ).nativeElement

    // when

    // then
    expect(image).toBeDefined()
    expect(image.src).toEqual('https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/33px-Flag_of_France.svg.png')
    expect(image.alt).toContain('France')
  })
});
