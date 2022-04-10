export default class GridModule {
    //
    // @State()
    // public isEdit: boolean = true;
    // public layout: Array<ILayoutItem> = []
    // public defaultLayout: Array<ILayoutItem> =
    //     [
    //         {
    //             "x": 0, "y": 1, "w": 3, "h": 50, "i": "1", c: 'CocaCola', style: {
    //                 border: 100,
    //                 borderRadius: 15
    //             }
    //         },
    //         {
    //             "x": 2, "y": 1, "w": 2, "h": 50, "i": "2", c: 'CocaCola', style: {
    //                 border: 40,
    //                 borderRadius: 10
    //             }
    //         },
    //         {
    //             "x": 4, "y": 1, "w": 2, "h": 50, "i": "3", c: 'CocaCola', style: {
    //                 border: 40,
    //                 borderRadius: 10
    //             }
    //         },
    //         {
    //             "x": 6, "y": 1, "w": 2, "h": 50, "i": "4", c: 'CocaCola', style: {
    //                 border: 40,
    //                 borderRadius: 10
    //             }
    //         },
    //         {
    //             "x": 8, "y": 1, "w": 2, "h": 50, "i": "5", c: 'CocaCola', style: {
    //                 border: 40,
    //                 borderRadius: 10
    //             }
    //         },
    //         {
    //             "x": 10, "y": 1, "w": 2, "h": 50, "i": "6", c: 'CocaCola', style: {
    //                 border: 40,
    //                 borderRadius: 10
    //             }
    //         }]
    //
    // @Getter()
    // public getIsEdit(state: any): boolean {
    //     return state.isEdit
    // }
    //
    // @Mutation()
    // public setEditMode(value: boolean) {
    //     this.isEdit = value;
    // }
    //
    // @Mutation()
    // public setLayout(value: ILayoutItem) {
    //     this.layout.push(value)
    // }
    //
    // @Action()
    // public toggleEditMode(): void {
    //     this.setEditMode(!this.isEdit)
    // }
    //
    // @Action()
    // public getLayout(): void {
    //     if (!localStorage.getItem('layout')) {
    //         this.defaultLayout.forEach(el => this.setLayout(el))
    //     } else {
    //         const data: Array<ILayoutItem> = JSON.parse(<string>localStorage.getItem('layout'))
    //         data.forEach((el) => this.setLayout(el))
    //     }
    // }
    //
    // @Action()
    // public saveLayoutChanges(): void {
    //     localStorage.setItem('layout', JSON.stringify(this.layout))
    // }

}


// interface ILayoutItem {
//     x?: number;
//     y?: number;
//     w?: number;
//     h?: number;
//     i?: string;
//     c?: string;
//     static?: boolean;
//     style: any
// }


export const gridModule = new GridModule()
