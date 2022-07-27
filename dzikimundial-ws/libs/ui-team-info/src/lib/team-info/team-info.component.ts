import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core'
import { Team } from '@dzikimundial-ws/api-interfaces'

@Component({
  selector: 'dzikimundial-ws-ui-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class UiTeamInfoComponent implements AfterViewInit {
  @Input() team!: Team
  @Input() isReversed = false

  @ViewChild('nameParagraph', { static: false }) paragraphNameRef!: ElementRef<HTMLParagraphElement>

  public isEllipsisActive = false

  ngAfterViewInit(): void {
    // ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.isEllipsisActive = this.checkEllipsisActive(this.paragraphNameRef)
    }, 0)
  }

  private checkEllipsisActive(ref: ElementRef<HTMLParagraphElement>): boolean {
    return ref ? ref.nativeElement.offsetWidth < ref.nativeElement.scrollWidth : false
  }
}
