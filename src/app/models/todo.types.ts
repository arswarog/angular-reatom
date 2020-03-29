export interface ITodo {
    text: string;
}

export interface IState {
    list: ITodo[];
    loading: boolean;
    deepField: {
        foo: {
            toggle: boolean;
            bar: boolean;
        };
        another?: {
            empty: string;
        }
    };
}
