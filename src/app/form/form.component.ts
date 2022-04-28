import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  username = new FormControl('', [
    Validators.maxLength(100),
    Validators.minLength(3),
  ]);
  title = new FormControl('', [
    Validators.maxLength(100),
    Validators.minLength(3),
  ]);
  content = new FormControl('', [
    Validators.maxLength(255),
    Validators.minLength(10),
  ]);
  image = new FormControl(null);

  taskForm = new FormGroup({
    username: this.username,
    title: this.title,
    content: this.content,
    image: this.image,
  });

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  id: number = 0;
  updateMode = false;

  task: Task = {
    title: '',
    username: '',
    content: '',
    image: '',
  };

  imageURL = '';
  imageErr = '';

  ngOnInit(): void {
    console.log(this.updateMode);

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id) {
        this.updateMode = true;
      }
    });

    // get the task
    if (this.id) {
      this.taskService.showTask(this.id).subscribe((data) => {
        this.task = data;
        this.imageURL = this.taskService.getImageURL(data.image);
        console.log(this.imageURL);
      });
    }
  }

  submit() {
    if (this.id) {
      this.taskService
        .updateTask({ id: +this.id, ...this.taskForm.value })
        .subscribe((data) => {
          alert('updated successfully.');
          // navigate to all tasks
          this.router.navigateByUrl('/tasks');
        });
    } else {
      this.taskService.addTask(this.taskForm.value).subscribe((data) => {
        alert('added successfully.');
        // navigate to all tasks
        this.router.navigateByUrl('/tasks');
      });
    }
  }

  upload(e: any) {
    if (e.target.files[0].size < 2048) {
      this.taskForm.patchValue({ image: e.target.files[0] });
      this.taskForm.get('image')?.updateValueAndValidity();
    } else {
      this.imageErr = 'The image should be less than 2048KB.';
    }
  }
}
