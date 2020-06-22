import React from 'react';

const Total = ({totalAmount, currentCurrency}) => {
    return (
        <div className="mt-5">
            {!!totalAmount && <h5>Total: {totalAmount} {currentCurrency}</h5>}
        </div>

    );
};

export default Total;