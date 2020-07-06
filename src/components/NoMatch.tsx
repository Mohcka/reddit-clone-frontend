import React from 'react';
import { RouteProps } from 'react-router';

const NoMatch: React.FC<RouteProps> = props => (
    <div className="container-fluid">
        <h2>404 - Page not found</h2>
    </div>
);

export default NoMatch;