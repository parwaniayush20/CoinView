import React from 'react';
import millify from 'millify';
import { Row, Collapse, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import Loader from "../components/Loader";
import { useGetExchangesQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const { data, isFetching } = useGetExchangesQuery();
    const exchangesList = data?.data?.exchanges;

    if (isFetching) return <Loader />;

    return (
        <>
            <div style={{ marginBottom: "25px" }}>
                <Title level={3} className="heading">
                    Top Cryptocurrency Spot Exchanges
                </Title>
                <p>
                    There’s no one crypto exchange that’s best for every user, says Tyrone Ross, a financial advisor and CEO of Onramp Invest, a crypto investment platform for financial advisors.
                </p>
            </div>
            <Row>
                {exchangesList.map((exchange) => (
                    <Col span={24}>
                        <Collapse>
                            <Panel
                                key={exchange.id}
                                forceRender={true}
                                header={(
                                    <Row key={exchange.id}>
                                        <Row span={12}>
                                            <Text><strong>{exchange.rank}.</strong></Text>
                                            <Avatar className="exchange-image" src={exchange.iconUrl} />
                                            <Text><strong>{exchange.name}</strong></Text>
                                        </Row>

                                    </Row>
                                )}
                            >
                                {HTMLReactParser(exchange.description || '')}
                                <div className="exchange-item">
                                    {<Row span={24}>
                                        <Col span={8}>Total volume: ${millify(exchange.volume)}</Col>
                                        <Col span={8}>Number of markets: {millify(exchange.numberOfMarkets)}</Col>
                                        <Col span={8}>Market share: {millify(exchange.marketShare)}%</Col>
                                    </Row>}
                                </div>
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Exchanges;
