import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import {editExpense, removeExpense} from "../actions/expenses";

const EditExpensePage = (props) => {
    return (
        <div>
            <h1>Create an Expense</h1>
            <ExpenseForm
                expense={props.expense}
                onSubmitExpense={(expense) => {
                    props.dispatch(editExpense(props.expense.id, expense));
                    // redirect user back to dashboard
                    props.history.push('/')
                }}/>

            <button onClick={() => {
                props.dispatch(removeExpense({ id: props.expense.id }));
                props.history.push('/')
            }}>
                remove
            </button>

        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    }
};

export default connect(mapStateToProps)(EditExpensePage);
