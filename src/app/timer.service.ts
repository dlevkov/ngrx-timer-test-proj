import { Injectable } from '@angular/core';
import { State } from './store/reducers';
import { Store, select } from '@ngrx/store';
import * as fromReducer from './store/reducers';
import {
  tap,
  filter,
  takeUntil,
  map,
  switchAll,
  switchMap,
} from 'rxjs/operators';
import { Observable, interval, Subject, NEVER } from 'rxjs';
import { Task } from './store/task.model';
import * as fromActions from './store/task.actions';
@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private activeTask: Observable<Task>;
  private timer$ = interval(1000);
  private doJob = new Subject<Task>();
  private pause$ = new Subject<boolean>();
  constructor(private store: Store<State>) {
    this.activeTask = this.store.pipe(select(fromReducer.selectActiveTask));
  }
  initTimer(): any {
    this.activeTask.pipe(filter(task => !!task)).subscribe(task => {
      this.startTimer(task);
      console.log('start');
    });
    this.activeTask.pipe(filter(task => !task)).subscribe(_ => {
      this.pauseTimer();
      console.log('paused');
    });
    this.doJob.subscribe(task => {
      this.dispatchTick(task);
    });
  }
  startTimer(task: Task) {
    this.timer$
      .pipe(
        tap(x => console.log(x)),
        takeUntil(this.pause$),
        tap(x => this.doJob.next(task))
      )
      .subscribe();
  }
  pauseTimer() {
    this.pause$.next(false);
  }
  dispatchTick(task: Task) {
    this.store.dispatch(
      new fromActions.SetTaskElapsedSeconds({
        taskId: task.id,
        elapsedSeconds: task.elapsedSeconds = task.elapsedSeconds + 1,
      })
    );
  }
}
