import { Button, Space, Table } from 'antd';
import React from 'react';
import HeaderForm from './HeaderForm';
import * as dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const columns = [
  {
    title: 'Start Date',
    dataIndex: 'start',
    key: 'start',
    render: (value) => {
      return dayjs(value).format('MM/DD/YYYY');
    }
  },
  {
    title: 'End Date',
    dataIndex: 'end',
    key: 'end',
    render: (value) => {
      return dayjs(value).format('MM/DD/YYYY');
    }
  },
  {
    title: 'Value Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
];

function handleSubmit() {
  toast.success("Form submitted successfully!");
}

function SubmitConfirm({ values, onCancel }) {
  return (
    <>
      <HeaderForm />
      <div style={{ marginTop: '16px' }}>
        <Table dataSource={values.intervals} columns={columns} />
        <Space gap={8}>
          <Button type="default" onClick={onCancel}>
            Back
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Space>
      </div>
      <ToastContainer/>
    </>
  )
}

export default SubmitConfirm;
