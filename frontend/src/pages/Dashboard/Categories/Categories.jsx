import React from "react";
import TableComponent from "../../../components/Table/Table";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  uploadImage,
} from "../../../services/services.js";
import { Button, Form, Input, Modal, Upload } from "antd";
import { addOrderService } from "../../../services/order-services/addOrderService.js";
const DashboardCategories = () => {
  const [categories, setCategories] = React.useState([]);
  const [addModalVisible, setAddModalVisible] = React.useState(false);
  const [form] = Form.useForm();
  const columns = [
    {
      title: "Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Image",
      dataIndex: "age",
      key: "age",
      render: (text, record) => (
        <img
          src={record?.img}
          alt={record?.categoryName}
          style={{ width: "90px" }}
        />
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Doe",
      age: 30,
      address: "123 Main St",
    },
    {
      key: "2",
      name: "Jane Doe",
      age: 25,
      address: "456 Oak St",
    },
  ];
  const fetchCategories = async () => {
    const res = await getAllCategories();
    setCategories(res?.data?.data || []);
  };
  const closeModal = () => {
    setAddModalVisible((prev) => !prev);
  };
  const handleSubmit = async (values) => {
    console.log("values", values);
    try {
      const formData = new FormData();
      formData.append("file", values?.image[0]?.originFileObj);
      const imageRes = await uploadImage(formData);
      await addCategory({
        categoryName: values?.categoryName,
        img: imageRes?.data?.data,
      });
    } catch (e) {
      console.log("errr", e);
    } finally {
      closeModal();
      fetchCategories();
    }
  };
  let selectedRow;
  React.useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="dashboard-main-container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="dashboard-heading">Categories</h1>
        <Button onClick={() => setAddModalVisible(true)}>Add Category</Button>
      </div>
      <TableComponent columns={columns} data={categories} onDelete={deleteCategory} refetch={fetchCategories} />
      <Modal
        title="Add Row"
        open={addModalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={() => form.submit()}>
            Save
          </Button>,
        ]}
      >
        <div>
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Form.Item
              name="categoryName"
              label="Category Name"
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter category name" />
            </Form.Item>
            <Form.Item
              name="image"
              label="Category Image"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
              rules={[{ required: true }]}
            >
              <Upload
                name="image"
                listType="picture"
                multiple={false}
                beforeUpload={(file) => {
                  return false;
                }}
              >
                <Button>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardCategories;
