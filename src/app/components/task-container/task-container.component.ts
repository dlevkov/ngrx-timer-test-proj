import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Task } from 'src/app/task.model';
import { Store, select } from '@ngrx/store';
import * as fromReducer from 'src/app/reducers/';
import * as fromAction from 'src/app/task.actions';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskContainerComponent implements OnInit, OnDestroy {
  public tasks$: Observable<Task[]>;
  public totalTime$: Observable<number>;
  public activeTaskId: string;

  private subscription: Subscription;
  constructor(private store: Store<fromReducer.State>) {}

  ngOnInit() {
    this.subscription = this.store
      .pipe(select(fromReducer.selectActiveTaskId))
      .subscribe(id => {
        this.activeTaskId = id;
      });
    this.tasks$ = this.store.pipe(select(fromReducer.selectAllTasks));
    this.totalTime$ = this.store.pipe(
      select(fromReducer.selectTotalElapsedSeconds)
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  public onClick(evt: Task) {
    if (this.givenTaskIsActive(evt.id)) {
      this.store.dispatch(new fromAction.PauseTask({ taskId: evt.id }));
    } else {
      this.store.dispatch(new fromAction.PlayTask({ taskId: evt.id }));
    }
  }
  public trackByFn(index, item: Task) {
    return item && item.id;
  }
  public givenTaskIsActive(id: string) {
    return id === this.activeTaskId;
  }
}
