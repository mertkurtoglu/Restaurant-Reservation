import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import axios from "axios";
import Header from "./Header";

function Account() {
  const [restaurants, setRestaurants] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedRestaurant, setEditedRestaurant] = useState(null);
  const [editedOpeningHours, setEditedOpeningHours] = useState([]);

  const columns = [
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "Opening Hours",
      dataIndex: "openingHours",
      key: "openingHours",
      render: (openingHours) => (
        <ul>
          {openingHours.map((hour) => (
            <li key={hour._id}>
              {hour.day}: {hour.openingTime} - {hour.closingTime}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "",
      key: "action",
      render: (restaurant) => <Button onClick={() => handleEditClick(restaurant)}>Edit</Button>,
    },
  ];

  useEffect(() => {
    axios.get("http://localhost:8080/restaurants", { withCredentials: true }).then((res) => {
      setRestaurants(res.data.restaurants);
    });
  }, []);

  const handleEditClick = (restaurant) => {
    setEditedRestaurant({ ...restaurant });
    setEditedOpeningHours([...restaurant.openingHours]);
    setIsModalVisible(true);
  };

  const handleOpeningTimeChange = (e, hourId) => {
    const updatedOpeningHours = editedOpeningHours.map((hour) => {
      if (hour._id === hourId) {
        return { ...hour, openingTime: e.target.value };
      }
      return hour;
    });
    setEditedOpeningHours(updatedOpeningHours);
  };

  const handleClosingTimeChange = (e, hourId) => {
    const updatedOpeningHours = editedOpeningHours.map((hour) => {
      if (hour._id === hourId) {
        return { ...hour, closingTime: e.target.value };
      }
      return hour;
    });
    setEditedOpeningHours(updatedOpeningHours);
  };

  const handleDayChange = (e, hourId) => {
    const updatedOpeningHours = editedOpeningHours.map((hour) => {
      if (hour._id === hourId) {
        return { ...hour, day: e.target.value };
      }
      return hour;
    });
    setEditedOpeningHours(updatedOpeningHours);
  };

  const handleSaveEdits = () => {
    axios
      .put(`http://localhost:8080/restaurants/${editedRestaurant._id}`, {
        openingHours: editedOpeningHours,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });

    // Update the restaurants state and close the modal
    const updatedRestaurants = restaurants.map((restaurant) => {
      if (restaurant._id === editedRestaurant._id) {
        return { ...restaurant, openingHours: editedOpeningHours };
      }
      return restaurant;
    });
    setRestaurants(updatedRestaurants);
    setIsModalVisible(false);
  };

  const handleCancelEdit = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Header></Header>

      <div style={{ padding: "20px" }}>
        <Table
          style={{ border: "solid 1px lightgrey", borderRadius: "10px" }}
          columns={columns}
          dataSource={restaurants}
          showSorterTooltip={true}
        />

        <Modal title="Edit Opening Times" visible={isModalVisible} onOk={handleSaveEdits} onCancel={handleCancelEdit}>
          <ul>
            {editedOpeningHours.map((hour) => (
              <li key={hour._id}>
                Day:
                <Input type="text" value={hour.day} onChange={(e) => handleDayChange(e, hour._id)} />
                Opening Time:
                <Input type="text" value={hour.openingTime} onChange={(e) => handleOpeningTimeChange(e, hour._id)} />
                Closing Time:
                <Input type="text" value={hour.closingTime} onChange={(e) => handleClosingTimeChange(e, hour._id)} />
              </li>
            ))}
          </ul>
        </Modal>
      </div>
    </>
  );
}

export default Account;
