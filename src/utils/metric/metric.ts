declare global {
    interface Window {
        ym:any;
    }
}
export const sendMetrick=(type:string,value:string)=>{
    window.ym(95208419,type,value)
}