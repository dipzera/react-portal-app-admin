import * as React from "react";
import { useState } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Empty, Tooltip } from "antd";
import IntlMessage from "../../../components/util-components/IntlMessage";
import { AppNavGrid } from "./AppNavGrid";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/shared-components/Loading";
import { IState } from "../../../redux/reducers";
export interface IApps {
    CustomerPrice: number;
    DataBaseServer: string;
    Description: string;
    ID: number;
    IsActive: boolean;
    Name: string;
    PartnerPercent: number;
    Photo: string;
    ReferalPercent: number;
}
const AppStoreNav = () => {
    const loading = useSelector((state: IState) => state["auth"].loading);
    const apps = useSelector((state: IState) => state["apps"]);
    const menu = (
        <Menu
            style={{
                width: "330px",
                minHeight: loading ? "300px" : "auto",
            }}
        >
            {loading ? (
                <Loading cover="content" align="center" />
            ) : (
                <AppNavGrid apps={apps} />
            )}
            {apps!.length > 0 || <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={["click"]} placement={"bottomRight"}>
            <Menu mode={"horizontal"}>
                <Menu.Item>
                    <Tooltip title={<IntlMessage id={"header.applications"} />}>
                        <AppstoreOutlined className={"nav-icon"} />
                    </Tooltip>
                </Menu.Item>
            </Menu>
        </Dropdown>
    );
};

export default AppStoreNav;
