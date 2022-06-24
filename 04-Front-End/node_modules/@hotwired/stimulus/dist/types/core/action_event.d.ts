export interface ActionEvent extends Event {
    params: {
        [key: string]: any;
    };
}
