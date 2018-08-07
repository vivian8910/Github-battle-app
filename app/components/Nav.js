import React from 'react';
// if you want to dynamically change the style of the anchor tag based on if the route is active, use NavLink
import { NavLink } from 'react-router-dom';

export default function Nav() {
    return (
        <ul className = 'nav'>
            <li>
                <NavLink exact activeClassName = 'active' to = '/'>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName = 'active' to = '/battle'>
                    Battle
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName = 'active' to = '/popular'>
                    Popular
                </NavLink>
            </li>
        </ul>
        
    )
}
