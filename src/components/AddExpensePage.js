import React from 'react';
import ExpenseForm from './ExpenseForm'
import { addExpense } from "../actions/expenses";
import { connect } from 'react-redux'

const AddExpensePage = (props) => {
    return (
        <div>
            <h1>Create an Expense</h1>
            <ExpenseForm
            onSubmitExpense={(expense) => {
                props.dispatch(addExpense(expense));

                // redirect user back to dashboard
                props.history.push('/')
            }}/>
        </div>
    );
};

export default connect()(AddExpensePage)
