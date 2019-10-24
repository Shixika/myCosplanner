export class Project {
    id: number;
    character: string;
    series: string;
    percentDone: number;
    picture?: any;
    budget?: number;
    dueDate?: string;
    initialDate?: string;
    purchases?: {
        purchasesName: string[];
        purchasesPrice: number[];
        purchasesStatus: boolean[];
    };
    todos?: {
        todosName: string[];
        todosPercent: number[];
        todosTime: number[];
    };
}
