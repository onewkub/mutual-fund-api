import { Table } from 'antd'

// const { Paragraph } = Typography

const datasource = [
  { key: 1, fundSymbol: 'ABC', investPercentage: 12 },
  { key: 2, fundSymbol: 'BED', investPercentage: 24 },
  { key: 3, fundSymbol: 'CEB', investPercentage: 12 },
  { key: 4, fundSymbol: 'DAC', investPercentage: 36 },
  { key: 5, fundSymbol: 'EAG', investPercentage: 16 },
]
const columns = [
  {
    title: 'สัญลักษณ์กองทุน',
    dataIndex: 'fundSymbol',
    key: 'fundSymbol',
  },
  {
    title: 'เปอร์เซ็นการลงทุน',
    dataIndex: 'investPercentage',
    key: 'investPercentage  ',
  },
]

function FundDetail() {
  return (
    <div>
      <Table dataSource={datasource} columns={columns} />
    </div>
  )
}

export default FundDetail
