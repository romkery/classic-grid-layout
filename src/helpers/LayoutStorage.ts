import Vue from 'vue';

export default class LayoutStorage extends Vue {

    public aaaaa: boolean = true;
    public isEdit: boolean = false;

    public selectedItem: Object = {}

    public itemId: number = 1

    public layout: Array<ILayoutItem> = []

    public defaultLayout: Array<ILayoutItem> =
        [
            {
                "x": 0, "y": 1, "w": 3, "h": 50, "i": 0, c: 'CocaCola', static: false,
                props:
                    [
                        {
                            name: 'border',
                            title: 'Рамка',
                            el: 'slider',
                            slider: {
                                min: 0,
                                max: 50,
                                value: 10,
                                color: '#21B1EC',
                                valueParams: 'px solid '
                            }
                        },
                        {
                            name: 'borderRadius',
                            title: 'Скругление углов',
                            el: 'slider',
                            slider: {
                                min: 0,
                                max: 50,
                                value: 10,
                                valueParams: 'px'
                            }
                        }]

            },
            {
                "x": 2, "y": 1, "w": 2, "h": 50, "i": 1, c: 'Orange', static: false,
                props:
                    [{
                        name: 'border',
                        title: 'Рамка',
                        el: 'slider',
                        slider: {
                            min: 0,
                            max: 100,
                            value: 10,
                            color: '#e3812b',
                            valueParams: 'px solid '
                        }
                    }]

            },
            {
                "x": 4, "y": 1, "w": 2, "h": 50, "i": 2, c: 'Green', static: false, props:
                    [
                        {
                            name: 'border',
                            title: 'Рамка',
                            el: 'slider',
                            slider: {
                                min: 0,
                                max: 50,
                                value: 20,
                                color: '#31e862',
                                valueParams: 'px solid '
                            }
                        },
                        {
                            name: 'borderRadius',
                            title: 'Скругление углов',
                            el: 'slider',
                            slider: {
                                min: 0,
                                max: 50,
                                value: 10,
                                valueParams: 'px'
                            }
                        }]
            },
            {
                "x": 6, "y": 1, "w": 2, "h": 50, "i": 3, c: 'Orange', static: false,
                props:
                    [{
                        name: 'border',
                        title: 'Рамка',
                        el: 'slider',
                        slider: {
                            min: 0,
                            max: 100,
                            value: 10,
                            color: '#e3812b',
                            valueParams: 'px solid '
                        }
                    }]

            },
            {
                "x": 8, "y": 1, "w": 2, "h": 50, "i": 4, c: 'CocaCola', static: false, props:
                    [
                        {
                            name: 'border',
                            title: 'Рамка',
                            el: 'slider',
                            slider: {
                                min: 0,
                                max: 50,
                                value: 2,
                                color: '#21B1EC',
                                valueParams: 'px solid '
                            }
                        },
                        {
                            name: 'borderRadius',
                            title: 'Скругление углов',
                            el: 'slider',
                            slider: {
                                min: 0,
                                max: 50,
                                value: 10,
                                valueParams: 'px'
                            }
                        }
                    ],
            },
            {
                "x": 10, "y": 1, "w": 2, "h": 50, "i": 5, c: 'Green', static: false, props: [

                    {
                        name: 'border',
                        title: 'Рамка',
                        el: 'slider',
                        slider: {
                            min: 0,
                            max: 50,
                            value: 10,
                            color: '#31e862',
                            valueParams: 'px solid '
                        }
                    },
                    {
                        name: 'borderRadius',
                        title: 'Рамка',
                        el: 'slider',
                        slider: {
                            min: 0,
                            max: 50,
                            value: 10,
                            valueParams: 'px'
                        }
                    }
                ]
            }]

    public getLayout(): void {
        if (!localStorage.getItem('layout')) {
            this.defaultLayout.forEach(el => this.setLayout(el))
        } else {
            const data: Array<ILayoutItem> = JSON.parse(<string>localStorage.getItem('layout'))
            data.forEach((el) => this.setLayout(el))
        }
    }

    public saveLayoutChanges(layout: any): void {
        localStorage.setItem('layout', JSON.stringify(layout))
    }

    public setItemChanges(i: number, value: number): void {
        console.log('function запустилась', this.layout)
        // this.layout[i].props = value
    }

    public getIsEdit(): boolean {
        return this.isEdit
    }

    public setLayout(value: ILayoutItem): void {
        this.layout.push(value)
    }

    public createNewWidget(c: string, prop: any): any {
        return {
            // "x": 0, "y": 0, "w": 2, "h": 50, "i": this.layout.length + 1,
            c: c, static: false, props: prop
        }
    }

    public getStyles(itemProps: any) {
        let styles: any = {}
        itemProps.map((item: any) => styles[item.name] = `${item[item.el].value}${item[item.el].valueParams} ${item[item.el].color ? item[item.el].color : ''}`)
        return styles
    }

    public addNewProperty(name: string, title: string, el: string, min: number, max: number, step: number, value: number, color?: string, valueParams?: string,): any {

        return {
            name: name,
            title: title,
            el: el,
            [el]: {
                min: min ? min : 0,
                max: max ? max : 100,
                step: step ? step : 1,
                color: color ? color : null,
                value: value ? value : 0,
                valueParams: valueParams ? valueParams : name === 'borderRadius' ? 'px' : 'px solid'
            }
        }
    }


}

interface ILayoutItem {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    i?: number;
    c: string;
    static?: boolean
    props: Array<StyleType>
}

type StyleType = {
    name: string
    title?: string
    el: string,
    slider?: {
        min: number
        max: number
        step?: number
        color?: string
        value: number
        valueParams: string
    }
    color?: string
    switch?: boolean
}

