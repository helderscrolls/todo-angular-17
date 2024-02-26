import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo } from '../../shared/interfaces/todo';

@Component({
  standalone: true,
  selector: 'app-update-todo-form',
  template: `
    <form
      [formGroup]="updateTodoForm"
      (ngSubmit)="todoUpdated.emit(updateTodoForm.getRawValue())"
    >
      <input type="text" formControlName="title" placeholder="title..." />
      <input
        type="text"
        formControlName="description"
        placeholder="description..."
      />
      <button [disabled]="!updateTodoForm.valid" type="submit">
        Update todo
      </button>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class UpdateTodoFormComponent {
  @Input({ required: true }) todo!: Todo;
  @Output() todoUpdated = new EventEmitter<Todo>();
  private fb = new FormBuilder();

  updateTodoForm = this.fb.nonNullable.group({
    id: [this.todo.id],
    title: [this.todo.title, Validators.required],
    description: [this.todo.description || ''],
  });
}
