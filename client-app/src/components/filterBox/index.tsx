import { Row, Col, Input, Form, Radio, Button, Select, Slider } from 'antd'
import './style.less'
import { useState } from 'react'
import { RootState } from 'store/reducers'
import { connect } from 'react-redux'
import { fetchFundSet } from 'store/actions/fundAction'

const { Option } = Select

interface IProps {
  loading: boolean
  error: Error
  fetchFundSet: fetchFundSet
}

function FilterBox(props: IProps) {
  const [form] = Form.useForm()
  const [dividend, setDividend] = useState<boolean>(false)
  const { fetchFundSet } = props

  const onFormLayoutChange = ({ dividend }: { dividend: boolean }) => {
    setDividend(dividend)
  }

  const onFinish = (value: any) => {
    console.log(value)
    fetchFundSet(value.loss, 10, value.dividend)
  }

  return (
    <div className="filter-zone">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          dividend: dividend,
          initBalance: 5000,
          perMonthBalance: 500,
          goal: 1000000,
          loss: 10,
          period: 5,
        }}
        onValuesChange={onFormLayoutChange}
        onFinish={onFinish}
      >
        <Row gutter={[12, 0]}>
          <Col xs={24} sm={8}>
            <Row gutter={[6, 0]}>
              <Col span={12}>
                <Form.Item label="เงินทุนเริ่มต้น" name="initBalance">
                  <Input placeholder="5,000" suffix="บาท" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="เงินทุนต่อเดือน" name="perMonthBalance">
                  <Input placeholder="5,000" suffix="บาท" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="จำนวนเงินเป้าหมาย" name="goal">
              <Input placeholder="1,000,000" suffix="บาท" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="ความเสี่ยงที่จะเสียเงินลทุน" name="loss">
              <Select placeholder="เลือกความเสี่ยง">
                <Option value={5}>ปลอดภัย (3-5%)</Option>
                <Option value={10}>ต่ำ (5-10%)</Option>
                <Option value={15}>ปานกลาง (10-15%)</Option>
                <Option value={20}>สูง (15%-20%)</Option>
              </Select>
            </Form.Item>
            <Form.Item label="ต้องการปันผลหรือไม่?" name="dividend">
              <Radio.Group value={dividend}>
                <Radio.Button value={true}>ต้องการ</Radio.Button>
                <Radio.Button value={false}>ไม่ต้องการ</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="ระยะเวลาการลงทุน" name="period">
              <Slider
                max={50}
                marks={{
                  5: '5 ปี',
                  10: '10 ปี',
                  15: '15 ปี',
                  20: '20 ปี',
                  25: '25 ปี',
                  30: '30 ปี',
                  35: '35 ปี',
                  40: '40 ปี',
                  45: '45 ปี',
                }}
              ></Slider>
            </Form.Item>

            <div>
              <Button block size="large" htmlType="submit">
                ค้นหา
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  loading: state.FundSet.loading,
  error: state.FundSet.error,
})

export default connect(mapStateToProps, { fetchFundSet })(FilterBox)
