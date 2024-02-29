// TableComponent.js

import React, { useState } from "react";
import { Table, Button, Modal } from "antd";
import "./Table.css";

const TableComponent = ({
  columns,
  data,
  showDelete = true,
  showEdit = true,
  onDelete,
  refetch
}) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);

  const handleEdit = (record) => {
    setEditModalVisible(true);
    setSelectedRow(record);
  };

  const handleDelete = async (record) => {
      setDeleteModalVisible(true);
      setSelectedRow(record);
  };

  const deleteRow=async()=>{
    try {
      await onDelete(selectedRow?._id);
    } catch (e) {
      console.log("err", e);
    } finally {
      closeModal()
      refetch()
    }
  }

  const closeModal = () => {
    setEditModalVisible(false);
    setDeleteModalVisible(false);
    setSelectedRow(null);
  };

  return (
    <div className="table-wrapper">
      <Table
        pagination={false}
        bordered={true}
        scroll={true}
        columns={[
          ...columns,
          showEdit
            ? {
                title: "Action",
                key: "action",
                render: (text, record) => (
                  <span>
                    {/* <Button type="link" onClick={() => handleEdit(record)}>
                      Edit
                    </Button>
                */}
                    {showDelete && (
                      <Button type="link" onClick={() => handleDelete(record)}>
                        Delete
                      </Button>
                    )}
                  </span>
                ),
              }
            : null,
        ].filter(Boolean)}
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
          <Button key="save" type="primary" onClick={deleteRow}>
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
