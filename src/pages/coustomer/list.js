import React, {Component} from 'react'
import {Card, PageHeader, Button, Input, Select, Table, Pagination, Row, Col} from 'antd'
import api from '../../api'
const Option = Select.Option;
class customerList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            Total: 0,
            pageSize: 10,
            Page: 1,
            statusForConsultant: 0,
            RealName: '',
            Username: '',
            RoleIds: '',
            audit: [
                {name: '所有', id: 0},
                {name: '已审核', id: 4},
                {name: '未审核', id: 2},
            ],
            roleList: [],
        }
        this.getList();
        this.getRoles()
    }


    //跳转页面
    onChange(index) {
        this.setState({
            Page: index
        }, () => {
            this.getList()
        })
    }

    onSizeChange(size) {
        this.setState({
            pageSize: size
        })
        setTimeout(() => {
            this.getList()
        })
    }

    //获取列表
    getList() {
        let {pageSize, Page, RealName, statusForConsultant, Username, RoleIds} = this.state;
        api.user.getUserList({
            pageSize,
            Page,
            RealName,
            statusForConsultant,
            Username,
            RoleIds
        }).then(res => {
            let {Data, Total} = res;
            Data.map(val=>{
                val.key=val.Id;
                return val;
            })
            console.log(Data)
            this.setState({
                userList: Data,
                Total: Total
            })

        }).then(data => {

        })
    }

    //获取角色列表
    getRoles() {
        api.user.getRoleList().then(res => {
            this.setState({
                roleList: res
            })
        })
    }

    customerChange(name, val) {
        this.setState({
            [name]: val
        }, () => {
            this.getList()
        })
    }
    inputChange(name, e) {
        //不加这一行 回报错 target为null
        e.persist();
        this.setState({
            [name]: e.target.value
        }, () => {
            this.getList()
        })
    }

    //删除用户
    deleteCustomer(id) {
        // this.props.history.push('/list') //跳转页面
        // MessageBox.confirm('确认删除该用户吗?', '提示', {
        //     type: 'warning'
        // }).then(() => {
        //     Message({
        //         type: 'success',
        //         message: '删除成功!'
        //     });
        // })
    }


    render() {
        let columns = [
            {
                title: '用户名(手机号)',
                dataIndex: 'Username',
                key: 'Username',
                width: 140,
            },
            {
                title: "真实姓名",
                dataIndex: "RealName",
                key: "RealName",
                width: 120,
            },
            {
                title: "昵称",
                dataIndex: "NickName",
                key: "NickName",
                width: 140
            },
            {
                title: "客户角色",
                dataIndex: "CustomerRoleNames",
                key: "CustomerRoleNames",
                width: 140
            },
            {
                title: "已启用",
                dataIndex: "OrderType",
                key: "OrderType",
                width: 120,
                render: (data) => {
                    // let tag=data.Active?<div className="el-icon-circle-check"></div>:<div className="el-icon-circle-close"></div>;
                    return '';
                }
            }, {
                title: "创建日期",
                dataIndex: "CreatedOn",
                key: "CreatedOn",
                width: 150
            },
            {
                title: "最后活动日期",
                dataIndex: "LastActivityDate",
                key: "LastActivityDate",
                width: 150
            },
            {
                title: "操作",
                width: 200,
                render: (data) => {
                    return (
                        <div>
                            <Button size="small" type="info" icon="edit">编辑</Button>
                            <Button size="small" type="danger" icon="delete"
                                    onClick={this.deleteCustomer.bind(this, data.Id)}>编辑</Button>
                        </div>);
                }
            },
        ];
        return (
            <div>
                <PageHeader title="客户管理"/>
                <Card className="box-card">
                    <Row>
                        <Col span={4}>
                            <b>用户手机号</b>
                            <Input value={this.state.Username} placeholder="请输入内容"
                                   onChange={this.inputChange.bind(this, 'Username')}/>
                        </Col>
                        <Col span={4}>
                            <b>用户姓名</b>
                            <Input value={this.state.RealName} placeholder="请输入内容"
                                   onChange={this.inputChange.bind(this, 'RealName')}/>

                        </Col>
                        <Col span={4}>
                            <b>客户角色</b>
                            <Select defaultValue={this.state.RoleIds} style={{ width: 120 }} onChange={this.customerChange.bind(this,'RoleIds')}>
                                {
                                    this.state.roleList.map(el => {
                                        return <Option key={el.Id} value={el.Id}>{el.Name}</Option>
                                    })
                                }

                            </Select>
                        </Col>
                        <Col span={6}>
                            <b>审核状态</b>
                            <Select value={this.state.OrderType} style={{ width: 120 }} onChange={this.customerChange.bind(this, 'OrderType')}>
                                {
                                    this.state.audit.map(el => {
                                        return <Option key={el.id} value={el.id} >{el.name}</Option>
                                    })
                                }
                            </Select>
                        </Col>
                        <Col>
                            <Button type="primary" icon="search" onClick={this.getList.bind(this)}>搜索</Button>
                        </Col>
                    </Row>
                </Card>
                <Card className="box-card">
                    <Table
                        columns={columns}
                        bordered
                        pagination={{
                            defaultCurrent:this.state.Page,
                            total:this.state.Total,
                            pageSize:10,
                            onChange:this.onChange.bind(this)
                        }}
                        dataSource={this.state.userList}
                    />

                </Card>
            </div>
        );
    }
}

export default customerList;