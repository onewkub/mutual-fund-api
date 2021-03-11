import { Row, Col, Input, Form, Radio } from 'antd'
import './style.less'
import { useState } from 'react'

function FilterBox() {
  const [form] = Form.useForm()
  const [dividen, setDividen] = useState<boolean>(false)

  const onFormLayoutChange = ({ dividen }: { dividen: boolean }) => {
    setDividen(dividen)
  }

  return (
    <div className="filter-zone">
      <Form
        form={form}
        layout="vertical"
        initialValues={{ dividen: dividen }}
        onValuesChange={onFormLayoutChange}
      >
        <Row gutter={[12, 12]}>
          <Col xs={24} sm={8}>
            <Form.Item label="เงินทุนเริ่มต้น">
              <Input placeholder="5000" suffix="บาท" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="เงินทุนต่อเดือน">
              <Input placeholder="5000" suffix="บาท" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="ความเสี่ยงที่จะเสียเงินลทุน">
              <Input placeholder="5" suffix="%" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="ผมตอบแทนที่ต้องการ">
              <Input placeholder="5" suffix="%" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="ระยะเวลาการลงทุน">
              <Input placeholder="5" suffix="ปี" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="รูปแบบกองทุน" name="dividen">
              <Radio.Group value={dividen}>
                <Radio.Button value={true}>ปันผล</Radio.Button>
                <Radio.Button value={false}>สะสมมูลค่า</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default FilterBox
