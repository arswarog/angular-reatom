import { Observable } from 'rxjs';
import {
    Atom,
    BaseActionCreator,
} from '@reatom/core';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';
import { NgReatom } from './reatom.service';

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
            map(getField(...fields)),
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

export function getField(...fields: string[]): (obj: any) => any {
    return obj => fields.reduce(
        (value, field) => {
            if (value && typeof value === 'object')
                return value[field];
            else
                return undefined;
        },
        obj,
    );
}
