import React from 'react';
import {v4 as uuidv4} from 'uuid';

const ExpensesList = ({expenses, showList}) => {
    const expensesKeys = Object.keys(expenses).sort()

    return (
        <div>
            <h5>Expenses List: </h5>
            <hr/>
            <ul className="list-group">
                {
                    !!expensesKeys.length && showList &&
                    expensesKeys.map(key =>
                        <li key={uuidv4()}
                            className="list-group-item d-flex justify-content-between align-items-center ">
                            <div className="flex-column">
                                {expenses[key].map(item =>
                                    <small key={item.id}>
                                        {item.name} - {item.cost} {item.currency}<br/>
                                    </small>
                                )}
                            </div>
                            <span className="badge badge-primary">{key}</span>
                        </li>
                    )
                }
                {!expenses.length && !showList && <small>You have not added your expenses yet.</small>}
                {!!expenses.length && !showList && <small>To see the list, enter the <b>list</b> command</small>}
            </ul>
        </div>

    );
};

export default ExpensesList;