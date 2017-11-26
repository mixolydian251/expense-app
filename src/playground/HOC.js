import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuth ?
                <WrappedComponent {...props}/> :
                <p>Please login to view info.</p>
            }
        </div>
    )
};

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuth && <p>This is private info. Do not share.</p>}
            <WrappedComponent {...props}/>
        </div>
    )
};

const AdminInfo = requireAuthentication(withAdminWarning(Info));

ReactDOM.render(<AdminInfo isAuth={true} info="411"/>, document.getElementById('app'));