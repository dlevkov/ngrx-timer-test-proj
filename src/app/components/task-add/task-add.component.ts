import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task } from '../../task.model';
import { AddTask } from 'src/app/task.actions';
import { UUID } from 'angular2-uuid';
@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
})
export class TaskAddComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<Task>) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      text: [
        null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
    });
  }
  submitHandler(text: string) {
    this.store.dispatch(new AddTask({ taskName: text, selectId: UUID.UUID() }));
    this.resetForm();
  }
  private resetForm() {
    this.form.reset();
  }
}
