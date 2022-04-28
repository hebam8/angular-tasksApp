import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  tasks: Task[] = [];

  ngOnInit(): void {
    this.taskService.allTasks('heba').subscribe((data) => {
      this.tasks = data;
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe({
      next: (data) => {
        console.log(data);
        this.tasks = this.tasks.filter((t) => t.id != task.id);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
