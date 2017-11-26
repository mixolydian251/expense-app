
export const expensesReducerDefaultState = [];

// state for this reducer returns a single array, independent from 'filters reducer'

export default ( state = expensesReducerDefaultState, action ) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter( ({ id }) => id !== action.id );
        case 'EDIT_EXPENSE':
            return state.map((element) => {
                if (element.id === action.id){
                    return {
                        ...element,
                        ...action.updates
                    }
                }
                return element
            });
        default:
            return state;
    }
};