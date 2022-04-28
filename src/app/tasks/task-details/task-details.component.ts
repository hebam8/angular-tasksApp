import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  id: number = 0;

  task: Task = {
    title: '',
    username: '',
    content: '',
    image: '',
  };

  constructor(public route: ActivatedRoute, private taskService: TaskService) {}

  imageURL = '';

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      console.log(this.id);
    });

    // get the task
    this.taskService.showTask(this.id).subscribe((data) => {
      this.task = data;
      this.imageURL = this.taskService.getImageURL(this.task.image);
    });
  }
}
