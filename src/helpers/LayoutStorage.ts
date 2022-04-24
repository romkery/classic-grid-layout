import Vue from 'vue';

export default class LayoutStorage extends Vue {

    public gridItemSize = {w: 2, h: 50}
    public isEdit: boolean = false;
    public item: any = {}
    public outerWidgets = ['Pink', 'Yellow']
    public layout: Array<ILayoutItem> = []
    public defaultLayout: Array<ILayoutItem> =
        [
            {
                "x": 0, "y": 1, "w": 3, "h": 50, "i": 10, c: 'CocaCola', static: false, props: {
                    preview: 'skeleton', loading: false,
                    styleProps: {
                        border: {
                            name: 'border',
                            title: 'Рамка',
                            el: 'slider',
                            value: 10,
                            color: '#21B1EC',
                            params: {
                                min: 0,
                                max: 50,
                            }
                        },
                        borderRadius: {
                            name: 'borderRadius',
                            title: 'Скругление углов',
                            el: 'slider',
                            value: 10,
                            params: {
                                min: 0,
                                max: 50,
                            }
                        },
                        background: {
                            name: 'background',
                            title: 'Фон',
                            el: 'colorPicker',
                            color: '#000000'
                        }
                    }
                }
            },
            {
                "x": 2, "y": 1, "w": 2, "h": 50, "i": 1, c: 'Orange', static: false, props: {
                    preview: 'skeleton', loading: true,
                    styleProps: {
                        border: {
                            name: 'border',
                            title: 'Рамка',
                            el: 'slider',
                            value: 10,
                            color: '#21B1EC',
                            params: {
                                min: 0,
                                max: 50,
                            }
                        },
                        borderRadius: {
                            name: 'borderRadius',
                            title: 'Скругление углов',
                            el: 'slider',
                            value: 10,
                            params: {
                                min: 0,
                                max: 50,
                            }
                        },
                        background: {
                            name: 'background',
                            title: 'Фон',
                            el: 'colorPicker',
                            color: '#000000'
                        }
                    }
                }
            },
            {
                "x": 4, "y": 1, "w": 2, "h": 50, "i": 2, c: 'Green', static: false, props: {
                    preview: 'skeleton', loading: false, styleProps: {
                        border: {
                            name: 'border',
                            title: 'Рамка',
                            el: 'slider',
                            value: 20,
                            color: '#31e862',
                            params: {
                                min: 0,
                                max: 50,
                            }
                        },
                        borderRadius: {
                            name: 'borderRadius',
                            title: 'Скругление углов',
                            el: 'slider',
                            value: 10,
                            params: {
                                min: 0,
                                max: 50,
                            }
                        }
                    }
                }
            },
            {
                "x": 6, "y": 1, "w": 2, "h": 50, "i": 3, c: 'Orange', static: false, props: {
                    preview: 'skeleton', loading: true,
                    styleProps: {
                        border: {
                            name: 'border',
                            title: 'Рамка',
                            el: 'slider',
                            value: 10,
                            color: '#e3812b',
                            params: {
                                min: 0,
                                max: 100,
                            }
                        },
                        background: {
                            name: 'background',
                            title: 'Фон',
                            el: 'colorPicker',
                            color: '#5df854'
                        }
                    }
                }
            },
            {
                "x": 8, "y": 1, "w": 2, "h": 50, "i": 4, c: 'CocaCola', static: false, props: {
                    preview: 'skeleton', loading: false, styleProps:
                        {
                            border: {
                                name: 'border',
                                title: 'Рамка',
                                el: 'slider',
                                value: 2,
                                color: '#21B1EC',
                                params: {
                                    min: 0,
                                    max: 50,
                                }
                            },
                            borderRadius: {
                                name: 'borderRadius',
                                title: 'Скругление углов',
                                el: 'slider',
                                value: 10,
                                params: {
                                    min: 0,
                                    max: 50,
                                }
                            }
                        },
                }
            },
            {
                "x": 10, "y": 1, "w": 2, "h": 50, "i": 5, c: 'Green', static: false, props: {
                    preview: 'skeleton', loading: true, styleProps: {
                        border: {
                            name: 'border',
                            title: 'Рамка',
                            el: 'slider',
                            value: 10,
                            color: '#31e862',
                            params: {
                                min: 0,
                                max: 50,
                            }
                        },
                        borderRadius: {
                            name: 'borderRadius',
                            title: 'Рамка',
                            el: 'slider',
                            value: 10,
                            params: {
                                min: 0,
                                max: 50,
                            }
                        },
                        background: {
                            name: 'background',
                            title: 'Фон',
                            el: 'colorPicker',
                            color: '#deafaf'
                        }
                    }
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

    public createNewWidget(c: string, preview: string, propsArray: propsArray[]): any {

        let propsObject: any = {}

        propsArray.map((el) => {
            propsObject[el.name] = {
                name: el.name,
                title: el.title,
                el: el.el,
                color: el.color ? el.color : null,
                value: el.value ? el.value : 0,
                params: {
                    min: el.min ? el.min : 0,
                    max: el.max ? el.max : 100,
                    step: el.step ? el.step : 1,
                }
            }
        })

        return {
            c: c,
            static: false,
            props: {
                preview: preview,
                loading: false,
                styleProps: propsObject
            }
        }
    }

    public setStyleValues(value: number, prop: any, selectedItem: any, param: any) {

        const foundProp = selectedItem.props.styleProps[prop.name]
        foundProp && (foundProp[param] = value);
    }

}

export interface ILayoutItem {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    i?: number;
    c: string;
    static?: boolean
    props: PropsType
}

export type StyleType = {
    [key: string]: {
        name: string
        title: string
        el: string,
        color?: string
        value?: number
        params?: {
            min?: number
            max?: number
            step?: number
        }
    }
}

export type PropsType = {
    loading: boolean
    styleProps: StyleType
    preview: string
}

export type propsArray = {
    name: string,
    title: string,
    el: string,
    min?: number,
    max?: number,
    step?: number,
    value?: number,
    color?: string
}

