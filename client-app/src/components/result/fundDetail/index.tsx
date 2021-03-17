import { Table } from 'antd'
import { IFund } from 'store/actions/fundAction'

// const { Paragraph } = Typography

// const datasource = [
//   { key: 1, name: 'ABC', percentage: 12 },
//   { key: 2, name: 'BED', percentage: 24 },
//   { key: 3, name: 'CEB', percentage: 12 },
//   { key: 4, name: 'DAC', percentage: 36 },
//   { key: 5, name: 'EAG', percentage: 16 },
// ]
const columns = [
  {
    title: 'สัญลักษณ์กองทุน',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'เปอร์เซ็นการลงทุน',
    dataIndex: 'percentage',
    key: 'percentage  ',
  },
  {
    title: 'ชนิดกองทุน',
    dataIndex: 'fund_type',
    key: 'fund_type',
  },
  {
    title: 'ระดับความเสี่ยง',
    dataIndex: 'risk',
    key: 'risk',
  },
  {
    title: 'กำไรคาดหวังสูงสุด',
    dataIndex: 'max_profit',
    key: 'max_profit',
  },
  {
    title: 'กำไรคาดหวังต่ำสุด',
    dataIndex: 'min_profit',
    key: 'min_profit',
  },
]

interface IProps {
  fundSet: IFund[]
}

function change_fund_type_to_th(fund_type: string) {
  switch (fund_type) {
    case 'equity_fund':
      return 'ตราสารทุน'
    case 'fix_income_fund':
      return 'ตราสารหนี้'
    default:
      return 'อื่น'
  }
}

function FundDetail(props: IProps) {
  const { fundSet } = props
  // useEffect(() => {}, [])
  return (
    <div>
      <Table
        dataSource={fundSet
          .filter((element) => element.percentage > 0)
          .map((element) => ({
            ...element,
            key: element.project_id,
            fund_type: change_fund_type_to_th(element.fund_type),
            max_profit: Number(element.max_profit).toFixed(2),
            min_profit: Number(element.min_profit).toFixed(2),
          }))}
        columns={columns}
      />
    </div>
  )
}

export default FundDetail
