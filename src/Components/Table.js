import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Make ID",
    dataIndex: "makeid",
    key: "makeid",
  },
  {
    title: "Make Name",
    dataIndex: "makeName",
    key: "makeName",
  },
  {
    title: "Model ID",
    dataIndex: "modelid",
    key: "modelid",
  },
  {
    title: "Model Name",
    dataIndex: "modelName",
    key: "modelName",
  },
];
function FormTable() {
  return (
    <div>
      <Table columns={columns} />
    </div>
  );
}

export default FormTable;
