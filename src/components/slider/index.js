import React,{Component} from 'react'
import { Menu, Icon, Button } from 'antd';
import {withRouter} from 'react-router-dom'
const SubMenu = Menu.SubMenu;

class SliderModel extends Component{

    constructor(props){
        super(props)
        this.state = {
            collapsed: false,
            defaultSelectedKeys:[this.props.location.pathname]
        }
        console.log(this.props)
    }
    state = {
        collapsed: false,
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    onSelect(item){
        let {selectedKeys} =item;
        this.setState({
            defaultSelectedKeys:selectedKeys
        })
        this.props.history.push(selectedKeys[0])
        console.log(item)
    }

    render() {
        return (
            <div style={{ width: 200,minHeight:'100vh' }}>
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                <Menu
                    defaultSelectedKeys={this.state.defaultSelectedKeys}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    onSelect={this.onSelect.bind(this)}
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="/">
                        <Icon type="pie-chart" />
                        <span>首页</span>
                    </Menu.Item>
                    <Menu.Item key="/customer">
                        <Icon type="pie-chart" />
                        <span>客户列表</span>
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}
export default withRouter(SliderModel);