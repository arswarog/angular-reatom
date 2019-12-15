import { Injectable } from '@angular/core';
import { DeclareAction, NgReatom } from '../lib';
import { HttpClient } from '@angular/common/http';
import { ITodo } from './todos.interface';
import { Loading, LoadingSuccess } from './actions';

@Injectable({
    providedIn: 'root',
})
export class TodosService {
    constructor(private store: NgReatom, private http: HttpClient) {
    }

    @DeclareAction(Loading)
    public loadTodos(num: number, todo: ITodo) {
        setTimeout(() => {
            this.store.dispatch(
                LoadingSuccess([
                    {
                        text: 'Hello',
                    },
                    todo,
                ]),
            );
        }, 1000);
    }
}
