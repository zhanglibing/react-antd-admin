import React, {Component} from 'react'

import {DatePicker, Form, Input, Tooltip, Icon, RadioGroup, Radio, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
const {Option} = Select;

class CustomerAdd extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        newData: {
            Username: '',
            RealName: '',
            NickName: '',
            RoleIds: [9],
            Email: '',
            Gender: 'M',
            DateOfBirth: '',
            AdminComment: '',
            Active: true,
            Pwd: '',
            IsShow: '',
            FromSource: ''
        },
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        return (
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} size={'large'}>
                    <Form.Item
                        label="用户名(手机号)"
                    >
                        {getFieldDecorator('Username', {
                            rules: [{required: true, message: '请输入用户名'}],
                        })(
                            <Input addonBefore={prefixSelector} maxLength={11} style={{width: '100%'}}/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="真实姓名"
                    >
                        {getFieldDecorator('RealName', {
                            rules: [
                                {
                                    required: true, message: '真实姓名不能为空',
                                }],
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="昵称"
                    >
                        {getFieldDecorator('NickName', {
                            rules: [
                                {
                                    required: true, message: '昵称不能为空',
                                }],
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="电子邮箱"
                    >
                        {getFieldDecorator('Email', {
                            rules: [
                                {
                                    type: 'email', message: '电子邮箱',
                                }, {
                                    required: true, message: 'Please input your E-mail!',
                                }],
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label={<span>密码
                            <Tooltip title="设置用户默认密码">
                                <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>}>
                        {getFieldDecorator('Pwd', {
                            rules: [
                                {
                                    required: true, message: '密码不能为空',
                                }],
                        })(
                            <Input type="password"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="客户来源"
                    >
                        {getFieldDecorator('residence', {
                            initialValue: '',
                            rules: [{type: 'array', required: true, message: 'Please select your habitual residence!'}],
                        })(
                            <Select placeholder="Please select a country">
                                <Option value="china">China</Option>
                                <Option value="usa">U.S.A</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="出生日期"
                    >
                        {getFieldDecorator('date-picker', {
                            rules: [{type: 'object', required: true, message: 'Please select time!'}],
                        })(
                            <DatePicker/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="性别"
                    >
                        {getFieldDecorator('Sex', {
                            rules: [{required: true, message: 'Please input website!'}],
                        })(
                            <Radio.Group>
                                <Radio value="F">女</Radio>
                                <Radio value="M">男</Radio>
                                <Radio.Button value="c">item 3</Radio.Button>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="备注"
                        extra="填写备注提示"
                    >
                        {getFieldDecorator('captcha', {
                            rules: [{required: true, message: 'Please input the captcha you got!'}],
                        })(
                            <Input.TextArea/>
                        )}

                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Register</Button>
                    </Form.Item>
                </Form>
            </div>

        );
    }
}

export default Form.create({name: 'register'})(CustomerAdd)
