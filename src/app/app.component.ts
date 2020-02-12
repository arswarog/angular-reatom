import { Component, OnInit } from '@angular/core';

import { TodoListService } from './todos/todo-list.service';
import { addItem, todoListLoad, toggle } from './todos/actions';
import { TodoList } from './todos/atom';
import { NgReatom, useAction, useAtom } from '@reatom/angular';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'angular-reatom';

    loading$ = useAtom(TodoList, 'loading');
    list$ = useAtom(TodoList, 'list');
    foo$ = useAtom(TodoList, 'deepField', 'foo');
    bar$ = useAtom(TodoList, 'deepField', 'foo', 'bar');
    state$ = useAtom(TodoList);

    addItem = useAction(addItem);

    toggle = useAction(toggle);

    actions = [];

    loadTodoList = useAction(todoListLoad);

    fooLog: any[] = [];
    barLog: any[] = [];

    constructor(public service: TodoListService,
                private reatom: NgReatom) {
        this.reatom.subscribe(action => {
            this.actions.push(action);
            console.group('ACTION', action.type);
            console.log(action);
            console.log(this.reatom.getState());
            console.groupEnd();
        });

        this.foo$.subscribe(value => this.fooLog.push(value));
        this.bar$.subscribe(value => this.barLog.push(value));
    }

    ngOnInit() {
    }

    load() {
        this.loadTodoList({
            num : 0,
            todo: {
                text: 'ngOnInit text',
            },
        });
    }
}
