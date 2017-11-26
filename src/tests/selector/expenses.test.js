import moment from 'moment';
import getVisibleExpenses from '../../selectors/expenses'

const expenses = [
    {
        id: 1,
        description: 'Halloween',
        amount: 200,
        note: '',
        createdAt: moment('1993-10-31')
    }, {
        id: 2,
        description: 'Birthday',
        note: '',
        amount: 100,
        createdAt: moment('1993-11-11')
    }, {
        id: 3,
        description: 'Christmas',
        amount: 0,
        note: '',
        createdAt: moment('1993-12-25')
    },
];

test('should filter by text value', () => {
    const filters = {
        text: 'b',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined,
    };
    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[1]])
});

test('should filter by start date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment('1993-11-11'),
        endDate: undefined,
    };
    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[1]])
});

test('should filter by end date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment('1993-11-11'),
    };
    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[1], expenses[0]])
});

test('should filter by most recent date first', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined,
    };
    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[1], expenses[0]])
});

test('should filter by most largest amount first', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined,
    };
    const result = getVisibleExpenses(expenses, filters);
    expect(result).toEqual([expenses[0], expenses[1], expenses[2]])
});

