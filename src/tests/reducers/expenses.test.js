import expenseReducer from '../../reducers/expenses';
import {addExpense} from "../../actions/expenses";

const state = {};

const expenseData = {
    description: 'description',
    amount: 1234,
    none: '',
    createdAt: 0
};

test('should add an expense to the store', () => {
    const result = () => {
        return expenseReducer(state, addExpense(expenseData))
    }
});
