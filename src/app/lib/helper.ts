import { Observable } from 'rxjs';
import { NgReatom } from './ng-reatom.service';
import {
    ActionCreator,
    Atom,
    BaseActionCreator,
    declareAction, PayloadActionCreator,
} from '@reatom/core';

export type AtomObservable<T extends Atom<any>> = Observable<T extends Atom<infer R> ? R : never>;

export function useAtom<T extends Atom<any>>(atom: Atom<T>): AtomObservable<T>;
export function useAtom<T extends Atom<any>, F1 extends string>(
    atom: Atom<T>,
    field1: F1,
): AtomObservable<T>;
export function useAtom<T extends Atom<any>>(
    atom: Atom<T>,
    ...fields: string[]
): AtomObservable<T> {
    return new Observable(observer => {
        if (fields.length === 0) {
            const subscription = NgReatom.store.subscribe(
                atom,
                observer.next.bind(observer),
            );
            observer.next(NgReatom.store.getState(atom) as any);
            return subscription;
        } else {
            const subscription = NgReatom.store.subscribe(atom, data => {
                observer.next(data[fields[0]] as any);
            });
            observer.next(NgReatom.store.getState(atom)[fields[0]] as any);
            return subscription;
        }
    });
}

export function useAction<A extends BaseActionCreator, P extends any[]>(
    actionCreator: A,
): A {
    return ((...props: P) =>
        NgReatom.store.dispatch((actionCreator as any)(...props))) as any;
}

export function DeclareAction(actionCreator?: ActionCreator | PayloadActionCreator<any>) {
    return (target, name) => {
        const descriptor = Object.getOwnPropertyDescriptor(target, name);
        const original = descriptor.value;
        const actionName =
            (target.constructor.name || 'UnnamedService') + '/' + name;

        const declaredAction = declareAction<any>(actionName);

        descriptor.value = function (...args: any[]) {
            const action = declaredAction(args);
            NgReatom.store.dispatch(action);
            if (actionCreator)
                NgReatom.store.dispatch(actionCreator(args));
            original.apply(this, args);
        };

        Object.defineProperty(target, name, descriptor);
        return descriptor;
    };
}
