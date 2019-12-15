import {
    createStore,
    Atom,
    Store,
    PayloadActionCreator,
    Action,
} from '@reatom/core';
import { State } from '@reatom/core/src/kernel';
import { Injectable } from '@angular/core';

const error = () => {
    throw new Error('Store not yet configured!');
};

const NotConfiguredStore: Readonly<Store> = {
    dispatch: error,
    getState: error,
    subscribe: error,
};

@Injectable({
    providedIn: 'root',
})
export class NgReatom {
    public static store: Store = NotConfiguredStore;

    private store: Store = NotConfiguredStore;

    dispatch(action: Action<unknown>): void {
        this.store.dispatch(action);
    }

    subscribe<T>(
        target: Atom<T> | PayloadActionCreator<T>,
        listener: (state: T) => any,
    ): () => void;
    subscribe(listener: ActionsSubscriber): () => void;
    subscribe(target, listener?) {
        return this.store.subscribe(target, listener);
    }

    getState<T>(target: Atom<T>): T;
    getState(): State;
    getState(target?) {
        return this.store.getState(target);
    }

    createStore(initState?: State): void;
    createStore(atom: Atom<any>, initState?: State): void;
    createStore(atom: Atom<any> | State, initState?: State): void {
        if (this.store !== NotConfiguredStore)
            throw new Error('Store already configured!');

        this.setStore(createStore(atom as Atom<any>, initState));
    }

    private setStore(store) {
        this.store = store;
        NgReatom.store = store;
    }
}

type ActionsSubscriber = (action: Action<unknown>, stateDiff: State) => any;
