import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios";

function MainPage({ tableName }) {
  const [modalVisible, setModalvisible] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:4000/get-data?tbname=${encodeURIComponent(tableName)}`
    );
    setData(response.data.data);
  };

  const deleteItem = async (id) => {
    const response = await axios.delete(
      `http://localhost:4000/delete-item?tbname=${encodeURIComponent(
        tableName
      )}&id=${id}`
    );
  };

  fetchData();

  return (
    <div className="main_page">
      {modalVisible && (
        <Modal setModalvisible={setModalvisible} tableName={tableName} />
      )}
      <div className="mp_head">
        <h1>To-do's list</h1>
        <h1>Task/s: {data.length < 10 ? `0${data.length}` : data.length}</h1>
      </div>

      <div id="list_items">
        {data.length > 0 &&
          data.map((row) => (
            <div className="list_item" key={row.id}>
              <p>{row.description}</p>
              <input
                type="checkbox"
                id="dlt_input"
                onChange={() => deleteItem(row.id)}
              />
            </div>
          ))}
      </div>

      <button className="modal_open" onClick={() => setModalvisible(true)}>
        +
      </button>
    </div>
  );
}

export default MainPage;
