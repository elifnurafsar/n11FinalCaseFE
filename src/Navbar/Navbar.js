import {Link} from "react-router-dom"
import React from 'react'
import logo from '../Images/logo.svg'
import { useState, Suspense, useEffect } from 'react';

export default function NavbarAdmin(){

    
    return(
        <div className="navbar">
            <div className="logo">
                <img  style={{ width: "100px", height: "100px"}}  src={logo} alt="Logo"/>
            </div>
            <div className="navbar-sub"  style={{flexGrow:1}}>
                <div className="underLine2 hide_on_responsive" style={{ textDecoration: 'none' }}>
                    <Link className="link" to="/"><span>Home</span></Link>
                </div>
                <div className="underLine2 hide_on_responsive" style={{ textDecoration: 'none' }}>
                    <Link className="link" to="/Suggestions">{"Suggestions"}</Link>
                </div>
            </div>
            <div className="navbar-sub"  style={{flexGrow:1}}>
                <div className="underLine2 hide_on_responsive" style={{ textDecoration: 'none' }}>
                    <Link className="link" to="/"><span>Logout</span></Link>
                </div>
            </div>
        </div>
    )
}