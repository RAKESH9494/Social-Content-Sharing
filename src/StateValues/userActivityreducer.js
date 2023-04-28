const initial ={}
export default function userActivityreducer(state = initial,action){
    const {type,payload} =action;
    switch(type){
        case  "SETACTIVITY":
            return {payload};
        default :
            return state;
    }
}
