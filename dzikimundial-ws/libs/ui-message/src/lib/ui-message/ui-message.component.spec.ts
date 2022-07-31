import { ChangeDetectionStrategy } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { UiMessageComponent } from './ui-message.component'

describe('UiMessageComponent', () => {
  let component: UiMessageComponent
  let fixture: ComponentFixture<UiMessageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiMessageComponent],
    })
      .overrideComponent(UiMessageComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UiMessageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('display a error message', () => {
    // given
    component.type = 'error'
    component.message = 'lorem ipsum'

    // when
    fixture.detectChanges();
    
    const messageContainer: HTMLElement = fixture.debugElement.query(
      By.css('div[data-test-id="dm-message-container"]'),
    ).nativeElement
    const messageIcon: HTMLElement = fixture.debugElement.query(
      By.css('i[data-test-id="dm-message-icon"]'),
    ).nativeElement
    const messageParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('p[data-test-id="dm-message-message"]'),
    ).nativeElement
    const hideIcon: HTMLElement = fixture.debugElement.query(
      By.css('i[data-test-id="dm-message-remove-icon"]'),
    ).nativeElement

    // then
    expect(messageContainer).toBeDefined()
    expect(messageContainer.classList).toContain('error')
    expect(messageIcon).toBeDefined()
    expect(messageIcon.classList).toContain('gg-smile-sad')
    expect(messageParagraph).toBeDefined()
    expect(messageParagraph.textContent).toBe('lorem ipsum')
    expect(hideIcon).toBeDefined()
    expect(hideIcon.classList).toContain('gg-close')
  })

  it('display a success message', () => {
    // given
    component.type = 'success'
    component.message = 'lorem ipsum'

    // when
    fixture.detectChanges();

    const messageContainer: HTMLElement = fixture.debugElement.query(
      By.css('div[data-test-id="dm-message-container"]'),
    ).nativeElement
    const messageIcon: HTMLElement = fixture.debugElement.query(
      By.css('i[data-test-id="dm-message-icon"]'),
    ).nativeElement
    const messageParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('p[data-test-id="dm-message-message"]'),
    ).nativeElement
    const hideIcon: HTMLElement = fixture.debugElement.query(
      By.css('i[data-test-id="dm-message-remove-icon"]'),
    ).nativeElement

    // then
    expect(messageContainer).toBeDefined()
    expect(messageContainer.classList).toContain('success')
    expect(messageIcon).toBeDefined()
    expect(messageIcon.classList).toContain('gg-smile-mouth-open')
    expect(messageParagraph).toBeDefined()
    expect(messageParagraph.textContent).toBe('lorem ipsum')
    expect(hideIcon).toBeDefined()
    expect(hideIcon.classList).toContain('gg-close')
  })

  it('display a warn message', () => {
    // given
    component.type = 'warn'
    component.message = 'lorem ipsum'

    // when
    fixture.detectChanges();

    const messageContainer: HTMLElement = fixture.debugElement.query(
      By.css('div[data-test-id="dm-message-container"]'),
    ).nativeElement
    const messageIcon: HTMLElement = fixture.debugElement.query(
      By.css('i[data-test-id="dm-message-icon"]'),
    ).nativeElement
    const messageParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('p[data-test-id="dm-message-message"]'),
    ).nativeElement
    const hideIcon: HTMLElement = fixture.debugElement.query(
      By.css('i[data-test-id="dm-message-remove-icon"]'),
    ).nativeElement

    // then
    expect(messageContainer).toBeDefined()
    expect(messageContainer.classList).toContain('warn')
    expect(messageIcon).toBeDefined()
    expect(messageIcon.classList).toContain('gg-smile-no-mouth')
    expect(messageParagraph).toBeDefined()
    expect(messageParagraph.textContent).toBe('lorem ipsum')
    expect(hideIcon).toBeDefined()
    expect(hideIcon.classList).toContain('gg-close')
  })

  it('display a info message', () => {
    // given
    component.type = 'info'
    component.message = 'lorem ipsum'

    // when
    fixture.detectChanges();

    const messageContainer: HTMLElement = fixture.debugElement.query(
      By.css('div[data-test-id="dm-message-container"]'),
    ).nativeElement
    const messageIcon: HTMLElement = fixture.debugElement.query(
      By.css('i[data-test-id="dm-message-icon"]'),
    ).nativeElement
    const messageParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('p[data-test-id="dm-message-message"]'),
    ).nativeElement
    const hideIcon: HTMLElement = fixture.debugElement.query(
      By.css('i[data-test-id="dm-message-remove-icon"]'),
    ).nativeElement

    // then
    expect(messageContainer).toBeDefined()
    expect(messageContainer.classList).toContain('info')
    expect(messageIcon).toBeDefined()
    expect(messageIcon.classList).toContain('gg-smile-none')
    expect(messageParagraph).toBeDefined()
    expect(messageParagraph.textContent).toBe('lorem ipsum')
    expect(hideIcon).toBeDefined()
    expect(hideIcon.classList).toContain('gg-close')
  })

  it('display a primary message', () => {
    // given
    component.type = 'primary'
    component.message = 'lorem ipsum'

    // when
    fixture.detectChanges();

    const messageContainer: HTMLElement = fixture.debugElement.query(
      By.css('div[data-test-id="dm-message-container"]'),
    ).nativeElement
    const messageIcon: HTMLElement = fixture.debugElement.query(
      By.css('i[data-test-id="dm-message-icon"]'),
    ).nativeElement
    const messageParagraph: HTMLParagraphElement = fixture.debugElement.query(
      By.css('p[data-test-id="dm-message-message"]'),
    ).nativeElement
    const hideIcon: HTMLElement = fixture.debugElement.query(
      By.css('i[data-test-id="dm-message-remove-icon"]'),
    ).nativeElement

    // then
    expect(messageContainer).toBeDefined()
    expect(messageContainer.classList).toContain('primary')
    expect(messageIcon).toBeDefined()
    expect(messageIcon.classList).toContain('gg-smile-no-mouth')
    expect(messageParagraph).toBeDefined()
    expect(messageParagraph.textContent).toBe('lorem ipsum')
    expect(hideIcon).toBeDefined()
    expect(hideIcon.classList).toContain('gg-close')
  })
})
