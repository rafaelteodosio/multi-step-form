import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as dayjs from 'dayjs';

import SubmitConfirm from './SubmitConfirm';
import HeaderForm from './HeaderForm';
import { Button, DatePicker, InputNumber, Select, Space } from 'antd';
import {
  DeleteOutlined
} from '@ant-design/icons';

const initialValues = {
  start: dayjs(),
  end: dayjs(),
  type: 'Percentage',
  amount: ''
};

function MultiStepForm() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitValues, setSubmitValues] = useState({ intervals: [{ ...initialValues }] });

  if (showConfirm) {
    return (
      <SubmitConfirm values={submitValues} onCancel={() => setShowConfirm(false)} />
    );
  }

  const ValidationSchema = Yup.object().shape({
    intervals: Yup.array()
      .of(
        Yup.object().shape({
          start: Yup.date().required('Start date is required'),
          end: Yup.date()
            .required('End date is required')
            .test('end-date', 'End date should be greater or equals to Start date', function (endDate) {
              return new Date(endDate) >= new Date(this.parent.start);
            }),
          type: Yup.string().required('Type is required'),
          amount: Yup.number().required('Amount is required')
        })
      )
  });

  return (
    <>
      <HeaderForm />
      <Formik
        initialValues={submitValues}
        onSubmit={values => {
          setSubmitValues(values);
          setShowConfirm(true);
        }}
        validationSchema={ValidationSchema}
      >
        {({ errors, touched, values }) => (
          <Form>
            <h1>
              Multi Step Form
            </h1>
            <FieldArray
              name="intervals"
              render={arrayHelpers => (
                <div style={{ display: 'inline-grid', gap: '16px' }}>
                  {values.intervals?.map((_, index) => (
                    <Space>
                      <IntervalItem index={index} />
                      <Button
                        type='text'
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <DeleteOutlined />
                      </Button>
                    </Space>
                  ))}
                  <Space size={16} style={{ justifyContent: 'center' }}>
                    <Button type='default' onClick={() => arrayHelpers.push({ ...initialValues })}>
                      Add interval
                    </Button>
                    <Button disabled={!values.intervals.length} type='primary' htmlType="submit">Save</Button>
                  </Space>
                </div>
              )}
            />
          </Form>
        )}
      </Formik>
    </>
  );
}

function LabelItem({label, name}) {
  return (
    <div style={{display: 'grid'}}>
    <label>
      {label}
    </label>
    <span style={{fontSize: '12px', color: 'red' }}>
      <ErrorMessage name={name} />
    </span>
  </div>
  )
}

function IntervalItem({ index }) {
  return (
    <Space size={16}>
      <Field type="date" placeholder="Start Date" name={`intervals.${index}.start`}>
        {({ field, form }) => (
          <Space size={4}>
            <LabelItem label={'Start Date'} name={`intervals.${index}.start`} />
            <DatePicker
              {...field}
              format={'MM/DD/YYYY'}
              onChange={(value) => form.setFieldValue(field.name, value)}
              onBlur={() => form.setFieldTouched(field.name, true)}
            />
          </Space>
        )}
      </Field>
      <Field type="date" placeholder="End Date" name={`intervals.${index}.end`}>
        {({ field, form }) => (
          <Space size={4}>
            <LabelItem label={'End Date'} name={`intervals.${index}.end`} />
            <DatePicker
              {...field}
              format={'MM/DD/YYYY'}
              onChange={(value) => form.setFieldValue(field.name, value)}
              onBlur={() => form.setFieldTouched(field.name, true)}
            />


          </Space>
        )}
      </Field>
      <Field className='select-input' as="select" placeholder="Value Type" name={`intervals.${index}.type`}>
        {({ field, form }) => (
          <Space size={4}>
            <LabelItem label={'Value Type:'} name={`intervals.${index}.type`} />
            <Select
              {...field}
              onChange={(value) => form.setFieldValue(field.name, value)}
              onBlur={() => form.setFieldTouched(field.name, true)}
              style={{ width: '120px', textAlign: 'justify' }}
            >
              <Select.Option value="Percentage">Percentage</Select.Option>
              <Select.Option value="Fixed">Fixed</Select.Option>
            </Select>
          </Space>
        )}
      </Field>
      <Field className='number-input' type="number" placeholder="Amount" name={`intervals.${index}.amount`}>
        {({ field, form }) => (
          <Space size={4}>
            <LabelItem label={'Amount:'} name={`intervals.${index}.amount`} />
            <InputNumber
              {...field}
              onChange={(value) => form.setFieldValue(field.name, value)}
              onBlur={() => form.setFieldTouched(field.name, true)}
            />
          </Space>
        )}
      </Field>
    </Space>
  );
}

export default MultiStepForm;
