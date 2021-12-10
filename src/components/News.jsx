import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "../components/Loader";

const demoImage = "/images/demoImage.jpg";
const { Text, Title } = Typography;
const { Option } = Select;


const News = ({ simplified }) => {
    const [newsCategory, setnewsCategory] = useState("Cryptocurrency")
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 11 : 38 });
    const { data } = useGetCryptosQuery(100);

    if (!cryptoNews?.value) return <Loader />
    console.log(cryptoNews);

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Title level={3} className="heading">
                        Daily news roundup
                    </Title>
                    <p>
                        Follow what's happening with real-time updates from around the world.
                    </p>
                    <Select
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={(value) => setnewsCategory(value)}
                        filterOption={(input, option) => option.indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )}
            {cryptoNews.value.map((newsItem, index) => (
                <Col xs={24} sm={12} md={12} lg={12} xl={8} key={index}>
                    <Card hoverable style={{ borderRadius: "11px" }} className="news-card">
                        <a href={newsItem.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={5}>
                                    {newsItem.name}
                                </Title>
                                <img style={{ maxHeight: "80px", maxWidth: "80px", borderRadius: "10%" }} src={newsItem?.image?.thumbnail?.contentUrl || demoImage} alt="News" />
                            </div>
                            <p style={{ fontSize: "13px" }}>
                                {newsItem.description > 50
                                    ? '${newsItem.description.substring(0,50)}...'
                                    : newsItem.description
                                }
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={newsItem.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                                    <Text style={{ fontSize: "13px", marginLeft: "7px" }}>
                                        {newsItem.provider[0]?.name}
                                    </Text>
                                </div>
                                <Text style={{ fontSize: "13px", marginTop: "3px" }}>
                                    {moment(newsItem.datePublished).startOf('ss').fromNow()}
                                </Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News

