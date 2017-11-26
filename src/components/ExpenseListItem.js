import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { removeExpense } from "../actions/expenses";
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ dispatch, id, description, amount, createdAt }) => {
    const formatAmount = () => {
        const length = amount.toString().length;
        const cents = amount.toString().slice(length - 2);
        const dollars = amount.toString().slice(0 ,length - 2);
        return `$${dollars}.${cents}`
    };

    return (
    <div className="expense-items">
        <Link to={`/edit/${id}`}
        ><h4>{description}</h4></Link>
        <p>{formatAmount()}</p>
        <p>{createdAt.format('MMM Do, YYYY')}</p>
    </div>
    )
};

export default connect()(ExpenseListItem)