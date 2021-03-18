import { ChartData, Line } from 'react-chartjs-2'
import * as chartjs from 'chart.js'
import { Col, Typography } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import './style.less'
import { IPredictFund } from 'store/actions/fundPredicAction'
import { useEffect, useState } from 'react'
import { IForm } from 'interface'
import { IFund } from 'store/actions/fundAction'
import './style.less'

const { Paragraph, Title } = Typography
interface IProps {
  fundSet: IFund[]
  fundPredict: IPredictFund[]
  input: IForm
}

function GrowthRate(props: IProps) {
  const { fundSet, fundPredict, input } = props
  const [dep, setDep] = useState<any[]>([])
  const [bal, setBal] = useState<any[]>([])
  const [goal, setGoal] = useState<boolean>(false)
  // console.log(fundPredict)
  useEffect(() => {
    if (fundPredict) {
      const dates = fundPredict[0].date
      // setDate(dates.map((element) => new Date(element)))
      const dep = dates.map((date, acc) => ({
        t: new Date(date),
        y: input.initBalance + acc * input.perMonthBalance,
      }))
      let units: any = {}
      fundSet.forEach((element) => (units[element.project_id] = []))
      // console.log(units)
      let sum: any[] = []
      fundPredict.forEach((fund) => {
        const fundData = fundSet.find(
          (element) => element.project_id === fund.project_id,
        )

        fund.date.forEach((element, key) => {
          if (key === 0) {
            const value =
              (input.initBalance * Number(fundData?.percentage)) /
              100 /
              fund.nav[key]
            units[fund.project_id][key] = value
            // console.log(units[fund.project_id][key])
            // console.log(fundData)
          } else {
            const value =
              (input.perMonthBalance * Number(fundData?.percentage)) /
                100 /
                fund.nav[key] +
              units[fund.project_id][key - 1]
            units[fund.project_id][key] = value
            // console.log(units[fund.project_id][key])
          }
          if (!sum[key]) {
            sum[key] = units[fund.project_id][key] * fund.nav[key]
            // console.log(units[fund.project_id][key], fund.nav[key],sum[key])
          } else {
            sum[key] += units[fund.project_id][key] * fund.nav[key]
          }
        })
        // let sum: any[] = []
        // for(let key in units){
        //   units[key].forEach((element:number, index:number)=> {
        //     sum[index] = {t: dates[index], y: }
        //   })
        // }
      })

      // dates.map((date, index) => {
      //   let sum = 0
      //   for (let key in units){
      //     sum = units[key][index]*
      //   }
      // })
      // console.log(units)
      // const bal = dates.map((date, acc)=>({
      //   t: new Date(date),
      //   y:
      // }))
      const bal = sum.map((element, index) => ({
        t: dates[index],
        y: Number(element.toFixed(2)),
      }))
      // console.log(bal)
      // console.log(dep)
      const index = bal.length - 1
      const val = bal[index].y
      if (input.goal > val) setGoal(false)
      else setGoal(true)

      setDep(dep)
      setBal(bal)
    }
    // eslint-disable-next-line
  }, [])
  const data: ChartData<chartjs.ChartData> = {
    datasets: [
      {
        backgroundColor: '#b8b5ff',
        borderColor: '#b8b5ff',
        data: bal,
        label: 'มูลค่าทั้งหมด',
        // fill: '+1',
      },
      {
        backgroundColor: '#f5c0c0',
        borderColor: '#f5c0c0',
        data: dep,
        label: 'เงินที่ออม',
        // fill: 1,
      },

      // {
      //   backgroundColor: '#f0e5d82f',
      //   borderColor: '#b8b5ff',
      //   data: [
      //     { t: new Date('2021-01'), y: 1.5 },
      //     { t: new Date('2021-02'), y: 2.5 },
      //     { t: new Date('2021-03'), y: 3.5 },
      //     { t: new Date('2021-04'), y: 4.5 },
      //   ],
      //   label: 'Max',
      //   fill: 1,
      // },
    ],
  }
  const options: chartjs.ChartOptions = {
    scales: {
      xAxes: [
        {
          type: 'time',
          // display: true,
          // distribution: 'series',
          time: {
            unit: 'year',
          },
        },
      ],
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
  }

  return (
    <>
      <Col xs={24} sm={18}>
        <div className="partition-box">
          <Paragraph>แสดงอัตราการเติบโต</Paragraph>
          <div className="growth-chart">
            <Line data={data} options={options} />
          </div>
        </div>
      </Col>
      <Col xs={24} sm={6}>
        <div className="partition-box">
          <Paragraph>เป้าหมาย</Paragraph>
          {goal ? (
            <div className="goal-box">
              <Title>
                <CheckOutlined />
              </Title>
              <Title>ตามเป้าหมาย</Title>
            </div>
          ) : (
            <div className="goal-box">
              <Title>
                <CloseOutlined />
              </Title>

              <Title level={3}>
                จำนวนรายได้ทั้งหมดไม่ถึงเป้ากรุณาเพิ่มจำนวนเงินต่อเดือนหรือเงินต้นรวมถึงระยะเวลา
              </Title>
            </div>
          )}
        </div>
      </Col>
    </>
  )
}

export default GrowthRate
