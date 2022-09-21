function getStyles(this: any): Object {
    const styleObject: any = {
        border: `${this.model?.props?.styleProps.border?.value / 16}rem solid ${this.model?.props?.styleProps.border?.color}`,
        borderRadius: `${this.model?.props?.styleProps.borderRadius?.value / 16}rem`,
        background: this.model?.props?.styleProps.background?.color,
    }
    if (this.model?.props?.styleProps.borderColor) {
        styleObject.borderColor = `${this.model?.props?.styleProps.borderColor?.color}`
    }

    return styleObject;
}

export default getStyles
