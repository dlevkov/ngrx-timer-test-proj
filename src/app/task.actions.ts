import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Task } from './task.model';

export enum TaskActionTypes {
  AddTask = '[Task] Add Task',
  UpdateTask = '[Task] Update Task',
}



export class AddTask implements Action {
  readonly type = TaskActionTypes.AddTask;

  constructor(public payload: { taskName: string, selectId: string }) {}
}

export class UpdateTask implements Action {
  readonly type = TaskActionTypes.UpdateTask;

  constructor(public payload: { task: Update<Task> }) {}
}

export type TaskActions =  AddTask | UpdateTask;
