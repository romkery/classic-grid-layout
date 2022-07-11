function getStyles(this: any): Object {
    return {
        border: `${this.model?.props?.styleProps.border?.value}px solid ${this.model?.props?.styleProps.border?.color}`,
        borderRadius: `${this.model?.props?.styleProps.borderRadius?.value}px`,
        background: this.model?.props?.styleProps.background?.color
    }
}

export default getStyles
