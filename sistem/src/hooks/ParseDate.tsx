export const ParseToDate=(fecha:Date):string=>{
   
    return  fecha.getMonth()+1 + '-' + fecha.getDate() + '-' + fecha.getFullYear();
}