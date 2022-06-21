import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs'
import { isNullOrUndefined } from '../../../utils/utils'
import { BetsSingleFormService } from '../../data-access/bets-single/bets-single-form.service'
import { BetsSingleService } from '../../data-access/bets-single/bets-single.service'
import { BetSingle } from '../../models/bets-single/bets-single.model'

@Component({
  selector: 'dzikimundial-ws-bet-single',
  templateUrl: './bet-single.component.html',
  styleUrls: ['./bet-single.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BetSingleComponent implements OnChanges, OnInit {
  @Input() single!: BetSingle

  public singleBetsLoading$!: Observable<string[]>
  public singleFormGroup!: FormGroup
  public isSingleBetSaved = false

  get homeGoals(): FormControl {
    return this.singleFormGroup.controls?.homeGoals as FormControl
  }

  get awayGoals(): FormControl {
    return this.singleFormGroup.controls?.awayGoals as FormControl
  }

  constructor(
    private betsSingleFormService: BetsSingleFormService,
    private betsSingleService: BetsSingleService,
    private toastr: ToastrService,
  ) {
    this.createEmptySingleFormGroup()
  }

  ngOnInit(): void {
    this.singleBetsLoading$ = this.betsSingleService.singleBetsLoading$
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.single?.currentValue) {
      const homeGoals: number = changes?.single?.currentValue?.homeGoals
      const awayGoals: number = changes?.single?.currentValue?.awayGoals

      if (!isNullOrUndefined(homeGoals) && !isNullOrUndefined(awayGoals)) {
        this.isSingleBetSaved = true
      }
    }
  }

  public saveBet(): void {
    this.singleFormGroup.markAllAsTouched()

    if (this.singleFormGroup.invalid) {
      this.toastr.error('An error occured because form is not valid', 'Ouups! 😥')
      return
    }

    const { homeGoals, awayGoals } = this.singleFormGroup.getRawValue()

    this.betsSingleService.saveSingle(this.single, homeGoals, awayGoals)
  }

  private createEmptySingleFormGroup(): void {
    this.singleFormGroup = this.betsSingleFormService.createEmptySingleGoalsBetForm()
  }
}
