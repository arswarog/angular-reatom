import { declareAction } from '@reatom/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ITodo } from './todos.interface';

export const loading = declareAction('loading', () => {
    console.log('test action');
});

export const loadingSuccess = declareAction<ITodo[]>('loading/success');

export const loadingFailed = declareAction<HttpErrorResponse>(
    'loading/failed',
    () => {
        alert('error');
    },
);

export const addItem = declareAction<string>('addItem');

export const toggle = declareAction('toggleAction');
