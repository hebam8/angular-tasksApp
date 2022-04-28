import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

const url = 'https://task.ecmpp.com/api/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getImageURL(url: string) {
    return 'https://task.ecmpp.com/storage/' + url.replace('public/', '');
  }

  allTasks(username: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${url}/all/${username}`);
  }

  addTask(task: Task): Observable<Task> {
    const taskData = new FormData();
    taskData.append('username', task.username);
    taskData.append('title', task.title);
    taskData.append('content', task.content);
    taskData.append('image', task.image);
    return this.http.post<Task>(`${url}/add`, taskData);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(`${url}/remove/${task.id}`);
  }

  updateTask(task: Task): Observable<Task> {
    const taskData = new FormData();
    taskData.append('id', task.id);
    taskData.append('username', task.username);
    taskData.append('title', task.title);
    taskData.append('content', task.content);
    if (task.image) {
      taskData.append('image', task.image);
    }
    return this.http.post<Task>(`${url}/edit`, taskData);
  }

  showTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${url}/Show/${id}`);
  }
}
