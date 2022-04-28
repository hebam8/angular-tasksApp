import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task = {
    title: '',
    content: '',
    image: '',
    username: '',
  };

  @Output() deleteTask = new EventEmitter();

  constructor(private taskService: TaskService) {}

  imageURL = '';

  ngOnInit(): void {
    this.imageURL = this.taskService.getImageURL(this.task.image);
  }

  delete(task: Task) {
    this.deleteTask.emit(task);
  }
}
