import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {

    return (
        <div>
            <h2>404 not found!</h2>
            <p>
                <Link to="/">Ir a Home</Link>
            </p>
        </div>
    )
}
export default NotFound;