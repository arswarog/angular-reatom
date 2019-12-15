export interface ITodo {
    text: string;
}

export interface IState {
    todos: ITodo[];
    loading: boolean;
}
