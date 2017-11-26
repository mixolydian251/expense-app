import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Router from './routers/Router';
import configureStore from './store/configureStore'
import getVisibleExpenses from './selectors/expenses';
import { addExpense } from "./actions/expenses";
import { setTextFilter, sortByAmount } from "./actions/filters";
import 'normalize.css/normalize.css';
import './styles/style.scss';


const store = configureStore();

store.subscribe(() => {
    console.log(store.getState())
});

store.dispatch(addExpense({ description: 'Water Bill', amount: 5000 }));
store.dispatch(addExpense({ description: 'Gas Bill', amount: 2001 }));
store.dispatch(addExpense({ description: 'Phone Bill', amount: 3000 }));
store.dispatch(addExpense({ description: 'Cable Bill', amount: 7000 }));



const jsx = (
    <Provider store={store}>
        <Router/>
    </Provider>
);


ReactDOM.render(jsx, document.getElementById('app'));
