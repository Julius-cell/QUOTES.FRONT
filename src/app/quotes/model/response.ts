import { Quote } from "./quote";

export interface Response {
    data: Quote[],
    status: string
}