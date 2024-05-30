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
import TwitterIcon from "../logos/x-icon.png";
import WebsiteIcon from "../logos/website-icon.png";

import {ChartComponent} from "../components/lineChart";
import {ChartComponent as BarChartComponent} from "../components/barChart";
import {DoughnutChartComponent} from "../components/doughnutChart";
import {DoughnutChartComponentMnta} from "../components/doughnutChartMnta";
import {DoughnutChartComponentNstk} from "../components/doughnutChartNstk";
import {DoughnutChartComponentWink} from "../components/doughnutChartWink";
import {DoughnutChartComponentAqla} from "../components/doughnutChartAqla";
import {DoughnutChartComponentNami} from "../components/doughnutChartNami";
import {DoughnutChartComponentFuzn} from "../components/doughnutChartFuzn";


const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRevenueLoading, setIsRevenueLoading] = useState(false);
  const [pricesFetched, setPricesFetched] = useState(false);
  const [activeToken, setActiveToken] = useState('kuji')

  const contractAddress = getCurrentConfig().contractAddress;
  // const [chartFrequency, setChartFrequency] = useState('')
  const [dataArrayDay, setDataArrayDay] = useState([])
  const [dataArrayWeek, setDataArrayWeek] = useState([])
  const [tokenPrice, setTokenPrice] = useState([])
  const [description, setDescription] = useState(assets.find(({token}) => token === 'kuji').description)
  const [twitter, setTwitter] = useState(assets.find(({token}) => token === 'kuji').twitter)
  const [website, setWebsite] = useState(assets.find(({token}) => token === 'kuji').website)
  const [totalSupply, setTotalSupply] = useState(assets.find(({token}) => token === 'kuji').total_supply)
  const [dataArrayMonth, setDataArrayMonth] = useState([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [chartData, setChartData] = useState(dataArrayMonth)
  const [barChartData, setBarChartData] = useState(dataArrayMonth)
  const [doughnutChartData, setDoughnutChartData] = useState([])
  const [assetData, setAssetData] = useState(assets[0].distribution)
  const [selectedDropdown, setSelectedDropdown] = useState('usk')
  const [pricingData, setPricingData] = useState([])
  const [revenueData, setRevenueData] = useState([])
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
      priceData['wink'] = await axios.get("https://api.coingecko.com/api/v3/coins/" + 'winkhub' + "/market_chart?vs_currency=usd&days=10&interval=daily");
      priceData['nstk'] = await axios.get("https://api.coingecko.com/api/v3/coins/" + 'unstake-fi' + "/market_chart?vs_currency=usd&days=10&interval=daily");
      // priceData['aqla'] = await axios.get("https://api.coingecko.com/api/v3/coins/" + 'aqualibre' + "/market_chart?vs_currency=usd&days=10&interval=daily");
      // priceData['nami'] = await axios.get("https://api.coingecko.com/api/v3/coins/" + 'nami-protocol' + "/market_chart?vs_currency=usd&days=10&interval=daily");
      priceData['fuzn'] = await axios.get("https://api.coingecko.com/api/v3/coins/" + 'fuzion' + "/market_chart?vs_currency=usd&days=10&interval=daily");


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

  const fetchRevenueData = async () => {

    let revenueData = [];
    let oracleData = [];
    setIsRevenueLoading(true)
    let dataObject = [];

    try {
      revenueData['kuji'] = await axios.get("https://api.tinybird.co/v0/pipes/len_endpoint_kuji_rewards_staking_pipe.json?token=p.eyJ1IjogIjNiM2VmOTgyLTlmYzctNDBhMi1iOWE3LWNiZWI4MzEzNjlmNyIsICJpZCI6ICJjNjU2ZTIwZC02YTM0LTRhZmQtOWRmZS1kNWQ5MzIzNDk4NjgiLCAiaG9zdCI6ICJldV9zaGFyZWQifQ.StJaIxrpdIHyB1S9Tg2RBvRYVHqM__871zwcDzmXolo");
      revenueData['nstk'] = await axios.get("https://api.tinybird.co/v0/pipes/len_endpoint_kuji_unstaked_revenue_pipe.json?token=p.eyJ1IjogIjNiM2VmOTgyLTlmYzctNDBhMi1iOWE3LWNiZWI4MzEzNjlmNyIsICJpZCI6ICJjNjU2ZTIwZC02YTM0LTRhZmQtOWRmZS1kNWQ5MzIzNDk4NjgiLCAiaG9zdCI6ICJldV9zaGFyZWQifQ.StJaIxrpdIHyB1S9Tg2RBvRYVHqM__871zwcDzmXolo");
      oracleData = await axios.get("https://kujira-api.polkachu.com/oracle/denoms/exchange_rates")
      console.log(oracleData)
      console.log("data:", oracleData.data.exchange_rates.find(({denom}) => denom === 'KUJI') !== undefined)
      let kuji_price = oracleData.data.exchange_rates.find(({denom}) => denom === 'KUJI') !== undefined ? Number(oracleData.data.exchange_rates.find(({denom}) => denom === 'KUJI').amount) : 1.5;
      let fuzn_price =  oracleData.data.exchange_rates.find(({denom}) => denom === 'FUZN') !== undefined ? Number(oracleData.data.exchange_rates.find(({denom}) => denom === 'FUZN').amount) : 0.027;

      console.log("prices", kuji_price, fuzn_price)

      assets.map((asset) => {
        // console.log("revenueData", revenueData)
        if (revenueData[asset.token] !== undefined) {
          if (asset.token === 'kuji') {
            const dataMonth = revenueData[asset.token].data.data.map(data => {
              const date = new Date(data.day);
              const day = date.getDate();
              const month = date.getMonth()+1;
              return [day + "." +month, data.token_amount]
            })
            dataObject.push({token: asset.token, data: dataMonth.reverse()})
          }
          if (asset.token === 'nstk') {
            const dataMonth = revenueData[asset.token].data.data.map(data => {
              const date = new Date(data.day);
              const day = date.getDate();
              const month = date.getMonth()+1;
              return (data.denom === 'fuzn' ? [day + "." +month, data.Swapped_Total * fuzn_price] : [day + "." +month, data.Swapped_Total * kuji_price])
            })
            console.log("nstk", dataMonth)
            const combinedData = dataMonth.reduce((acc, cur)=> {
              const found = acc.find(val => val[0] === cur[0])
              if(found){
                found[1]+=Number(cur[1])
              }
              else{
                acc.push([cur[0], Number(cur[1])])
              }
              return acc
          }, [])
            dataObject.push({token: asset.token, data: combinedData.slice(0,14).reverse()})
          }
        }
      })

      console.log("dataObjectRevenue", dataObject)

      setRevenueData(dataObject)
      dataObject.length > 0 && setBarChartData(['KUJI', dataObject.find(({token}) => token === 'kuji').data]) 
      setIsRevenueLoading(false)
    } catch (error) {
      // logError("coingeckoFetchPrices", error);
      setIsRevenueLoading(false)
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
    fetchRevenueData()
  }, []);


const onChange = (index) => {
  setActiveIndex(index)
}

const onClick = (tokenName) => {
  setActiveToken(tokenName)
  setAssetData(assets.find(({token}) => token === tokenName).distribution)
  setDescription(assets.find(({token}) => token === tokenName).description)
  setTwitter(assets.find(({token}) => token === tokenName).twitter)
  setWebsite(assets.find(({token}) => token === tokenName).website)
  setTotalSupply(assets.find(({token}) => token === tokenName).total_supply)

  // console.log("data", pricingData.find(({token}) => token === tokenName).data[pricingData.find(({token}) => token === tokenName).data.length-1])

  pricingData.filter(({token}) => token === tokenName).length > 0 && setChartData(pricingData.find(({token}) => token === tokenName).data)
  revenueData.filter(({token}) => token === tokenName).length > 0 && setBarChartData(['USD', revenueData.find(({token}) => token === tokenName).data])
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
      <div className={"eco-description-container"}>
              <div className={"description"}>{description}</div>
              <div className={"icon-container"}>
                <a href={twitter} target="_blank" rel="noreferrer">
                  <img src={TwitterIcon} alt={'Twitter Icon'} className={"select-image"} height="20px" width="auto"/>
                </a>
                <a href={website} target="_blank" rel="noreferrer">
                  <img src={WebsiteIcon} alt={'Website Icon'} className={"select-image"} height="20px" width="auto"/>
                </a>
              </div>
          </div>
      <div className={isMobile ? "top-section-eco-mobile" : "top-section-eco"}>
        <div className={isMobile ? "padding-bottom" : "left-container"}>
       
        <div className={isMobile ? "" : "doughnut-wrapper"}>
             {activeToken === 'mnta' && <DoughnutChartComponentMnta chartDataPassed={doughnutChartData} activeToken={activeToken} onChange={onChange} activeIndex={activeIndex} /> }
             {activeToken === 'kuji' && <DoughnutChartComponent chartDataPassed={doughnutChartData} activeToken={activeToken} onChange={onChange} activeIndex={activeIndex} /> }
             {activeToken === 'nstk' && <DoughnutChartComponentNstk chartDataPassed={doughnutChartData} activeToken={activeToken} onChange={onChange} activeIndex={activeIndex} /> }
             {activeToken === 'aqla' && <DoughnutChartComponentAqla chartDataPassed={doughnutChartData} activeToken={activeToken} onChange={onChange} activeIndex={activeIndex} /> }
             {activeToken === 'nami' && <DoughnutChartComponentNami chartDataPassed={doughnutChartData} activeToken={activeToken} onChange={onChange} activeIndex={activeIndex} /> }
             {activeToken === 'fuzn' && <DoughnutChartComponentFuzn chartDataPassed={doughnutChartData} activeToken={activeToken} onChange={onChange} activeIndex={activeIndex} /> }
             {activeToken === 'wink' && <DoughnutChartComponentWink chartDataPassed={doughnutChartData} activeToken={activeToken} onChange={onChange} activeIndex={activeIndex} /> }

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
            <div className={"outer-box"}>
              <div className={"total-supply"}>
                <div>Total Supply</div>
                <div> {prettifyNumber(totalSupply)}</div>
              </div>
            </div>
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
        <div className={isMobile ? "right-container-mobile" : "right-container-eco"}>
        <div className={"chart-container"}>
            <div className={"chart-container-top"}>
              <div className={"chart-label-container"}>
                <div className={"label-price"}>
                  Revenue
                </div>
              </div>
            </div>
            <div className={"chart-wrapper"}>
              {(activeToken === 'kuji' || activeToken === 'nstk' ) && barChartData.length !== 0 && <BarChartComponent data={barChartData}/>}
              {(activeToken === 'mnta' || activeToken === 'fuzn' ) && 'Revenue data coming soon!'}
              {!(activeToken === 'kuji' || activeToken === 'nstk' || activeToken === 'mnta' || activeToken === 'fuzn' ) && 'Token does not capture any revenue yet.'}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default MainPage;