export function getScreenDimension(){
    const { innerWidth, innerHeight } = window;
    
    return { innerWidth, innerHeight };
}