export interface RequestMoviesType {
    id: number;
    type: number;
    page: number;
    row: number;
    show_discount: number;
}

interface ListItem {
    cover: string;
    duration: string;
    id: number;
    price: string;
    title: string;
}

export interface ResponseMoviesType {
    list: ListItem[];
}
