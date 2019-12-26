import { Observable } from 'rxjs';
import { NgReatom } from './ng-reatom.service';
import {
    ActionCreator,
    Atom,
    BaseActionCreator,
    declareAction, PayloadActionCreator,
} from '@reatom/core';
import { distinctUntilChanged, pluck } from 'rxjs/operators';


export type AtomType<T extends Atom<any>> = T extends Atom<infer R> ? R : never;

export function useAtom<T extends Atom<any>>(atom: T): Observable<AtomType<T>>;
export function useAtom<T extends Atom<any>,
    F1 extends keyof AtomType<T>>(
    atom: T,
    field1: F1,
): Observable<AtomType<T>[F1]>;
export function useAtom<T extends Atom<any>,
    F1 extends keyof AtomType<T>,
    F2 extends keyof AtomType<T>[F1]>(
    atom: T,
    field1: F1,
    field2: F2,
): Observable<AtomType<T>[F1][F2]>;
export function useAtom<T extends Atom<any>,
    F1 extends keyof AtomType<T>,
    F2 extends keyof AtomType<T>[F1],
    F3 extends keyof AtomType<T>[F1][F2]>(
    atom: T,
    field1: F1,
    field2: F2,
    field3: F3,
): Observable<AtomType<T>[F1][F2][F3]>;
export function useAtom<T extends Atom<any>,
    F1 extends keyof AtomType<T>,
    F2 extends keyof AtomType<T>[F1],
    F3 extends keyof AtomType<T>[F1][F2],
    F4 extends keyof AtomType<T>[F1][F2][F3]>(
    atom: T,
    field1: F1,
    field2: F2,
    field3: F3,
    field4: F4,
): Observable<AtomType<T>[F1][F2][F3][F4]>;
export function useAtom<T extends Atom<any>,
    F1 extends keyof AtomType<T>,
    F2 extends keyof AtomType<T>[F1],
    F3 extends keyof AtomType<T>[F1][F2],
    F4 extends keyof AtomType<T>[F1][F2][F3],
    F5 extends keyof AtomType<T>[F1][F2][F3][F4]>(
    atom: T,
    field1: F1,
    field2: F2,
    field3: F3,
    field4: F4,
    field5: F5,
): Observable<AtomType<T>[F1][F2][F3][F4][F5]>;
export function useAtom<T extends Atom<any>>(
    atom: Atom<T>,
    ...fields: string[]
): Observable<AtomType<T>> {
    const stream = new Observable(observer => {
        const subscription = NgReatom.store.subscribe(
            atom,
            observer.next.bind(observer),
        );
        observer.next(NgReatom.store.getState(atom) as any);
        return subscription;
    });

    if (fields.length)
        return stream.pipe(
            pluck(...fields),
            distinctUntilChanged(),
        ) as any;
    else
        return stream as any;
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
