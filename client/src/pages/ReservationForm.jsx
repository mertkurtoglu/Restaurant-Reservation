import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button, Modal, Select, DatePicker, TimePicker, InputNumber } from "antd";
import axios from "axios";

const { Option } = Select;

function ReservationForm() {
  const [form] = Form.useForm();
  const [restaurants, setRestaurants] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null); // Add selectedBranch state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const branchChange = useRef(false);

  useEffect(() => {
    axios.get("http://localhost:8080/restaurants", { withCredentials: true }).then((res) => {
      setRestaurants(res.data.restaurants);
    });
  }, []);

  const onFinish = (values) => {
    axios.post("http://localhost:8080/reservation", values, { withCredentials: true }).then((res) => {});
  };

  const openHours = () => {
    branchChange.current = true;
    setIsModalVisible(true);
  };

  const handleBranchChange = (value) => {
    setSelectedBranch(value);
  };

  return (
    <>
      <Button type="primary" href="/login" style={{ position: "absolute", top: 10, right: 10 }}>
        Login
      </Button>
      <Form form={form} name="reservation_form" onFinish={onFinish} labelCol={{ span: 4 }} style={{ padding: "20px" }}>
        <h3>Create Reservation</h3>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input your Name!" }]}>
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input your Email!" }]}>
          <Input placeholder="Email" type="email" />
        </Form.Item>

        <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Please input your Phone!" }]}>
          <InputNumber placeholder="Phone" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="branch" label="Branch" rules={[{ required: true, message: "Please select a Branch!" }]}>
          <Select placeholder="Select Branch" onChange={handleBranchChange}>
            {restaurants.map((restaurant) => (
              <Option key={restaurant._id} value={restaurant.branch}>
                {restaurant.branch}
              </Option>
            ))}
          </Select>
          <Button onClick={openHours}>Open Hours</Button>
        </Form.Item>

        <Form.Item name="date" label="Date" rules={[{ required: true, message: "Please select a Date!" }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="time" label="Time" rules={[{ required: true, message: "Please select a Time!" }]}>
          <TimePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="note" label="Note">
          <Input.TextArea placeholder="Additional Notes" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Opening Times"
        open={isModalVisible}
        footer={[
          <Button key="ok" type="primary" onClick={() => setIsModalVisible(false)}>
            OK
          </Button>,
        ]}
      >
        {selectedBranch ? (
          <ul>
            {restaurants
              .filter((restaurant) => restaurant.branch === selectedBranch)
              .map((restaurant) => (
                <li key={restaurant._id}>
                  <b>Branch:</b> {restaurant.branch}
                  <br />
                  <ul>
                    {restaurant.openingHours.map((hour) => (
                      <li key={hour._id}>
                        {hour.day} : {hour.openingTime} - {hour.closingTime}
                      </li>
                    ))}
                  </ul>
                  <br />
                </li>
              ))}
          </ul>
        ) : (
          <p>Select a branch to view opening hours.</p>
        )}
      </Modal>
    </>
  );
}

export default ReservationForm;
