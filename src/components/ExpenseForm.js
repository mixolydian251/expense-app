import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class ExpenseForm extends React.Component {
    state = {
        description: this.props.expense ? this.props.expense.description : '',
        note: this.props.expense ? this.props.expense.note : '',
        amount: this.props.expense ? (this.props.expense.amount / 100) : '',
        createdAt: this.props.expense ? this.props.expense.createdAt : moment(),
        calendarFocused: false,
        error: false
    };
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;

        if (!amount || amount.match(/^\d+(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };
    onDateChange = (createdAt) => {
        this.setState(() => ({ createdAt }));
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };
    SubmitExpense = (e) => {
        e.preventDefault();
        if (this.state.description && this.state.amount){
            this.setState(() => ({ error: false }));
            this.props.onSubmitExpense({
                description: this.state.description,
                amount: Number(this.state.amount) * 100,
                createdAt: this.state.createdAt,
                note: this.state.note
            });
        } else {
            this.setState(() => ({ error: true }))
        }

    };
    render() {
        return (
            <div>
                <form onSubmit={this.SubmitExpense}>
                    <input
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
          </textarea>
                    <button>Add Expense</button>
                </form>
                {this.state.error && <p>Please enter a description and amount</p>}
            </div>
        )
    }
}

export default ExpenseForm;