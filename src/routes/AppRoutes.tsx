import React from 'react';
import Dashboard from "../layout/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Analytics from '../pages/Analytics';

export interface IRouteChildren {
    path: string;
    component: () => React.JSX.Element;
    protected: boolean;
}

export interface IRoute {
    path: string;
    component: () => React.JSX.Element;
    protected: boolean;
    children: (() => IRouteChildren[]) | null; 
}

export const routes: IRoute[] = [
    {
        path: '/signup',
        component: () => <Signup />,
        protected: false,
        children: null
    },
    {
        path: '/',    
        component: () => <Login />,
        protected: false,
        children: null
    },
    {
        path: '/dashboard',
        component: () => <Dashboard />,
        protected: true,
        children: () => [ 
            {
                path: '/',
                component: () => <Analytics />,
                protected: true,
            },
        ],
    }
];