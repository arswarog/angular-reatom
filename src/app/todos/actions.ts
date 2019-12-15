import { declareAction } from '@reatom/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ITodo } from './todos.interface';

export const Loading = declareAction('loading', () => {
    console.log('test action');
});

export const LoadingSuccess = declareAction<ITodo[]>('loading/success');

export const LoadingFailed = declareAction<HttpErrorResponse>(
    'loading/failed',
    () => {
        alert('error');
    },
);

export const AddItem = declareAction<string>('addItem');
