import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { TaskActionTypes, AddTask } from './task.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  loadTasks$ = this.actions$.pipe(
    ofType<AddTask>(TaskActionTypes.UpdateTask),
    map(x => console.log(x.payload.taskName))
  );
}
