import Vue from 'vue';

export default class LayoutStorage extends Vue {

    public isEdit: boolean = false;

    public item: any = {}

    public outerWidgets = ['Pink', 'Yellow']

    public layout: Array<ILayoutItem> = []

    public defaultLayout: Array<ILayoutItem> =
        [
            {
                "x": 0, "y": 1, "w": 3, "h": 50, "i": 0, c: 'CocaCola', static: false, props: {
                    preview: 'skeleton', loading: false,
                    styleProps:
                        [
                            {
                                name: 'border',
                                title: 'Рамка',
                                el: 'slider',
                                params: {
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
                                params: {
                                    min: 0,
                                    max: 50,
                                    value: 10,
                                    valueParams: 'px'
                                }
                            },
                            {
                                name: 'background',
                                title: 'Фон',
                                el: 'colorPicker',
                                params: {
                                    color: '#000000'
                                }
                            }]

                }
            },
            {
                "x": 2, "y": 1, "w": 2, "h": 50, "i": 1, c: 'Orange', static: false, props: {
                    preview: 'skeleton', loading: true,
                    styleProps:
                        [{
                            name: 'border',
                            title: 'Рамка',
                            el: 'slider',
                            params: {
                                min: 0,
                                max: 100,
                                value: 10,
                                color: '#e3812b',
                                valueParams: 'px solid '
                            }
                        },
                            {
                                name: 'background',
                                title: 'Фон',
                                el: 'colorPicker',
                                params: {
                                    color: '#f4ff9c'
                                }
                            }
                        ]
                }
            },
            {
                "x": 4, "y": 1, "w": 2, "h": 50, "i": 2, c: 'Green', static: false, props: {
                    preview: 'skeleton', loading: false, styleProps:
                        [
                            {
                                name: 'border',
                                title: 'Рамка',
                                el: 'slider',
                                params: {
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
                                params: {
                                    min: 0,
                                    max: 50,
                                    value: 10,
                                    valueParams: 'px'
                                }
                            }]
                }
            },
            {
                "x": 6, "y": 1, "w": 2, "h": 50, "i": 3, c: 'Orange', static: false, props: {
                    preview: 'skeleton', loading: true,
                    styleProps:
                        [{
                            name: 'border',
                            title: 'Рамка',
                            el: 'slider',
                            params: {
                                min: 0,
                                max: 100,
                                value: 10,
                                color: '#e3812b',
                                valueParams: 'px solid '
                            }
                        },
                            {
                                name: 'background',
                                title: 'Фон',
                                el: 'colorPicker',
                                params: {
                                    color: '#5df854'
                                }
                            }]

                }
            },
            {
                "x": 8, "y": 1, "w": 2, "h": 50, "i": 4, c: 'CocaCola', static: false, props: {
                    preview: 'skeleton', loading: false, styleProps:
                        [
                            {
                                name: 'border',
                                title: 'Рамка',
                                el: 'slider',
                                params: {
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
                                params: {
                                    min: 0,
                                    max: 50,
                                    value: 10,
                                    valueParams: 'px'
                                }
                            }
                        ],
                }
            },
            {
                "x": 10, "y": 1, "w": 2, "h": 50, "i": 5, c: 'Green', static: false, props: {
                    preview: 'skeleton', loading: true, styleProps: [

                        {
                            name: 'border',
                            title: 'Рамка',
                            el: 'slider',
                            params: {
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
                            params: {
                                min: 0,
                                max: 50,
                                value: 10,
                                valueParams: 'px'
                            }
                        },
                        {
                            name: 'background',
                            title: 'Фон',
                            el: 'colorPicker',
                            params: {
                                color: '#deafaf'
                            }
                        }
                    ]
                }
            }]

    public getLayout(): void {
        if (!localStorage.getItem('layout')) {
            this.defaultLayout.forEach(el => this.setLayout(el))
        } else {
            const data: Array<ILayoutItem> = JSON.parse(<string>localStorage.getItem('layout'))
            data.forEach((el) => this.setLayout(el))
        }
        this.saveLayoutChanges(this.layout)
    }

    public saveLayoutChanges(layout: any): void {
        localStorage.setItem('layout', JSON.stringify(layout))
    }

    public setLayout(value: ILayoutItem): void {
        this.layout.push(value)
    }

    public createNewWidget(c: string, preview: string, prop: any): any {
        return {
            c: c, static: false, props: {
                preview: preview,
                loading: false,
                styleProps: prop
            }
        }
    }

    public addNewProperty(name: string, title: string, el: string, min: number, max: number, step: number, value: number, color?: string, valueParams?: string,): any {

        return {
            name: name,
            title: title,
            el: el,
            params: {
                min: min ? min : 0,
                max: max ? max : 100,
                step: step ? step : 1,
                color: color ? color : null,
                value: value ? value : 0,
                valueParams: valueParams ? valueParams : name === 'borderRadius' ? 'px' : 'px solid'
            }
        }
    }

    public getStyles(itemProps: any): void {
        let styles: any = {}
        itemProps.map((item: any) => styles[item.name] = `${item.params.value ? item.params.value : ''}${item.params.valueParams ? item.params.valueParams : ''} ${item.params.color ? item.params.color : ''}`)
        return styles
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
    props: PropsType
}

type StyleType = {
    name: string
    title: string
    el: string,
    params?: {
        min?: number
        max?: number
        step?: number
        color?: string
        value?: number
        valueParams?: string
    }
    color?: string
    switch?: boolean
}

type PropsType = {
    loading: boolean
    styleProps: Array<StyleType>
    preview: string
}

