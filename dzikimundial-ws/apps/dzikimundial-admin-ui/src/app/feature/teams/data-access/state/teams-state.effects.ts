import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { CreateTeamResponse, GetTeamListResponse } from '@dzikimundial-ws/api-interfaces'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { fetch } from '@nrwl/angular'
import { ROUTER_LINK } from '../../../../models/route-links.model'
import { mergeMap, switchMap, catchError, of, withLatestFrom, tap } from 'rxjs'
import { TeamRestService } from '../team.rest.service'
import { TeamsRestService } from '../teams.rest.service'

import * as TeamsStateActions from './teams-state.actions'
import { TeamsStateEntity } from './teams-state.models'

@Injectable()
export class TeamsStateEffects {
  constructor(
    private readonly actions$: Actions,
    private teamsRestService: TeamsRestService,
    private teamRestService: TeamRestService,
    private store: Store<TeamsStateEntity>,
    private router: Router
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamsStateActions.init),
      fetch({
        run: () => {
          return TeamsStateActions.loadTeamsStateSuccess({ teamsState: [] })
        },
        onError: (action, error) => {
          console.error('Error', error)
          return TeamsStateActions.loadTeamsStateFailure({ error })
        },
      }),
    ),
  )

  fetchTeamList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamsStateActions.fetchTeamList),
      withLatestFrom(this.store),
      switchMap(([action, storeState]) => {
        const pageNumber =
          action.pageNumber !== null && action.pageNumber !== undefined
            ? action.pageNumber
            : storeState.pageNumber
            ? storeState.pageNumber
            : 0
        const pageSize =
          action.pageSize !== null && action.pageSize !== undefined
            ? action.pageSize
            : storeState.pageSize
            ? storeState.pageSize
            : 100
        return this.teamsRestService.fetchTeamList(pageNumber, pageSize).pipe(
          switchMap((resp: GetTeamListResponse) => {
            return [TeamsStateActions.fetchTeamListSuccess({ resp })]
          }),
          catchError((error: string) => {
            return of(TeamsStateActions.fetchTeamListFailure({ error: error }))
          }),
        )
      }),
    ),
  )

  createTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamsStateActions.createTeam),
      mergeMap((action) => {
        return this.teamRestService.createTeam(action.req).pipe(
          switchMap((resp: CreateTeamResponse) => {
            return [TeamsStateActions.createTeamSuccess({ resp }), TeamsStateActions.fetchTeamList({})]
          }),
          catchError((error: string) => of(TeamsStateActions.createTeamFailure({ error }))),
        )
      }),
    ),
  )

  createTeamSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TeamsStateActions.createTeamSuccess),
        tap(() => {
          this.router.navigate([ROUTER_LINK.PREV_RELATIVE_TO_PARENT])
        }),
        
      ),
    { dispatch: false },
  )
}
