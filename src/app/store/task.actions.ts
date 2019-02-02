import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Task } from './task.model';

export enum TaskActionTypes {
  AddTask = '[Task API] Add Task',
  SetTaskElapsedSeconds = '[Task API] Set Task elapsed seconds',
  PlayTask = '[Task UI] Play Task requested',
  PauseTask = '[Task UI] Pause Task requested',
  SetActiveTaskId = '[Task API] Set active Task id',
}

export class AddTask implements Action {
  readonly type = TaskActionTypes.AddTask;

  constructor(public payload: { taskName: string, selectId: string }) {}
}

export class PlayTask implements Action {
  readonly type = TaskActionTypes.PlayTask;

  constructor(public payload: { taskId: string }) {}
}
export class PauseTask implements Action {
  readonly type = TaskActionTypes.PauseTask;

  constructor(public payload: { taskId: string }) {}
}
export class SetTaskElapsedSeconds implements Action {
  readonly type = TaskActionTypes.SetTaskElapsedSeconds;

  constructor(public payload: { taskId: string, elapsedSeconds: number }) {}
}
export class SetActiveTaskId implements Action {
  readonly type = TaskActionTypes.SetActiveTaskId;

  constructor(public payload: { taskId: string }) {}
}

export type TaskActions =
  | AddTask
  | SetTaskElapsedSeconds
  | PlayTask
  | PauseTask
  | SetActiveTaskId;
