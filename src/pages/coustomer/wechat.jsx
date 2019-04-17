import React, {Component} from 'react'
import {Avatar, PageHeader, Select, Input, Row, Card, Table} from "antd";
import api from '../../api'

class WechatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            Total: 0,
            pageSize: 10,
            Page: 1,
        }
    }

    componentWillMount() {
        this.getList();
    }

    //跳转页面
    onPageChange(index) {
        this.setState({
            Page: index
        }, () => {
            this.getList()
        })

    }

    //获取列表
    getList() {
        let {pageSize, Page} = this.state;
        api.user.getWeChatUserList({
            pageSize,
            Page,
        }).then(res => {
            let {Data, Total} = res;
            Data.map(val => {
                val.key = val.Id;
                return val;
            })
            this.setState({
                userList: Data,
                Total: Total
            })
        })
    }

    render() {
        const columns = [
            {
                title: "昵称",
                dataIndex: "nickname",
            },
            {
                title: "头像",
                dataIndex: "headimgurl",
                render:(data)=>{
                    return (<Avatar src={data} size={80} alt=""/>)
                }
            },
            {
                title: "国家",
                dataIndex: "country",
            },
            {
                title: "地区",
                dataIndex: "city",
            },
             {
                title: "创建日期",
                dataIndex: "createDate",
            },
        ];
        return (
            <div style={{color: 'red'}}>
                <PageHeader title="微信用户管理"/>
                <Card bordered={false}>
                    <Table dataSource={this.state.userList} columns={columns} bordered
                           pagination={{
                               defaultCurrent: this.state.Page,
                               total: this.state.Total,
                               onChange: this.onPageChange.bind(this)
                           }}/>
                </Card>
            </div>
        );
    }

}

export default WechatList;
