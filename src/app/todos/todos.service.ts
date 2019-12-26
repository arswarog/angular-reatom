import { Injectable } from '@angular/core';
import { DeclareAction, NgReatom } from '../lib';
import { HttpClient } from '@angular/common/http';
import { ITodo } from './todos.interface';
import { loading, loadingSuccess } from './actions';

@Injectable({
    providedIn: 'root',
})
export class TodosService {
    constructor(private store: NgReatom, private http: HttpClient) {
    }

    @DeclareAction(loading)
    public loadTodos(num: number, todo: ITodo) {
        setTimeout(() => {
            this.store.dispatch(
                loadingSuccess([
                    {
                        text: 'Hello',
                    },
                    todo,
                ]),
            );
        }, 1000);
    }
}
