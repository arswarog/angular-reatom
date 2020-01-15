import { declareAction } from '@reatom/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ITodo } from './todo-list.interface';

export const loading = declareAction('loading', () => {
    console.log('test action');
});

export const todoListLoad = declareAction<{ num: number, todo: ITodo }>('todoList:load');

export const todoListLoadSuccess = declareAction<ITodo[]>('todoList:load/success');

export const todoListLoadFailed = declareAction<HttpErrorResponse>(
    'todoList:load/failed',
    () => {
        alert('error');
    },
);

export const addItem = declareAction<string>('todoList:addItem');

export const toggle = declareAction('todoList:toggleAction');
