import React from "react";
import TableComponent from "../../../components/Table/Table";
import { getAllProducts, getAllCategories } from "../../../services/services";
import { Button, Form, Input, Modal, Upload, Switch, Select } from "antd";
import { addOrderService } from "../../../services/order-services/addOrderService";

const DashboardProduct = () => {
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [addModalVisible, setAddModalVisible] = React.useState(false);
  const [form] = Form.useForm();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CategoryName",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Original Price",
      dataIndex: "original_price",
      key: "original_price",
    },
    {
      title: "Discount Price",
      dataIndex: "discounted_price",
      key: "discounted_price",
    },
    {
      title: "Image",
      dataIndex: "description",
      key: "description",
      render: (text, record) => <img width={"90px"} src={record?.img} alt={record?.name} />,
    },
    {
      title: "Stocked",
      dataIndex: "discounted_price",
      key: "discounted_price",
      render: (text, record) => <p>{record?.is_stock ? "Available" : "Not Available"}</p>,
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
  const fetchProducts = async () => {
    const res = await getAllProducts();
    setProducts(res?.data?.data || []);
  };
  const fetchCategories = async () => {
    const res = await getAllCategories();
    setCategories(res?.data?.data || []);
  };
  const closeModal = () => {
    setAddModalVisible((prev) => !prev);
  };
  const handleSubmit = (values) => {
    console.log("values", values);
    const { img, ...rest } = values;
    const formData = new FormData();
    for (let key in rest) {
      formData.append([key], rest[key]);
    }
    formData.append("img", img?.[0]?.originFileObj);
    addOrderService(formData);
  };
  React.useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className="dashboard-main-container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="dashboard-heading">Products</h1>
        <Button onClick={() => setAddModalVisible(true)}>Add Product</Button>
      </div>{" "}
      <TableComponent columns={columns} data={products} />
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
            <Form.Item name="name" label="product Name" rules={[{ required: true }]}>
              <Input type="text" placeholder="Enter product name" />
            </Form.Item>
            <Form.Item name="description" label="product description" rules={[{ required: true }]}>
              <Input type="text" placeholder="Enter product description" />
            </Form.Item>
            <Form.Item name="original_price" label="product original price" rules={[{ required: true }]}>
              <Input type="number" placeholder="Enter product price" />
            </Form.Item>
            <Form.Item name="discounted_price" label="product discounted price" rules={[{ required: true }]}>
              <Input type="number" placeholder="Enter product discounted price" />
            </Form.Item>
            <Form.Item name="is_stock" label="product stocked" rules={[{ required: true }]}>
              <Switch />
            </Form.Item>
            <Form.Item name="categoryId" label="product category" rules={[{ required: true }]}>
              <Select>
                {categories?.map((category) => (
                  <Select.Option value={category._id}>{category?.categoryName}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="img" label="Product Image" valuePropName="fileList" getValueFromEvent={(e) => e.fileList} rules={[{ required: true }]}>
              <Upload
                name="img"
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

export default DashboardProduct;
