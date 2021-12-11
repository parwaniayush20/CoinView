import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Navbar, Exchanges, Homepage, CryptoDetails, Cryptocurrencies, News } from "./components/index";

const year = new Date().getFullYear();

const App = () => {
    return (
        <div className="app">
            <div className="navbar" >
                <Navbar />
            </div>

            <div className="main" >
                <Layout>
                    <div className="routes">
                        <Routes>
                            <Route exact path="/" element={<Homepage />}>

                            </Route>
                            <Route exact path="/exchanges" element={<Exchanges />}>

                            </Route>
                            <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />}>

                            </Route>
                            <Route exact path="/crypto/:coinId" element={<CryptoDetails />}>

                            </Route>
                            <Route exact path="/news" element={<News />}>

                            </Route>
                        </Routes>
                    </div>
                </Layout>
                <div className="footer" >
                    <Typography.Title level={5} style={{ color: "white", textAlign: "right", fontWeight: "80", opacity: "0.5" }}>
                        <Typography.Title level={5} className="logo-footer">
                            <span style={{ color: "white", textAlign: "right", fontWeight: "100",}}>Select market data provided by </span> <Link to="">Coinranking</Link>
                        </Typography.Title>
                        © {year} CryptoView
                    </Typography.Title>
                </div>
            </div>

        </div>
    )
}

export default App;
