import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { connectReduxDevtools } from '@reatom/debug';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgReatom, NgReatomModule } from '@reatom/angular';
import { TodoList } from './models/todo.atom';
import { combine } from '@reatom/core';

export function rootAtom(state, action) {
    return TodoList(state, action);
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgReatomModule.forRoot(rootAtom as any),
    ],
    providers: [],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
    constructor(ngReatom: NgReatom) {
        const unsubscribeDevTools = connectReduxDevtools(ngReatom.store, {});
    }
}
