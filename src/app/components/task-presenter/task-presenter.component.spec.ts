import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPresenterComponent } from './task-presenter.component';
import { MinuteSecondsPipe } from '../minute-seconds.pipe';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { MatIconModule, MatCardModule } from '@angular/material';
import { of } from 'rxjs';

describe('TaskPresenterComponent', () => {
  let component: TaskPresenterComponent;
  let fixture: ComponentFixture<TaskPresenterComponent>;
  @Pipe({ name: 'minuteSeconds' })
  class MockPipe implements PipeTransform {
    transform(value: number): number {
      return value;
    }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskPresenterComponent, MockPipe],
      imports: [MatIconModule, MatCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPresenterComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render task', () => {
    // Arrange
    component.task = {
      id: 1,
      name: 'some name',
      buttonText: 'pause',
      timer: of(10),
    };
    // Act
    fixture.detectChanges();

    // Assert
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
