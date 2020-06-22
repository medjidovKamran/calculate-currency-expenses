import React from 'react';
import {connect} from "react-redux";
import {ADD_EXPENSE, CLEAR_EXPENSES} from "./ActionTypes/ActionTypes";
import {v4 as uuidv4} from 'uuid';

import ExpensesList from "./components/ExpensesList";
import OutputList from "./components/OutputList";
import Total from "./components/Total";
import Form from "./components/Form";
import {accessKey} from './default.json'
import {groupBy} from "./Helpers/groupBy";

function App({addExpenseAction, groupedExpenses, clearExpensesAction}) {
    const [query, setQuery] = React.useState('')
    const [totalAmount, setTotalAmount] = React.useState(0)
    const [currentCurrency, setCurrentCurrency] = React.useState('')
    const [showList, setShowList] = React.useState(false)
    const [expenses, setExpenses] = React.useState([])

    const getLatestCurrency = async (currency) => {
        const fetchLink = `http://data.fixer.io/api/latest?access_key=${accessKey}&symbols=${currency}`
        const fetched = await fetch(fetchLink)

        return await fetched.json()
    }

    const calculateAmount = async (currency) => {
        let total = 0;
        const rate = await getLatestCurrency(currency)

        expenses.forEach(item => {
            if (item.currency === currency) {
                total += +item.cost
            } else {
                total += +rate.rates[currency] * +item.cost
            }
        })
        setTotalAmount(total)
    }


    const clearExpenses = date => {
        if (date) {
            const filtered = expenses.filter(item => item.date !== date)
            const groupedByDate = groupBy(filtered, 'date')

            addExpenseAction(groupedByDate)
            setExpenses(filtered)
        } else {
            clearExpensesAction([])
            setExpenses([])
            setShowList(false)
        }

        setTotalAmount(0)
    }

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const showListHandler = () => {
        if (expenses.length) {
            setShowList(true)
        }
    }

    const checkCurrency = (currency) => {
        if (currency) {
            calculateAmount(currency)
            setCurrentCurrency(currency)
            setShowList(true)
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        const uuid = uuidv4()
        const [action, date, cost, currency, name] = query.trim().split(' ')
        const newExpenses = [...expenses, {id: uuid, action, date, cost, currency, name}]
        const groupedByDate = groupBy([...expenses, {id: uuid, action, date, cost, currency, name}], 'date')

        switch (action) {
            case 'add':
                setExpenses(newExpenses)
                addExpenseAction(groupedByDate)
                break;
            case 'clear':
                const [, date] = query.split(' ')
                clearExpenses(date)
                break;
            case 'list':
                showListHandler()
                break;
            case 'total':
                const [, currency] = query.split(' ')
                checkCurrency(currency)
                break;
            default:
                console.error('unknown action')
        }
        setQuery('')
    }

    return (
        <div className="container">
            <div className="mt-5">
                <Form
                    handleChange={handleChange}
                    onSubmitHandler={onSubmitHandler}
                    query={query}
                    setQuery={setQuery}
                    clearExpenses={clearExpenses}
                    expenses={expenses}
                />
                <div className="row mt-5">
                    <div className="col-md-6">
                        <ExpensesList
                            expenses={groupedExpenses}
                            showList={showList}
                            clearExpenses={clearExpenses}
                        />
                    </div>
                    <div className="col-md-6">
                        <OutputList expenses={expenses}/>
                    </div>
                </div>
                <Total currentCurrency={currentCurrency} totalAmount={totalAmount}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    groupedExpenses: state.expenses
})

const mapDispatchToProps = (dispatch) => ({
    addExpenseAction: (expense) => dispatch({type: ADD_EXPENSE, payload: expense}),
    clearExpensesAction: (filtered) => dispatch({type: CLEAR_EXPENSES, payload: filtered}),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
