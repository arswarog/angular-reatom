import { Component, OnInit } from '@angular/core';
import { NgReatom, useAction, useAtom } from './lib';

import { TodosService } from './todos/todos.service';
import { AddItem, Loading, LoadingFailed } from './todos/actions';
import { Todos } from './todos/atom';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'angular-reatom';

    loading$ = useAtom(Todos, 'loading');
    todos$ = useAtom(Todos, 'todos');
    foo$ = useAtom(Todos, 'deepField', 'foo');
    bar$ = useAtom(Todos, 'deepField', 'foo', 'bar');
    state$ = useAtom(Todos);

    addItem = useAction(AddItem);

    actions = [];

    constructor(public service: TodosService,
                private reatom: NgReatom) {
        this.reatom.subscribe(action => {
            this.actions.push(action);
            console.group('ACTION', action.type);
            console.log(action);
            console.log(this.reatom.getState());
            console.groupEnd();
        });
    }

    ngOnInit() {
        this.service.loadTodos(
            0,
            {
                text: 'ngOnInit text',
            },
        );
    }
}
