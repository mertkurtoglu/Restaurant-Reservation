import React, { useEffect, useState } from "react";
import { Space, Table, Button, message } from "antd";
import axios from "axios";
import Header from "./Header";

function Account() {
  const [reservations, setReservations] = useState([]);

  function parseDate(dateString) {
    const [year, month, day] = dateString.split(".").map(Number);
    return new Date(year, month - 1, day);
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone.toString().localeCompare(b.phone),
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
      sorter: (a, b) => a.branch.localeCompare(b.category),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => parseDate(a.date) - parseDate(b.date),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      sorter: (a, b) => a.time.localeCompare(b.unit),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      sorter: (a, b) => a.note.localeCompare(b.note),
    },
    {
      title: "Confirmed",
      dataIndex: "confirmed",
      key: "confirmed",
      render: (confirmed) => (confirmed ? "Yes" : "No"),
    },
    {
      title: "",
      key: "action",
      render: (reservation) => (
        <Space style={{ display: "flex", justifyContent: "center" }} size="middle">
          <Button onClick={() => confirm(reservation, true)}>Yes</Button>
          <Button onClick={() => confirm(reservation, false)}>No</Button>
        </Space>
      ),
    },
  ];

  const confirm = (reservation, confirmationStatus) => {
    const data = { confirmed: confirmationStatus };
    axios
      .post(`http://localhost:8080/reservation/${reservation._id}`, { data }, { withCredentials: true })
      .then((res) => {
        if (confirmationStatus) {
          message.success("Reservation confirmed!");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          message.success("Reservation denied.");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      })
      .catch((error) => {
        console.error(error);
        message.error("An error occurred while confirming/denying the reservation.");
      });
  };

  useEffect(() => {
    axios.get("http://localhost:8080/reservation", { withCredentials: true }).then((res) => {
      setReservations(res.data.reservations);
    });
  }, []);

  return (
    <>
      <Header></Header>
      <div style={{ padding: "20px" }}>
        <Table
          style={{ border: "solid 1px lightgrey", borderRadius: "10px" }}
          columns={columns}
          dataSource={reservations}
          showSorterTooltip={true}
        />
      </div>
    </>
  );
}

export default Account;
