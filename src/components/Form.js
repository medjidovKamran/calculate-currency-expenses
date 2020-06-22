import React from 'react';

const Form = ({query, setQuery, handleChange, onSubmitHandler, expenses, clearExpenses}) => {
    return (
        <>
            <h5>Calculate your expenses</h5>
            <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <label>Type youre command</label>
                    <input
                        value={query}
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                    />
                    <small className="form-text text-muted mb-2">
                        As examples (can click) <b>
                    </b>
                    </small>
                    <div className="btn-group-sm">
                        <button
                            type="button"
                            className="btn btn-outline-primary mr-2"
                            onClick={() => setQuery('add 2017-04-25 3 EUR “French fries”')}
                        >
                            add 2017-04-25 3 EUR “French fries”
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-primary mr-2"
                            onClick={() => setQuery('add 2017-04-26 2.5 PLN Sweets')}
                        >
                            add 2017-04-26 2.5 PLN Sweets
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-primary mr-2"
                            onClick={() => setQuery('add 2017-04-27 12 USD Jogurt')}
                        >
                            add 2017-04-27 12 USD Jogurt
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => setQuery('list')}
                        >
                            list
                        </button>
                    </div>

                </div>
                <button
                    type="submit"
                    className="btn btn-success mr-2"
                >
                    Submit
                </button>
                {
                    !!expenses.length &&
                    <button
                        type="reset"

                        className="btn btn-danger"
                        onClick={() => clearExpenses()}
                    >
                        Clear all
                    </button>
                }
            </form>
        </>
    );
};

export default Form;