import { async, TestBed } from '@angular/core/testing'
import { BetsSinglesService } from './bets-singles.service'

describe('BetsSinglesService', () => {
  let service: BetsSinglesService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [BetsSinglesService],
    }).compileComponents()
  }))
  beforeEach(() => {
    service = TestBed.get(BetsSinglesService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
