import masterData from "./MasterData";

export function getData(type){
    if ( masterData.hasOwnProperty ( type ) ){
        return masterData[type];
    } else if (type === "all"){
        return masterData;
    } else {
        return null
    }
}