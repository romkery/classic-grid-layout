function getStyles(this: any): Object {
    const styleObject: any = {
        border: `${this.model?.props?.styleProps.border?.value}px solid ${this.model?.props?.styleProps.border?.color}`,
        borderRadius: `${this.model?.props?.styleProps.borderRadius?.value}px`,
        background: this.model?.props?.styleProps.background?.color,
    }
    if (this.model?.props?.styleProps.borderColor) {
        styleObject.borderColor = `${this.model?.props?.styleProps.borderColor?.color}`
    }

    return styleObject;
}

export default getStyles
