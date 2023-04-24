/* eslint-disable prettier/prettier */
import React, { memo, useRef } from 'react';
import { Steps, Card, Input, Row, Col, Form, FormInstanceFunctions, SubmitContext, Alert, Button, Textarea } from 'tdesign-react';
import classnames from 'classnames';
import { dataInfo, dataStep } from './consts';
import Style from './index.module.less';
import axios from 'axios';


const { StepItem } = Steps;
const { FormItem } = Form;



export default memo(() => {
	const formRef = useRef<FormInstanceFunctions>();

	const message = [
		"您的设备ID和密钥是保护您的设备和数据安全的重要标识和身份验证信息。如果将设备ID和密钥泄露给他人，将会导致非授权的人访问您的设备、利用设备进行违法犯罪活动或滥用您的个人信息。这些不良行为可能会给您带来极大的损失，包括但不限于安全威胁、信息泄露、数据丢失等等。更为严重的是，这些行为可能会对您的名誉和信誉产生不可预知的负面影响。",
		"因此，我们强烈建议您将设备ID和设备密钥妥善保管，并注意以下几点：",
		"1. 不要将设备ID和密钥泄露给任何不可信的第三方。",
		"2. 定期更改您的设备密码和密钥。",
		"只有您自己掌握并妥善保管设备ID和设备密钥，才能确保您的设备和数据安全不受威胁。因此，请您务必保持警惕，确保不将重要的信息泄露给任何不可信任的人或机构，保障您的设备和个人信息的安全。",
	]
	const onSubmit = (e: SubmitContext) => {
		if (e.validateResult === true) {
			const form_value = formRef.current?.getFieldsValue?.(true)
			console.log('form 值', form_value);
			(async () => {
				const data = await axios.post(
					`http://2c2g.akasaki.space:8889/get_key`,
					{
						theme: form_value.topic,
					},
				);
				console.log(data.data.DeviceID)
				console.log(data.data.PublicKey)
				const new_data = { topic: form_value.topic, id: data.data.DeviceID, pass: data.data.PublicKey }
				formRef.current.setFieldsValue(new_data);
			})();
		}
	};
	return (
		<div>
			<Card title={<div style={{ fontSize: 36, marginTop: 30 }}>认证模块</div>} bordered={false}>
				<div style={{ fontSize: 20, marginBottom: 30 }} >
					认证模块的主要工作是通过人工获取安全凭证并嵌入到设备端的安全固件中，该凭证作为设备端与其他设备通信的唯一安全凭证，这一过程应该保证绝对的安全。
				</div>
			</Card>
			<Card className={Style.logBox} bordered={false}>
				<Form ref={formRef} onSubmit={onSubmit} labelWidth={100} labelAlign='top'>
					<Row gutter={[32, 24]}>
						<Col span={4}>
							<FormItem
								label='主题范围'
								name='topic'
								rules={[{ required: true, message: '主题范围必填', type: 'error' }]}
							>
								<Input placeholder='请输入内容' />
							</FormItem>
						</Col>
						<Col span={6}></Col>
						<Col span={4}>
							<FormItem
								label='设备ID'
								name='id'
							>
								<Textarea autosize={true} readonly={true} />
							</FormItem>
						</Col>
						<Col span={6}></Col>
						<Col span={4}>
							<FormItem
								label='设备密钥'
								name='pass'
							>
								<Textarea autosize={true} readonly={true} />
							</FormItem>
						</Col>
						<Col span={6}></Col>
						<Col span={4}>
							<FormItem>
								<Button type='submit' theme='primary'>
									生成
								</Button>
								<Button type='reset' style={{ marginLeft: 12 }}>
									重置
								</Button>
							</FormItem>
						</Col>
						<Col span={6}></Col>
						<Col span={12}>
							<div className={Style.alertBox}>
								<Alert theme='info' message={message} title='请注意！！！' maxLine={3} close />
							</div>
						</Col>
					</Row>

				</Form>
			</Card>
		</div>
	)
});


