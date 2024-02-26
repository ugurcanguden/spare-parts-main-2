import React from "react";
import * as Icons from "@ant-design/icons";
import { RadiusSettingOutlined,UserOutlined, BellOutlined, ExclamationCircleOutlined, CheckCircleOutlined, FolderOpenOutlined, SlidersOutlined, FlagOutlined, CalendarOutlined, BankOutlined, AuditOutlined, BorderlessTableOutlined, ApartmentOutlined, ClusterOutlined, ToolOutlined, HomeOutlined, DatabaseOutlined, AppstoreOutlined, FileTextOutlined, NotificationOutlined, CodeSandboxOutlined, LogoutOutlined, FieldNumberOutlined, SettingFilled } from "./allIcon";
import { Empty } from "antd";

export interface IconProps {
  iconName: string}

export default function GetIcon(props: IconProps): React.ReactElement {
  const { iconName} = props;
  const iconMap = [
    {key : "UserOutlined",  icon:<UserOutlined/>},
    {key : "BellOutlined",  icon:<BellOutlined/>},
    {key : "ExclamationCircleOutlined",  icon:<ExclamationCircleOutlined/>},
    {key : "CheckCircleOutlined",  icon:<CheckCircleOutlined/>},
    {key : "FolderOpenOutlined",  icon:<FolderOpenOutlined/>},
    {key : "SlidersOutlined",  icon:<SlidersOutlined/>},
    {key : "FlagOutlined",  icon:<FlagOutlined/>},
    {key : "CalendarOutlined",  icon:<CalendarOutlined/>},
    {key : "BankOutlined",  icon:<BankOutlined/>},
    {key : "AuditOutlined",  icon:<AuditOutlined/>},
    {key : "BorderlessTableOutlined",  icon:<BorderlessTableOutlined/>},
    {key : "ApartmentOutlined",  icon:<ApartmentOutlined/>},
    {key : "ClusterOutlined",  icon:<ClusterOutlined/>},
    {key : "ToolOutlined",  icon:<ToolOutlined/>},
    {key : "HomeOutlined",  icon:<HomeOutlined/>},
    {key : "DatabaseOutlined",  icon:<DatabaseOutlined/>},
    {key : "AppstoreOutlined",  icon:<AppstoreOutlined/>},
    {key : "FileTextOutlined",  icon:<FileTextOutlined/>},
    {key : "NotificationOutlined",  icon:<NotificationOutlined/>},
    {key : "CodeSandboxOutlined",  icon:<CodeSandboxOutlined/>},
    {key : "LogoutOutlined",  icon:<LogoutOutlined/>} , 
    {key : "RadiusSettingOutlined" , icon:<RadiusSettingOutlined/>}

] ;
 const icon = iconMap.findIndex(r=>r.key == iconName);
  // iconName prop'una göre Antd icon'unu döndürün.
  return (<>{icon>-1?
    iconMap.filter(r=>r.key == iconName)[0].icon
    :
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}</>)
  }
