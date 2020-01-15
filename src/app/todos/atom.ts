import { declareAtom } from '@reatom/core';
import { IState } from './todo-list.interface';
import { addItem, todoListLoad, todoListLoadFailed, todoListLoadSuccess, toggle } from './actions';

const initialState: IState = {
    loading  : false,
    deepField: {
        foo: {
            toggle: true,
            bar   : true,
        },
    },
    list     : [],
};

export const TodoList = declareAtom<IState>(
    ['todoList'],
    initialState,
    on => [
        on(todoListLoad, state => ({
            ...state,
            loading: true,
        })),
        on(todoListLoadSuccess, (state, payload) => ({
            ...state,
            loading: false,
            list  : payload,
        })),
        on(todoListLoadFailed, state => ({
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
            list: [
                ...state.list,
                {
                    text,
                },
            ],
        })),
    ]);
