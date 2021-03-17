import { ChartData, Line } from 'react-chartjs-2'
import * as chartjs from 'chart.js'
import './style.less'
import { IPredictFund } from 'store/actions/fundPredicAction'
import { useEffect, useState } from 'react'
import { IForm } from 'interface'
import { IFund } from 'store/actions/fundAction'

interface IProps {
  fundSet: IFund[]
  fundPredict: IPredictFund[]
  input: IForm
}

function GrowthRate(props: IProps) {
  const { fundSet, fundPredict, input } = props
  const [dep, setDep] = useState<any[]>([])
  const [bal, setBal] = useState<any[]>([])
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
              ((input.perMonthBalance * Number(fundData?.percentage)) / 100) /
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
      const bal = sum.map((element, index) => ({ t: dates[index], y: Number(element.toFixed(2)) }))
      // console.log(bal)
      // console.log(dep)
      setDep(dep)
      setBal(bal)
    }
  }, [fundPredict])
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
    <div className="growth-chart">
      <Line data={data} options={options} />
    </div>
  )
}

export default GrowthRate
