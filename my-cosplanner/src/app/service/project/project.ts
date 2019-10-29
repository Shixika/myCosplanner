export class Project {
    id: number;
    character: string;
    series: string;
    percentDone: number;
    picture?: any;
    budget?: number;
    dueDate?: string;
    initialDate?: string;
    purchases?: Array<any>;
    todos?: Array<any>;
    references?: Array<any>;
}
