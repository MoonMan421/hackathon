import {useEffect, useState} from "react";
import {Button, Input, Modal, Select, Table, Tooltip} from 'antd';
// import {
//   CaretDownOutlined,
//   CaretUpOutlined,
//   CopyOutlined,
//   ExclamationCircleFilled,
//   QuestionCircleOutlined,
// } from '@ant-design/icons';
// import {useNavigate} from "react-router-dom"
import '../App.css'
import { isMobile } from "react-device-detect";
import axios from "axios";
import 'antd/dist/antd.min.css';
import {getCurrentConfig} from "../config/config"
import useStore from '../store/useStore.js'
import useLocalStore from '../store/useLocalStore.js'
import {computePercentage} from "../utils/computePercentage";
import {prettifyNumber} from "../utils/prettifyNumber";

import assets from "../data/assets.js"

import {ChartComponent} from "../components/lineChart";
import {DoughnutChartComponent} from "../components/doughnutChart";

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pricesFetched, setPricesFetched] = useState(false);
  const [activeToken, setActiveToken] = useState('kuji')

  const contractAddress = getCurrentConfig().contractAddress;
  // const [chartFrequency, setChartFrequency] = useState('')
  const [dataArrayDay, setDataArrayDay] = useState([])
  const [dataArrayWeek, setDataArrayWeek] = useState([])
  const [tokenPrice, setTokenPrice] = useState([])
  const [dataArrayMonth, setDataArrayMonth] = useState([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [chartData, setChartData] = useState(dataArrayMonth)
  const [doughnutChartData, setDoughnutChartData] = useState([19,11,8,5,2,3,3,5,2,3])
  const [assetData, setAssetData] = useState(assets[0].distribution)
  const [selectedDropdown, setSelectedDropdown] = useState('usk')
  const [pricingData, setPricingData] = useState([])
  // zustand state variables
  // const nonSigningClient = useStore((state) => state.nonSigningClient)
  // const stargateClient = useStore((state) => state.stargateClient)
  // const offlineSigningClient = useLocalStore((state) => state.offlineSigningClient)

  const price = useStore((state) => state.indexPrice)
  const setPrice = useStore((state) => state.setIndexPrice);
  const kujiPrice = useStore((state) => state.kujiPrice)
  const setKujiPrice = useStore((state) => state.setKujiPrice);
  const redeemFee = useStore((state) => state.redeemFee)


  const columns = [
    {
      title: '',
      dataIndex: 'token',
      key: 'token',
      render: (text, record) => (
        <div className={"asset-row"}>
          <div className={"label-new"}>{record.bucket}</div>
        </div>
      )
    },
    {
      title: 'Share',
      dataIndex: 'index_share',
      key: 'index_share',
      render: (text, record) => (
        <div className={"asset-row"}>
          <div className={"label-new"}>{record.percentage.toFixed(2)}%</div>
        </div>
      )
    },
    {
      title: 'Token Amount',
      dataIndex: 'token_amount',
      key: 'token_amount',
      render: (text, record) => (
        <div className={"asset-row-last"}>
          <div className={"label-new"}>{prettifyNumber(record.amount)}</div>
        </div>
      )
    },
  ];

  const fetchChartPricesCoingecko = async () => {

    const token_denom = 'kujira'
    // let pricesWeekKuji = [];
    // let pricesWeek = [];
    let pricesMonth = [];
    let priceData = [];
    setIsLoading(true)

    let dataObject = [];

    try {
      // pricesWeekKuji = await axios.get("https://api.coingecko.com/api/v3/coins/kujira/market_chart?vs_currency=usd&days=7");
      // pricesWeek = await axios.get("https://api.coingecko.com/api/v3/coins/" + token_denom + "/market_chart?vs_currency=usd&days=7");
      priceData['kuji'] = await axios.get("https://api.coingecko.com/api/v3/coins/" + 'kujira' + "/market_chart?vs_currency=usd&days=10&interval=daily");
      priceData['mnta'] = await axios.get("https://api.coingecko.com/api/v3/coins/" + 'mantadao' + "/market_chart?vs_currency=usd&days=10&interval=daily");
      // priceData['wink'] = await axios.get("https://api.coingecko.com/api/v3/coins/" + 'winkhub' + "/market_chart?vs_currency=usd&days=10&interval=daily");
      // priceData['nstk'] = await axios.get("https://api.coingecko.com/api/v3/coins/" + 'unstake-fi' + "/market_chart?vs_currency=usd&days=10&interval=daily");
      // priceData['aqla'] = await axios.get("https://api.coingecko.com/api/v3/coins/" + 'aqualibre' + "/market_chart?vs_currency=usd&days=10&interval=daily");
      // priceData['nami'] = await axios.get("https://api.coingecko.com/api/v3/coins/" + 'nami-protocol' + "/market_chart?vs_currency=usd&days=10&interval=daily");
      // priceData['fuzn'] = await axios.get("https://api.coingecko.com/api/v3/coins/" + 'fuzion' + "/market_chart?vs_currency=usd&days=10&interval=daily");


      // await Promise.all(assets.map((asset) => {
      //   pricesMonth[asset.token] = axios.get("https://api.coingecko.com/api/v3/coins/" + asset.coingeckoId + "/market_chart?vs_currency=usd&days=30&interval=daily");
      // }))  

      // assets.map((asset) => {
      //   const currentPrice = 1.23
      //   console.log()
      //   const dataMonth = pricesMonth[asset.denom].data.prices.map(data => {
      //     const date = new Date(data[0]);
      //     const day = date.getDate();
      //     const month = date.getMonth()+1;
      //     return [day + "." +month, data[1]]
      //   })
      //   const currentDateFormatted = "12323"
      //   dataMonth.push([currentDateFormatted, currentPrice])
  
      //   console.log(dataMonth)
      //   dataObject.push({token: asset.token, data: dataMonth})

      // })

      console.log("dataObject", dataObject)

      const currentPrice = 1.23
      // const currentDate = new Date(pricesArrayWeek[pricesArrayWeek.length-1][0]);
      // const currentDateFormatted = currentDate.getDate() + "." + (currentDate.getMonth()+1) + ", " + currentDate.getHours() + ":" + currentDate.getMinutes()

      // Add last data point with current price
      // dataDay.push([currentDateFormatted, currentPrice])

      // Add last data point with current price
      // dataWeek.push([currentDateFormatted, currentPrice])
      assets.map((asset) => {
        console.log("priceData", priceData)
        if (priceData[asset.token] !== undefined) {
          const dataMonth = priceData[asset.token].data.prices.map(data => {
            const date = new Date(data[0]);
            const day = date.getDate();
            const month = date.getMonth()+1;
            return [day + "." +month, data[1]]
          })
          dataObject.push({token: asset.token, data: dataMonth})
          console.log(asset.token ,"pushed")
        }
      })

      // // Add last data point with current price
      // const currentDateFormatted = "12323"
      // dataMonth.push([currentDateFormatted, currentPrice])


      // dataObject = [{token: 'kuji', data: dataMonth}]
      // Set price data in Zustand
      // setPrice(currentPrice)
      // setKujiPrice(currentKujiPrice)
      // setDataArrayDay(dataDay)
      // setDataArrayWeek(dataWeek)
      // setDataArrayMonth(dataMonth)

      // console.log("dataMonth", dataMonth)
      console.log("dataObject", dataObject)
      // const dayPercentage = computePercentage(dataDay)
      // const weekPercentage = computePercentage(dataWeek)
      // const monthPercentage = computePercentage(dataMonth)

      setPricingData(dataObject)
      dataObject.length > 0 && setChartData(dataObject.find(({token}) => token === 'kuji').data) 
      setIsLoading(false)
    } catch (error) {
      // logError("coingeckoFetchPrices", error);
      setIsLoading(false)
      console.log("error", error)
      try {
        // setAllData(chainData);
      } catch (error) {
        // logError("coingeckoFetchPrices", error);
      }
    }
  }

  useEffect(() => {
    fetchChartPricesCoingecko()
  }, []);


const onChange = (index) => {
  setActiveIndex(index)
}

const onClick = (tokenName) => {
  setActiveToken(tokenName)
  setAssetData(assets.find(({token}) => token === tokenName).distribution)

  console.log("data", pricingData.find(({token}) => token === tokenName).data[pricingData.find(({token}) => token === tokenName).data.length-1])

  pricingData.filter(({token}) => token == tokenName).length > 0 && setChartData(pricingData.find(({token}) => token === tokenName).data) && setTokenPrice(pricingData.find(({token}) => token === tokenName).data[pricingData.find(({token}) => token === tokenName).data.length-1][1])
}


useEffect(() => {
  console.log("donutset ", assetData)
  setDoughnutChartData(assetData.map(x => [x.amount, x.color]))
}, [assetData])


  return (
    <div className={"main-content"}>
    <div className={isMobile ? "heading-mobile" : "heading"}>
      <div className={"line-container-left"}>
        <hr className={"line"}/>
      </div>
      <div className={"heading-text"}>
        The Kujira Ecosystem
        </div>
      <div className={"line-container-right"}>
        <hr className={"line"}/>
      </div>
      </div>
      <div className={"button-container"}>
        <Button type={activeToken === 'kuji' ? "ecoactive" : "ecoinactive"} onClick= {() => onClick('kuji')}>
          <div className={"eco-button-wrapper"}>
            <img
              src={`kuji-logo.png`}
              alt={'logo'}
              style={{height: "2em", margin: "auto"}}>
            </img>
            <div>
              KUJI
            </div>
          </div>
        </Button>
        <Button type={activeToken === 'mnta' ? "ecoactive" : "ecoinactive"} onClick= {() => onClick('mnta')}>
          <div className={"eco-button-wrapper"}>
            <img
              src={`mnta-logo.png`}
              alt={'logo'}
              style={{height: "2em", margin: "auto"}}>
            </img>
            <div>
              MNTA
            </div>
          </div>
        </Button>
        <Button type={activeToken === 'wink' ? "ecoactive" : "ecoinactive"} onClick= {() => onClick('wink')}>
          <div className={"eco-button-wrapper"}>
            <img
              src={`wink-logo.png`}
              alt={'logo'}
              style={{height: "2em", margin: "auto"}}>
            </img>
            <div>
              WINK
            </div>
          </div>
        </Button>
        <Button type={activeToken === 'nstk' ? "ecoactive" : "ecoinactive"} onClick= {() => onClick('nstk')}>
          <div className={"eco-button-wrapper"}>
            <img
              src={`nstk-logo.png`}
              alt={'logo'}
              style={{height: "2em", margin: "auto"}}>
            </img>
            <div>
              NSTK
            </div>
          </div>
        </Button>
        <Button type={activeToken === 'aqla' ? "ecoactive" : "ecoinactive"} onClick= {() => onClick('aqla')}>
          <div className={"eco-button-wrapper"}>
            <img
              src={`aqla-logo.png`}
              alt={'logo'}
              style={{height: "2em", margin: "auto"}}>
            </img>
            <div>
              AQLA
            </div>
          </div>
        </Button>
        <Button type={activeToken === 'nami' ? "ecoactive" : "ecoinactive"} onClick= {() => onClick('nami')}>
          <div className={"eco-button-wrapper"}>
            <img
              src={`nami-logo.png`}
              alt={'logo'}
              style={{height: "2em", margin: "auto"}}>
            </img>
            <div>
              NAMI
            </div>
          </div>
        </Button>
        <Button type={activeToken === 'fuzn' ? "ecoactive" : "ecoinactive"} onClick= {() => onClick('fuzn')}>
          <div className={"eco-button-wrapper"}>
            <img
              src={`fuzn-logo.png`}
              alt={'logo'}
              style={{height: "2em", margin: "auto"}}>
            </img>
            <div>
              FUZN
            </div>
          </div>
        </Button>
      </div>
      <div className={isMobile ? "top-section-eco-mobile" : "top-section-eco"}>
        <div className={isMobile ? "padding-bottom" : "left-container"}>
       
        <div className={isMobile ? "" : "doughnut-wrapper"}>
              <DoughnutChartComponent chartDataPassed={doughnutChartData} activeToken={activeToken} onChange={onChange} activeIndex={activeIndex} />
            </div>

        </div>
        <div className={isMobile ? "right-container-mobile" : "right-container-eco"}>
          <div className={"table-wrapper"}>
            <div className={"table-header"}>
              Initial Token Distribution
            </div>
           <Table
              columns={columns}
              rowClassName={(record, index) => activeIndex === index ? "table-row-clickable-active" : "table-row-clickable"}    
              dataSource={assetData}
              pagination={false}
              onRow={(record, rowIndex) => {
                return {
                  onMouseEnter: (event) => {setActiveIndex(rowIndex)}, // mouse enter row
                  onMouseLeave: (event) => {setActiveIndex(-1)}, // mouse leave row
                };
              }}
            />
          </div>
        </div>
        
      </div>
      <div className={isMobile ? "top-section-main-mobile" : "top-section-main"}>
        <div className={isMobile ? "left-container-mobile" : "left-container"}>
          <div className={"chart-container"}>
            <div className={"chart-container-top"}>
              <div className={"chart-label-container"}>
                <div className={"label-price"}>
                  {chartData.length !== 0 && activeToken.toUpperCase() + ' ' + chartData[chartData.length-1][1].toFixed(2) + '$' }
                </div>
              {chartData.length !== 0 && <div className={computePercentage(chartData) > 0 ? "label-percentage" : "label-percentage red"}>
                  {computePercentage(chartData) > 0 ? '+' : ''}
                  {computePercentage(chartData).toFixed(2)} %
                </div>}
              </div>
            </div>
            <div className={"chart-wrapper"}>
              {/* TODO: Add loader */}
            {!isLoading && chartData.length !== 0 && <ChartComponent data={chartData}/>}
            </div>
          </div>
        </div>
        <div className={isMobile ? "right-container-mobile" : "right-container"}>
          <div className={isMobile ? "description-container-mobile" : "description-container"}>
              {/* <div className={"index-logo-container"}>
                <img src={kjiLogoBig} alt={'kjiLogoBig'} className={"select-image"} height="75%" width="auto"/>
              </div> */}
              {/* <div className={"description"}><b>The Kujira Index (KJI) </b>is a weighted index that tracks the performance of token & DeFi products in the Kujira Ecosystem. The index is weighted based on the value of each token’s circulating supply. </div> */}
          </div>
        </div>
      </div>
    </div>

  );
}

export default MainPage;