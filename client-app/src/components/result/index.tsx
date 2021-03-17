import { Typography, Row, Col, Spin } from 'antd'
import { connect } from 'react-redux'
import { IFund } from 'store/actions/fundAction'
import { RootState } from 'store/reducers'
import PartitionChart from './chart'
import FundDetail from './fundDetail'
import GrowthRate from './growthRate'
import './style.less'

const { Paragraph } = Typography

// export interface IFundResult {
//   project_id: string
//   name: string
//   profit: string
//   draw_down: string
//   sd: string
//   risk: string
//   max_profit: string
//   min_profit: string
//   percentage: number
//   fund_type: string
// }
interface IProps {
  fundSet: IFund[]
  loading: boolean
  error: Error
}

function Result(props: IProps) {
  const { fundSet, loading, error } = props

  // useEffect(() => {
  //   if (fundSet?.equity_fund.percentage > 0)
  //     setFunds((prev) => [
  //       ...prev,
  //       { ...fundSet.equity_fund, fund_type: 'equity_fund' },
  //     ])
  //   if (fundSet?.fix_income_fund.percentage > 0)
  //     setFunds((prev) => [
  //       ...prev,
  //       { ...fundSet.fix_income_fund, fund_type: 'fix_income_fund' },
  //     ])
  //   if (fundSet?.other_fund.percentage > 0)
  //     setFunds((prev) => [
  //       ...prev,
  //       { ...fundSet.other_fund, fund_type: 'other_fund' },
  //     ])
  // }, [])

  if (loading || !fundSet) {
    return (
      <div className="result" style={{ textAlign: 'center', padding: 10 }}>
        <Spin size="large" />
      </div>
    )
  } else if (error) {
    return (
      <div className="result">
        <h2>Something went wrong</h2>
      </div>
    )
  }
  return (
    <div className="result">
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={10}>
          <div className="partition-box">
            <Paragraph>อัตราส่วน</Paragraph>
            <PartitionChart fundSet={fundSet} />
          </div>
        </Col>
        <Col xs={24} sm={14}>
          <div className="partition-box">
            <Paragraph>รายละเอียดกองทุน</Paragraph>
            <FundDetail fundSet={fundSet} />
          </div>
        </Col>
        <Col xs={24} sm={24}>
          <div className="partition-box">
            <Paragraph>แสดงอัตราการเติบโต</Paragraph>
            <GrowthRate />
          </div>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  fundSet: state.FundSet.items,
  loading: state.FundSet.loading,
  error: state.FundSet.error,
})

export default connect(mapStateToProps)(Result)
