import React from 'react';
import {Menu, MenuProps} from "antd";
import Sider from "antd/es/layout/Sider";
import {Link} from "react-router-dom";
import {DesktopOutlined, FileOutlined, TeamOutlined, UserOutlined,AliwangwangOutlined} from "@ant-design/icons";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items2: MenuItem[] = [
    getItem(<Link to='/Profile'>Profile page</Link>, '1', <UserOutlined/>),
    getItem(<Link to='/Dialogs'>Messages</Link>, '2', <FileOutlined/>),
    getItem(<Link to='/Developers'>Developers</Link>, '3', <TeamOutlined/>),
    getItem(<Link to='/Chat'>Chat</Link>, '4', <AliwangwangOutlined />),
    getItem('User', 'sub1', <DesktopOutlined/>, [
        getItem('Tom', '5'),
        getItem('Alex', '6'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '7'), getItem('Team 2', '8')]),
    getItem('Files', '9', <DesktopOutlined/>),
];
const Sidebar = () => {
    return (
        <div>
            <Sider className="site-layout-background" width={200}>
                <Menu
                    mode="inline"
                    defaultOpenKeys={['sub1']}
                    style={{height: '100%'}}
                    items={items2}
                />
            </Sider>
        </div>
    );
};

export default Sidebar;