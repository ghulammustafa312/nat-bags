// TableComponent.js

import React, { useState } from "react";
import { Table, Button, Modal } from "antd";

const TableComponent = ({ columns, data }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);

  const handleEdit = (record) => {
    setEditModalVisible(true);
    setSelectedRow(record);
  };

  const handleDelete = (record) => {
    setDeleteModalVisible(true);
    setSelectedRow(record);
  };

  const closeModal = () => {
    setEditModalVisible(false);
    setDeleteModalVisible(false);
    setSelectedRow(null);
  };

  return (
    <div>
      <Table
        columns={[
          ...columns,
          {
            title: "Action",
            key: "action",
            render: (text, record) => (
              <span>
                <Button type="link" onClick={() => handleEdit(record)}>
                  Edit
                </Button>
                <Button type="link" onClick={() => handleDelete(record)}>
                  Delete
                </Button>
              </span>
            ),
          },
        ]}
        dataSource={data}
      />
      {/* Modal for Edit */}
      <Modal
        title="Edit Row"
        open={editModalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={closeModal}>
            Save
          </Button>,
        ]}
      >
        {selectedRow && (
          <div>
            <p>Edit Row:</p>
            <pre>{JSON.stringify(selectedRow, null, 2)}</pre>
          </div>
        )}
      </Modal>
      {/* Modal for Delete */}
      <Modal
        title="Delete Row"
        open={deleteModalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={closeModal}>
            Delete
          </Button>,
        ]}
      >
        {selectedRow && (
          <div>
            <p style={{ fontSize: "1rem" }}>
              Are You Sure you want to delete this?
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TableComponent;
