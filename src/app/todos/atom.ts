import { declareAtom } from '@reatom/core';
import { AddItem, Loading, LoadingFailed, LoadingSuccess } from './actions';
import { IState } from './todos.interface';

const initialState: IState = {
    loading: false,
    deepField: {
        foo: {
            bar: true,
        },
    },
    todos: [],
};

export const Todos = declareAtom<IState>(
    ['todos'],
    initialState,
    on => [
        on(Loading, state => ({
            ...state,
            loading: true,
        })),
        on(LoadingSuccess, (state, payload) => ({
            ...state,
            loading: false,
            todos: payload,
        })),
        on(LoadingFailed, state => ({
            ...state,
            loading: false,
        })),
        on(AddItem, (state, text) => ({
            ...state,
            todos: [
                ...state.todos,
                {
                    text,
                },
            ],
        })),
    ]);
