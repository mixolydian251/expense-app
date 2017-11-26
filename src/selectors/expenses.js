import moment from 'moment';

// returns filtered and sorted data

export default ( expenses, { text, sortBy, startDate, endDate } ) => {
    return expenses.filter((expense) => {
        const startDateMatch = startDate ? startDate.startOf('day').isSameOrBefore(expense.createdAt) : true;
        const endDateMatch = endDate ? endDate.endOf('day').isSameOrAfter(expense.createdAt) : true;
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