import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodoService } from '../../shared/data-access/todo.service';
import { Todo } from '../../shared/interfaces/todo';

@Component({
  standalone: true,
  selector: 'app-todo-list',
  template: `
    <ul>
      @for (todo of todos; track todo.id) {
      <li>
        <a routerLink="/detail/{{ todo.id }}">{{ todo.title }}</a>
        <button class="danger" (click)="todoService.deleteTodo(todo.id)">
          Delete
        </button>
      </li>
      } @empty {
      <li>Nothind to do!</li>
      }
    </ul>
  `,
  imports: [RouterLink],
  styles: [
    `
      ul {
        margin: 0;
        padding: 1rem;
      }

      .danger {
        background-color: red;
        margin: 0.5rem;
      }
    `,
  ],
})
export class TodoListComponent {
  @Input({ required: true }) todos!: Todo[];
  todoService = inject(TodoService);
}
