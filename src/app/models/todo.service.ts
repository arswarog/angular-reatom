import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { todoListLoad, todoListLoadSuccess } from './todo.actions';
import { NgReatom, onAction } from '@reatom/angular';

@Injectable({
    providedIn: 'root',
})
export class TodoService {
    constructor(private store: NgReatom, private http: HttpClient) {
    }

    public loadTodoList = onAction(todoListLoad, () => {
        setTimeout(() => {
            this.store.dispatch(
                todoListLoadSuccess([
                    {
                        text: 'Hello',
                    },
                ]),
            );
        }, 1000);
    });
}

