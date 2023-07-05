export const required=(value:string)=>{
    if(value) return undefined
    return "field is required"
}

export const maxLengthCreator=(maxLength:number)=>(value:string)=>{
    if(value && value.length>maxLength) return `max length ${maxLength} symbols`
    return undefined
}