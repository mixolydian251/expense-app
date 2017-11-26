import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ setNumber } = {}) => ({
    type: 'SET',
    setNumber
});

const resetCount = () => ({ type: 'RESET' });

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            const increaseBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return {
                count: state.count + increaseBy
            };
        case 'DECREMENT':
            const decreaseBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                count: state.count - decreaseBy
            };
        case 'RESET':
            return {
                count: 0
            };
        case 'SET':
            return{
                count: action.setNumber
            };
        default:
            return state;
    }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(resetCount());

store.dispatch(setCount({ setNumber: 50 }));

store.dispatch(incrementCount({ incrementBy: 50 }));

store.dispatch(decrementCount({ decrementBy : 666 }));

unsubscribe();





