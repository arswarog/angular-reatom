import { declareAtom } from '@reatom/core';
import { addItem, loading, loadingFailed, loadingSuccess, toggle } from './actions';
import { IState } from './todos.interface';

const initialState: IState = {
    loading  : false,
    deepField: {
        foo: {
            toggle: true,
            bar   : true,
        },
    },
    todos    : [],
};

export const Todos = declareAtom<IState>(
    ['todos'],
    initialState,
    on => [
        on(loading, state => ({
            ...state,
            loading: true,
        })),
        on(loadingSuccess, (state, payload) => ({
            ...state,
            loading: false,
            todos  : payload,
        })),
        on(loadingFailed, state => ({
            ...state,
            loading: false,
        })),
        on(toggle, (state) => ({
            ...state,
            deepField: {
                ...state.deepField,
                foo: {
                    ...state.deepField.foo,
                    toggle: !state.deepField.foo.toggle,
                },
            },
        })),
        on(addItem, (state, text) => ({
            ...state,
            todos: [
                ...state.todos,
                {
                    text,
                },
            ],
        })),
    ]);
