import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromActions from './task.actions';
import { State, selectActiveTask } from './reducers';
import { Store, select } from '@ngrx/store';
import {
  withLatestFrom,
  mergeMap,
  mapTo,
  concatMap,
  takeUntil,
  switchMap,
} from 'rxjs/operators';
import { timer } from 'rxjs';
@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private store: Store<State>) {}

  @Effect()
  public performTick$ = this.actions$.pipe(
    ofType<fromActions.PerformTick>(fromActions.TaskActionTypes.PerformTick),
    withLatestFrom(this.store.pipe(select(selectActiveTask))),
    switchMap(([_, currTask]) =>
      timer(1000).pipe(
        takeUntil(
          this.actions$.pipe(ofType(fromActions.TaskActionTypes.PauseTask))
        ),
        mergeMap(() => [
          new fromActions.SetTaskElapsedSeconds({
            taskId: currTask.id,
            elapsedSeconds: currTask.elapsedSeconds + 1,
          }),
          new fromActions.PerformTick(),
        ])
      )
    )
  );
  @Effect()
  public pauseTask$ = this.actions$.pipe(
    ofType<fromActions.PauseTask>(fromActions.TaskActionTypes.PauseTask),
    mapTo(new fromActions.ChangeActiveTaskId({ taskId: undefined }))
  );

  @Effect()
  public playTask$ = this.actions$.pipe(
    ofType<fromActions.PlayTask>(fromActions.TaskActionTypes.PlayTask),
    concatMap(x => [
      new fromActions.ChangeActiveTaskId({ taskId: x.payload.taskId }),
      new fromActions.PerformTick(),
    ])
  );
}
