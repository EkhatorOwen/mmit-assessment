import React from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
const { Option } = Select;

function FormComponent({
  vehicleTypes,
  setSelectedVehicleType,
  vehicleMakes,
  setSelectedVehicleMake,
  setUseYear,
  useYear,
  setModelYear,
  submitButtonDisabled,
  handleSearch,
}) {
  const [form] = Form.useForm();

  const handleVechicleTypeChange = (value) => {
    //console.log(value);
    setSelectedVehicleType(value);
  };
  const hadleVehicleMakeChange = (value) => {
    console.log(value);
    setSelectedVehicleMake(value);
  };

  const handleCheckBoxChange = (e) => {
    console.log(e.target.checked);
    setUseYear(e.target.checked);
  };

  const handleYearChange = (e) => {
    setModelYear(e.target.value);
  };
  const handleSubmit = (e) => {
    //validation
    handleSearch();
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
      >
        <Form.Item
          label="Vehicle Type"
          name="vehicleType"
          validateTrigger="onChange"
          rules={[
            {
              required: true,
              message: "Please input vehicle type!",
            },
          ]}
        >
          <Select
            placeholder="Select vehicle type"
            onChange={handleVechicleTypeChange}
            allowClear
          >
            {vehicleTypes.map((elem, index) => {
              return (
                <Option key={index} value={elem}>
                  {elem}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          validateTrigger="onChange"
          label="Vehicle Makes"
          name="vehicleMakes"
          rules={[
            {
              required: true,
              message: "Please enter vehicle make!",
            },
          ]}
        >
          <Select
            placeholder="Select vehicle make"
            onChange={hadleVehicleMakeChange}
            allowClear
            mode="multiple"
            style={{ width: "100%" }}
          >
            {vehicleMakes.map((elem, index) => {
              return (
                <Option key={index} value={elem.MakeId}>
                  {elem.MakeName}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="useYear" label="Use Year?">
          <Checkbox checked={useYear} onChange={handleCheckBoxChange} />
        </Form.Item>
        {useYear && (
          <Form.Item
            validateTrigger="onChange"
            help="Should contain only numbers"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              maxLength={4}
              //type="number"
              allowClear
              onChange={handleYearChange}
              showCount
            />
          </Form.Item>
        )}
        <Button
          disabled={submitButtonDisabled}
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default FormComponent;
