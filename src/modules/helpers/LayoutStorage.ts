import Vue from 'vue';

export default class LayoutStorage extends Vue {

    public gridItemSize = {w: 2, h: 50}
    public isEdit: boolean = false;
    public item: LayoutItemType | Object = {}
    public outerWidgets = ['TodayWeather', 'WeekWeather', 'Black', 'Yellow', 'Blue', 'Green', 'Orange']
    public layout: LayoutType = [];
    public dragItem: LayoutItemType = {};
    protected selectedItems: number[] = []
    protected isMouseInTrash: boolean = false
    public defaultLayout: LayoutItemType[] =
        [
            {
                "x": 0, "y": 1, "w": 3, "h": 50, "i": 0, c: 'Blue', isStatic: false, props: {
                    preview: 'skeleton', isLoading: false, isDeleteMode: false,
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
        ]

    public getLayout(): void {
        if (!localStorage.getItem('layout')) {
            this.defaultLayout.forEach(el => this.setLayout(el))
        } else {
            const data: LayoutType = JSON.parse(<string>localStorage.getItem('layout'))
            data.forEach((el): void => this.setLayout(el))
        }
        this.saveLayoutChanges(this.layout)
    }

    public saveLayoutChanges(layout: LayoutType): void {
        localStorage.setItem('layout', JSON.stringify(layout))
    }

    public saveCityChanges(city: string): void {
        localStorage.setItem('selectedCity', JSON.stringify(city))
    }

    public getLocalStorageCity(): any {
        if (!localStorage.getItem('selectedCity')) return 'Novosibirsk'
        else return JSON.parse(<string>localStorage.getItem('selectedCity'))
    }

    public setLayout(value: LayoutItemType): void {
        this.layout.push(value)
    }

    public createNewWidget(w: number, h: number, c: string, preview: string, propsArray: NewWidgetPropsType[],
                           maxW?: number, maxH?: number, minW?: number, minH?: number): LayoutItemType {

        let propsObject: StyleType = {}

        propsArray.map((el) => {
            propsObject[el.name] = {
                name: el.name,
                title: el.title,
                el: el.el,
                color: el.color ? el.color : undefined,
                value: el.value ? el.value : '',
                params: {
                    min: el.min ? el.min : 0,
                    max: el.max ? el.max : 100,
                    step: el.step ? el.step : 1,
                }
            }
        })

        return {
            w: w,
            h: h,
            c: c,
            isStatic: false,
            props: {
                minH: minH,
                minW: minW,
                maxW: maxW,
                maxH: maxH,
                preview: preview,
                isLoading: false,
                isDeleteMode: false,
                styleProps: propsObject
            }
        }
    }

    public setStyleValues(value: number, prop: any, itemId: number, param: 'color' | 'value', layout: any, changeEvent: any) {

        let selectedItem = layout.find((el: LayoutItemType) => el.i === itemId)

        const foundedProp: any = selectedItem.props?.styleProps[prop.name]
        foundedProp && (foundedProp[param] = value);
        changeEvent(layout)
    }

    public setWidgetCity(city: string, selectedItem: LayoutItemType) {
        if (selectedItem) {
            if (!selectedItem.props!.city) {
                selectedItem.props!.city = city;
            }
        }
    }

    protected setDeleteMode(itemId: any, state: boolean): void {
        this.layout.find(item => item.i === itemId)!.props!.isDeleteMode = state
    }

}

export type LayoutType = LayoutItemType[]

export type LayoutItemType = {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    i?: number | string;
    c?: string;
    isStatic?: boolean
    props?: PropsType
}

export type PropsType = {
    minW?: number
    minH?: number
    maxW?: number
    maxH?: number
    isLoading: boolean
    styleProps: StyleType
    preview: string
    isDeleteMode?: boolean
    city?: string
}

export type StyleType = {
    [key: string]: {
        name: string
        title: string
        el: string,
        color?: string
        value?: number | string
        params?: {
            min?: number
            max?: number
            step?: number
        }
    }
}

export type NewWidgetPropsType = {
    name: string,
    title: string,
    el: string,
    min?: number,
    max?: number,
    step?: number,
    value?: number,
    color?: string
}

