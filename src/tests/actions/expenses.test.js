import { addExpense, editExpense, removeExpense } from "../../actions/expenses";
import moment from 'moment';

test('should setup remove expense action object', () => {
   const action = removeExpense({ id: 'someId'});
   expect(action).toEqual({
       type: 'REMOVE_EXPENSE',
       id: "someId"
   })
});

test('should setup edit expense action object', () => {
    const action = editExpense( 'someId' , {
        description: 'Some description',
        note: 'Some note',
        createdAt: 1234,
        amount: 1234
    });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: "someId",
        updates: {
            description: 'Some description',
            note: 'Some note',
            createdAt: 1234,
            amount: 1234
        }
    })
});

test('should setup add expense action object when values are passed in', () => {
    const expenseData = {
        description: 'description',
        amount: 1234,
        note: 'note',
        createdAt: 100
    };

    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseData
        }
    })
});

test('should setup default add expense action object', () => {
    const expenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: moment(0),
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseData
        }
    })
});