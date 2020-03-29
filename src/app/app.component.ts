import { Component, OnDestroy, OnInit } from '@angular/core';

import { TodoService } from './models/todo.service';
import { addItem, todoListLoad, toggle } from './models/todo.actions';
import { TodoList } from './models/todo.atom';
import { NgReatom, requireAtom, useAction, useAtom } from '@reatom/angular';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    public title = 'angular-reatom';

    public actions = [];

    public fooLog: any[] = [];
    public barLog: any[] = [];

    // variables
    public state$ = useAtom(TodoList);
    public loading$ = useAtom(TodoList, 'loading');
    public list$ = useAtom(TodoList, 'list');
    public foo$ = useAtom(TodoList, 'deepField', 'foo');
    public bar$ = useAtom(TodoList, 'deepField', 'foo', 'bar');

    // actions
    public addItem = useAction(addItem);
    public toggle = useAction(toggle);
    public loadTodoList = useAction(todoListLoad);

    private unsubscribe$ = new Subject();

    private atoms = requireAtom(TodoList);

    constructor(public service: TodoService,
                private store: NgReatom) {
        this.store.subscribe(action => {
            this.actions.push(action);
            console.group('ACTION', action.type);
            console.log(action);
            console.log(this.store.getState());
            console.groupEnd();
        });

        this.foo$.subscribe(value => this.fooLog.push(value));
        this.bar$.subscribe(value => this.barLog.push(value));
    }

    ngOnInit() {
        this.atoms.subscribeUntil(this.unsubscribe$);

        this.store.dispatch(toggle());
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
    }
}
