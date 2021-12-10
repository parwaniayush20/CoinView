import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from "../components/index";
import Loader from "../components/Loader";

const { Title } = Typography;


const Homepage = () => {

    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;

    if (isFetching) return <Loader />;

    return (
        <>
            <Title level={3} className="heading">Global Crypto Stats</Title>
            <Row >
                <Col span={12}>
                    <Statistic title="Base :" value={globalStats.base} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Cryptocurrencies :" value={globalStats.total} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Exchanges :" value={millify(globalStats.totalExchanges)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Market Cap :" value={millify(globalStats.totalMarketCap)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total 24h Volume :" value={millify(globalStats.total24hVolume)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Markets :" value={millify(globalStats.totalMarkets)} />
                </Col>
            </Row>
            <div className="home-heading-container">
                <Title level={3} className="home-title">
                    Editor's picks
                </Title>
                <Title level={5} className="show-more">
                    <Link to="/cryptocurrencies">
                        Show more assets
                    </Link>
                </Title>
            </div>

            <Cryptocurrencies simplified={true} />

            <div className="home-heading-container">
                <Title level={3} className="home-title">
                    News Snaps
                </Title>
                <Title level={5} className="show-more">
                    <Link to="/news">
                       Show more events
                    </Link>
                </Title>
            </div>
            <News simplified />
        </>
    )
}

export default Homepage
