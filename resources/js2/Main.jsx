import './bootstrap';
import AOS from "aos";
import "aos/dist/aos.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect } from "react";
import '../css/app.css';

function App() {
    useEffect(() => {
        AOS.init({
            duration: 700, 
            offset: 120,   
            easing: "ease-out", 
            once: true,    
        });
    }, []);

    return (
        <div className="container mt-5">
        <h1 data-aos="fade-up">Welcome to AOS Integration</h1>
        <p data-aos="fade-right">This paragraph will animate from the right.</p>
        <button data-aos="zoom-in" className="btn btn-primary">Click Me</button>
    </div>
    );
}

export default App;