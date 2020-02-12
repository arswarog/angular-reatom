import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { todoListLoad, todoListLoadSuccess } from './actions';
import { NgReatom, onAction } from '@reatom/angular';

@Injectable({
    providedIn: 'root',
})
export class TodoListService {
    constructor(private store: NgReatom, private http: HttpClient) {
    }

    public loadTodoList = onAction(todoListLoad, ({num, todo}) => {
        setTimeout(() => {
            this.store.dispatch(
                todoListLoadSuccess([
                    {
                        text: 'Hello',
                    },
                    todo,
                ]),
            );
        }, 1000);
    });
}

