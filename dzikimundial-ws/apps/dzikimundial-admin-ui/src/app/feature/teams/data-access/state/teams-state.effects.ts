import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import {
  CreateTeamResponse,
  DeleteResult,
  generateDefaultListQuery,
  GetTeamListResponse,
  GetTeamResponse,
  UpdateTeamResponse,
} from '@dzikimundial-ws/api-interfaces'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { fetch } from '@nrwl/angular'
import { ROUTER_LINK } from '../../../../models/route-links.model'
import { mergeMap, switchMap, catchError, of, withLatestFrom, tap } from 'rxjs'
import { TeamRestService } from '../team.rest.service'
import { TeamsRestService } from '../teams.rest.service'

import * as TeamsStateActions from './teams-state.actions'
import { TeamsStateEntity } from './teams-state.models'
import { ToastrService } from 'ngx-toastr'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { isDefined } from 'libs/utils/src/lib/is-defined'

@Injectable()
export class TeamsStateEffects {
  constructor(
    private readonly actions$: Actions,
    private teamsRestService: TeamsRestService,
    private teamRestService: TeamRestService,
    private store: Store<TeamsStateEntity>,
    private router: Router,
    private toastr: ToastrService,
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
        const listQuery = isDefined(action.listQuery)
          ? action.listQuery
          : storeState.teamsListQuery
          ? storeState.teamsListQuery
          : generateDefaultListQuery()

        return this.teamsRestService.fetchTeamList(listQuery).pipe(
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

  updateTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamsStateActions.updateTeam),
      mergeMap((action) => {
        return this.teamRestService.updateTeam(action.id, action.req).pipe(
          switchMap((resp: UpdateTeamResponse) => {
            return [TeamsStateActions.updateTeamSuccess({ resp })]
          }),
          catchError((error: string) => of(TeamsStateActions.updateTeamFailure({ error }))),
        )
      }),
    ),
  )

  updateTeamSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TeamsStateActions.updateTeamSuccess),
        tap(() => {
          this.toastr.success('team has been updated', 'yea 😎')
        }),
        tap(() => {
          this.router.navigate([ROUTER_LINK.PREV_RELATIVE_TO_PARENT])
        }),
      ),
    { dispatch: false },
  )

  fetchTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamsStateActions.fetchTeam),
      mergeMap((action) => {
        return this.teamRestService.fetchTeam(action.id).pipe(
          switchMap((resp: GetTeamResponse) => {
            return [TeamsStateActions.fetchTeamSuccess({ team: resp })]
          }),
          catchError((error: string) => of(TeamsStateActions.fetchTeamFailure({ error }))),
        )
      }),
    ),
  )

  removeTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamsStateActions.removeTeam),
      mergeMap((action) => {
        return this.teamRestService.removeTeam(action.id).pipe(
          switchMap(() => {
            return [TeamsStateActions.removeTeamSuccess({ id: action.id }), TeamsStateActions.fetchTeamList({})]
          }),
          catchError((error: string) => of(TeamsStateActions.removeTeamFailure({ id: action.id, error }))),
        )
      }),
    ),
  )
}
