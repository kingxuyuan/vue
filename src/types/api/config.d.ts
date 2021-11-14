interface categoryV2ListItem {
    id: number;
    sort: number;
    title: string;
    type: number;
}

interface StartPageItem {
    belong_area: string;
    click_num: number;
    id: number;
    pic: string;
    show_time: number;
    title: string;
    url: string;
}

interface MsgHomeListItem {
    content: string;
    title: string;
}

export interface ResponseConfigType {
    categoryV2: {
        list: categoryV2ListItem[];
    };
    start_page: StartPageItem[];
    version: number;
    msgHomeList: MsgHomeListItem[];
}
