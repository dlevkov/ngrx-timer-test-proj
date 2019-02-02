import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Task } from 'src/app/task.model';


@Component({
  selector: 'app-task-presenter',
  templateUrl: './task-presenter.component.html',
  styleUrls: ['./task-presenter.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TaskPresenterComponent {
  @Input() task: Task;
  @Output() clicked = new EventEmitter<Task>();

  public click() {
    this.clicked.emit(this.task);
  }
}
