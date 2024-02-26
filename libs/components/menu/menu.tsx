import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageUtilities } from '@cryptobigbang-core';
import { MenuService } from '@cryptobigbang-services';
import { Button, Collapse, Descriptions, Form, Input, Layout, Modal, Tree } from 'antd';
import { useEffect, useState } from 'react';
import GetIcon from '../icon/getIcon';
const { TreeNode } = Tree;

const MenuForm = () => {
  const [menuAddEdit, setMenuAddEdit] = useState<{ show: boolean, data: any, isEdit: boolean, parentId: number }>({ show: false, data: 0, isEdit: false, parentId: 0 });
  const [menus, setMenus] = useState<any[]>([]);

  const { getMenu, addEditMenu } = MenuService();
  const { form, translate } = PageUtilities();

  const { Panel } = Collapse;

  useEffect(() => {
    fetchMenu()
  }, [])
  const fetchMenu = () => {
    getMenu().then(r => {
      r.forEach((menu: any, index: number) => {
        menu.key = index.toString()
      });
      setMenus(r);
    })
  }


  const handleRemoveItem = (key: any) => {
    setMenus((prevMenus) => prevMenus.filter((item) => item.key !== key));
    let menu = menus.filter((item) => item.key !== key);
    addEditMenu({ listBackOfficeMenu: menu }).then(r => { }).finally(() => { fetchMenu(); setMenuAddEdit({ show: false, data: -1, isEdit: false, parentId: 0 }) })
  };

  const onFinish = async (form: any) => {
    let updatedMenus = [...menus]; // Mevcut menüleri kopyalayın ve güncellenmiş menüleri burada saklayın

    if (!menuAddEdit.isEdit) {
      updatedMenus.push({
        key: menus.length, // Bu anahtarın benzersiz ve artan bir değer olduğundan emin olun
        parentId: menuAddEdit.parentId,
        icon: "-",
        label: "-",
        path: "-",
        description: "-",
        isActive: true,
        sortIndex: 0,
        uniqueKey: form.uniqueKey
      });
    } else {
      const editMenuIndex = updatedMenus.findIndex((menu) => menu.key === menuAddEdit.data.key);
      if (editMenuIndex !== -1) {
        updatedMenus[editMenuIndex] = {
          id: updatedMenus[editMenuIndex].id,
          key: menuAddEdit.data.key,
          parentId: updatedMenus[editMenuIndex].parentId,
          icon: "-",
          label: "-",
          path: "-",
          sortIndex: 0,
          uniqueKey: form.uniqueKey
        };
      }
    }
    updatedMenus.map((row, index) => {
      row.key = index.toString();
      row.sortIndex = parseInt(row.sortIndex)
    });
    setMenus(updatedMenus); // Güncellenmiş menüleri ayarlayın 
    addEditMenu({ listBackOfficeMenu: updatedMenus }).then(r => { }).finally(() => { fetchMenu(); setMenuAddEdit({ show: false, data: -1, isEdit: false, parentId: 0 }) })
  };
  const { } = Panel;
  const renderFormItems = (parentId: any) => {
    return menus
      .filter((item: any) => item.parentId === parentId)
      .map((item: any) => (

        <Collapse>
          <Panel header={translate("menu."+item.uniqueKey)} key={item.key} >
            <Descriptions bordered column={1}>
              {/* <Descriptions.Item label="SortIndex">
                {item.sortIndex}
              </Descriptions.Item>
              <Descriptions.Item label="Icon">
                <GetIcon iconName={item.icon} />
              </Descriptions.Item>
              <Descriptions.Item label="Label">
                {translate(item.label)}
              </Descriptions.Item>
              <Descriptions.Item label="Path">
                {item.path}
              </Descriptions.Item> */}
              <Descriptions.Item label="uniqueKey">
                {item.uniqueKey}
              </Descriptions.Item>
            </Descriptions>
            <div style={{ textAlign: "end", padding: "5px" }}>
              <Button
                icon={<PlusOutlined />}
                onClick={() => {
                  form.resetFields();
                  setMenuAddEdit({ show: true, data: item.key, isEdit: false, parentId: item.id });
                }}
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveItem(item.key)}
              />
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  form.setFieldsValue({
                    uniqueKey: item?.uniqueKey,
                    key: item?.key,
                    id: item?.id,
                    parentId: item?.parentId,
                    icon: item?.icon,
                    label: item?.label,
                    path: item?.path,
                    sortIndex: item?.sortIndex
                  });
                  setMenuAddEdit({ show: true, data: item, isEdit: true, parentId: parentId });
                }}
              />
            </div>

            {renderFormItems(item.id)}

          </Panel>
        </Collapse>
      ));
  };
  const { TextArea } = Input;
  return (
    <Layout style={{ padding: "10px" }}>

      <div style={{ textAlign: "end" }}>
        <Button icon={<PlusOutlined />} onClick={() => setMenuAddEdit({ show: true, data: 0, isEdit: false, parentId: 0 })} />
      </div>
      {renderFormItems(0)}
      <Modal open={menuAddEdit.show} onCancel={() => setMenuAddEdit({ show: false, data: -1, isEdit: false, parentId: 0 })} footer={null} title={<br></br>}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            hidden
            label="Key"
            name="key"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="UniqueKey"
            name="uniqueKey"
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="Icon"
            name="icon"
            rules={[{ required: true, message: 'Please select an icon!' }]}
          >
            <Input placeholder="Example: <UserOutlined />" />
          </Form.Item>
          <Form.Item
            label="SortIndex"
            name="sortIndex"
            rules={[{ required: true, message: 'Please enter a sortIndex!' }]}
          >
            <Input type='number' />
          </Form.Item>
          <Form.Item
            label="Label"
            name="label"
            rules={[{ required: true, message: 'Please enter a label!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Path"
            name="path"
            rules={[{ required: true, message: 'Please enter a path!' }]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item style={{ textAlign: 'end' }}>
            <Button type="primary" htmlType="submit">
              {!menuAddEdit.isEdit ? translate("common.add") : translate("common.update")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default MenuForm;
