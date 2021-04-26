import { Category } from "./category";
import { Quote } from "./quote";

export interface Response {
    data: Quote[],
    status: string
}

export interface RespCategory {
    status: string,
    results?: number,
    data: Category[],
}