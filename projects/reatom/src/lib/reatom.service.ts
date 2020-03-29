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
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const RootAtom = new InjectionToken('NgReatomRootAtom');

type ActionsSubscriber = (action: Action<unknown>, stateDiff: State) => any;

type Reaction<T = unknown> = (payload?: T) => void;

let onActionReactions: {
    [type: string]: Reaction[]
} = {};

@Injectable({
    providedIn: 'root',
})
export class NgReatom {
    public static store: Store = null;

    public store: Store;

    constructor(@Optional() @Inject(RootAtom) rootAtom: Atom<any>) {
        this.setStore(createStore(rootAtom));
        this.store.subscribe(handlerForOnAction);
        onActionReactions = {};
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

export class RequireAtom<T extends Atom<any>[]> {
    private subscriptions: (() => void)[] = [];

    constructor(public readonly atoms: T) { }

    get subscribed(): boolean {
        return !!this.subscriptions.length;
    }

    public subscribe() {
        if (!this.subscribed) {
            this.subscriptions = this.atoms.map(atom => NgReatom.store.subscribe(atom, () => null));
        }
    }

    public subscribeUntil(observable: Observable<any>) {
        this.subscribe();
        observable
            .pipe(
                take(1),
            )
            .subscribe(
                () => this.unsubscribe(),
            );
    }

    public unsubscribe() {
        this.subscriptions.forEach(subscription => subscription());
        this.subscriptions = [];
    }
}

export function requireAtom<T extends Atom<any>[]>(...atoms: T) {
    return new RequireAtom(atoms);
}
