import React from 'react';
import Header from "./Header/Header";
import {Outlet} from "react-router-dom";

const StaticLayout: React.FC = () => {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    );
};
export default StaticLayout;