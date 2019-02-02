import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/task.model';
import { Store, select } from '@ngrx/store';
import * as fromReducer from 'src/app/reducers/';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskContainerComponent implements OnInit {
  public tasks$;
  public totalTime$: Observable<number>;
  constructor(private store: Store<fromReducer.State>) {}

  ngOnInit() {
    this.tasks$ = this.store.pipe(select(fromReducer.getAllTasks));
    this.totalTime$ = this.store.pipe(select(fromReducer.getTotal));

  }

  public onClick(evt: Task) {
    // this.service.updateTask(evt);
  }
}
