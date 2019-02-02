import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Task } from 'src/app/store/task.model';

@Component({
  selector: 'app-task-presenter',
  templateUrl: './task-presenter.component.html',
  styleUrls: ['./task-presenter.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TaskPresenterComponent {
  @Input() task: Task;
  @Input() isActive = false;
  @Output() clicked = new EventEmitter<Task>();

  public click() {
    this.clicked.emit(this.task);
  }
  public get buttonName() {
    if (this.isActive) {
      return 'pause';
    } else {
      return 'play_arrow';
    }
  }
}
