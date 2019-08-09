// create store implementation

const createStore = (reducer) =>  {
    var state;
    var listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return  () => {
            listeners= listeners.filter(l=>l!==listener)
        }
    };

    dispatch({});
    return { getState, dispatch, subscribe};
}


//combine reducer implementation
const combineReducer = reducers =>{
    return  (state ={},action) =>{
        return Object.keys(reducers).reduce((nextState,key)=>{ 
            nextState[key]=reducers[key](state[key],action);
            return nextState; 
        },{})
    }
}

//pure function
const reducer = (state = 0,action) =>{
    switch(action.type){
        case 'INC':{
            return state + 1;
        }
        case 'DEC':{
            return state - 1;
        }
        default:{
            return state
        }
    }
}

const action = (type,payload) =>{
    return {
        type:type,
        payload:payload
    }
}

//global store for an application 
let store = createStore(combineReducer({reducer}))

//event from view or ui (e.g button click)
const incrementAction = (payload) =>{
    store.dispatch(action('INC',payload))
}