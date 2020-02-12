import {
    createStore,
    Atom,
    Store,
    Action,
    PayloadActionCreator,
    ActionCreator,
} from '@reatom/core';
import { State } from '@reatom/core/src/kernel';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { BaseAction } from '@reatom/core/build/kernel';

export const RootAtom = new InjectionToken('NgReatomRootAtom');

@Injectable({
    providedIn: 'root',
})
export class NgReatom {
    public static store: Store = null;

    public store: Store;

    constructor(@Optional() @Inject(RootAtom) rootAtom: Atom<any>) {
        console.log('Initializing NgReatom');
        if (NgReatom.store)
            this.setStore(NgReatom.store);
        else
            this.setStore(createStore(rootAtom));
        this.store.subscribe(handlerForOnAction);
    }

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

    private setStore(store) {
        this.store = store;
        NgReatom.store = store;
    }

}

type ActionsSubscriber = (action: Action<unknown>, stateDiff: State) => any;

type Reaction<T = unknown> = (payload?: T) => void;

const onActionReactions: {
    [type: string]: Reaction[]
} = {};

export function onAction(actionType: string | ActionCreator,
                         reaction: Reaction<unknown>);
export function onAction<T>(actionType: PayloadActionCreator<T>,
                            reaction: Reaction<T>);
export function onAction<T = unknown>(actionType: string | ActionCreator | PayloadActionCreator<T>,
                                      reaction: Reaction<T>) {
    let type = '';
    if (typeof actionType === 'string')
        type = actionType;
    else if (typeof actionType.getType === 'function')
        type = actionType.getType();
    else
        throw new Error('Incorrect actionType parameter');

    if (type in onActionReactions)
        onActionReactions[type].push(reaction);
    else
        onActionReactions[type] = [reaction];
}

export function handlerForOnAction(action: Action<unknown>, stateDiff: State): void {
    if (action.type in onActionReactions)
        onActionReactions[action.type].forEach(reaction => reaction(action.payload));
}
