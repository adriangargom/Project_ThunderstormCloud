
export enum ChipStylesEnum {
    Static,
    Dynamic
}

export const chipStyleAttributes: {[key in ChipStylesEnum]: string} = {
    [ChipStylesEnum.Static]: 'bg-blue-400',
    [ChipStylesEnum.Dynamic]: 'bg-purple-400 hover:bg-purple-500 cursor-pointer'
}