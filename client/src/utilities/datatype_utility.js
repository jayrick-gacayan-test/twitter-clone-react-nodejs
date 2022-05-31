export function isObject(value){
    if(value === null) return false;

    return typeof value === 'object';
}