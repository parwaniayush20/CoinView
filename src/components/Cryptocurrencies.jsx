import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Typography, Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from "../components/Loader";

const { Title } = Typography;

const Cryptocurrencies = ({ simplified }) => {

    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

        setCryptos(filteredData);
    }, [cryptosList, searchTerm]);

    if (isFetching) return <Loader />;

    return (
        <>
            {!simplified && (
                <div>
                    <div>
                        <Title level={3} className="heading">
                        This is your go-to page to see all available crypto assets 
                        </Title>
                        <p>
                        More than 99 coins are presented here. The default setting shows prices in USD and sorts crypto assets based on the market capitalization.
                        </p>
                    </div>
                    <div className="search-crypto">
                        <Input placeholder="Search coins here" onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>
            )}

            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((coinInfo) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={coinInfo.key}>
                        <Link to={`/crypto/${coinInfo.id}`}>
                            <Card
                                title={`${coinInfo.rank}. ${coinInfo.name}`}
                                extra={<img className="crypto-image" src={coinInfo.iconUrl} />}
                                hoverable
                                style={{ borderRadius: "11px" }}
                            >
                                <p>USD Price : {millify(coinInfo.price)}</p>
                                <p>Market Cap : {millify(coinInfo.marketCap)}</p>
                                <p>Daily Change : {millify(coinInfo.change)}%</p>
                                <p>Volume : {millify(coinInfo.volume)}</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies
