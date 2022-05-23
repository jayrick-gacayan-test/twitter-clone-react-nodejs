import React, { useEffect, useState } from 'react';

import axios from 'axios';

/* components */
import TopNavigation from './layouts/TopNavigation';
const HomePage = () => {
    const [ text, setText ] = useState("");
    useEffect(
        () => {
            axios.get("http://localhost:3001/api")
                .then((response) => {
                    console.log(response);
                    setText(response.data.text);
                })
                .catch((err) => {
                        console.log(err);
                    }
                );
        },[]
    );

    return(
        <React.Fragment>
            <header>
                <TopNavigation />
            </header>
            <main className="container-fluid"
                style={{ marginTop: "100px" }}>
                <section className="container">
                    This is the home page.
                    { text }
                </section>
            </main>
        </React.Fragment>
        
    );
}

export default HomePage;