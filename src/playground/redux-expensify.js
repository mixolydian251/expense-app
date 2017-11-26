import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// Expense Actions

const addExpense = ({ description = '', note = '', amount = 0, createdAt = ''}) => ({
   type: 'ADD_EXPENSE',
   expense: {
       id: uuid(),
       description,
       note,
       amount,
       createdAt,
   }
});

const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const editExpense = ( id, updates ) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// Expenses Reducer

const expensesReducerDefaultState = [];

// state for this reducer returns a single array, independent from 'filters reducer'
const expensesReducer = ( state = expensesReducerDefaultState, action ) => {
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

// Filter Actions

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT',
    text
});

const sortByAmount = () => ({ type: 'SORT_BY_AMOUNT' });
const sortByDate = () => ({ type: 'SORT_BY_DATE' });

const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
});
const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate
});

// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_TEXT':
            return {
                ...state,
                text: action.text,
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount',
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date',
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate,
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate,
            };
        default:
            return state;
    }
};

// Visible Data

const getVisibleExpenses = ( expenses, { text, sortBy, startDate, endDate } ) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = typeof text !== 'string' ||
              expense.description.toLowerCase().includes(text.toLowerCase()) ||
              expense.note.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch
    }).sort(( a, b ) => {
        if (sortBy === 'date'){
            return b.createdAt - a.createdAt
        } else if (sortBy === 'amount'){
            return b.amount - a.amount
        }
    })
};

// Store creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer,
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses( state.expenses, state.filters );
    console.log(visibleExpenses)
});

const expense1 = store.dispatch(addExpense({
    description: 'This month\'s rent',
    note: 'This needs to be turned in by the 5th of the month.',
    amount: 1000,
    createdAt: 1000
}));

const expense2 = store.dispatch(addExpense({
    description: 'Coffee',
    note: 'Yum, coffee!',
    amount: -1000,
    createdAt: 0
}));

store.dispatch(addExpense({ description: 'SSD', note: 'coffee', createdAt: -1000}));
store.dispatch(addExpense({ description: 'Sushi', createdAt: 2000}));

store.dispatch(sortByAmount());

// store.dispatch(setTextFilter('COF'));
// store.dispatch(removeExpense({ id: expense1.expense.id }));
// store.dispatch(editExpense( expense2.expense.id, { amount: 666 } ));
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter(''));
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate(10025));
// store.dispatch(setEndDate(150));
// store.dispatch(setStartDate());



