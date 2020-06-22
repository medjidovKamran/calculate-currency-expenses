import React from 'react';

const OutputList = ({expenses}) => {
    return (
        <div>
            <h5>Output:</h5>
            <hr/>
            {Object.values(expenses).map((item) =>
                <div className="flex-md-row" key={item.id}>
                    <span className="badge badge-warning badge-pill">{item.action} </span>
                    <small>
                        {item.date} <br/>
                        {item.name} {item.cost} {item.currency}
                    </small>
                </div>
            )}
        </div>
    );
};

export default OutputList;