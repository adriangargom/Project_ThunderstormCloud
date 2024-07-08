
export enum ColorStylesEnum {
    Default,
    DefaultLight,
    Danger,
    Warning
}

export const colorStyleAttributes: {[key in ColorStylesEnum]: string} = {
    [ColorStylesEnum.Default]: 'bg-purple-500 hover:bg-purple-600',
    [ColorStylesEnum.DefaultLight]: 'bg-purple-400 hover:bg-purple-300',
    [ColorStylesEnum.Danger]: 'bg-red-500 hover:bg-red-600',
    [ColorStylesEnum.Warning]: 'bg-yellow-500 hover:bg-yellow-600'
}