import React, { useState, useEffect } from "react";
import "../styles/Proxies.css"; // Import the CSS for styling
import api from "../api";

const Proxies = () => {
  const [proxies, setProxies] = useState([]);
  const [selectedProxy, setSelectedProxy] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newProxy, setNewProxy] = useState({
    id: "",
    name: "",
    status: "",
    usage: "",
    ips: [""],
  });
  const [ipList, setIpList] = useState("");
  const [separator, setSeparator] = useState(",");

  // Fetch proxies from API when component mounts
  useEffect(() => {
    fetchProxies();
  }, []);

  const fetchProxies = () => {
    api
      .get("/api/proxies/")
      .then((response) => setProxies(response.data))
      .catch((error) => console.error("Error fetching proxies:", error));
  };

  const selectProxy = (proxy) => {
    setSelectedProxy({ ...proxy });
  };

  const handleIpChange = (value) => {
    const listIps = value.split(separator); 
    setSelectedProxy({ ...selectedProxy, ips: listIps });
  };

  const addIpField = () => {
    setSelectedProxy({ ...selectedProxy, ips: [...selectedProxy.ips, ""] });
  };

  const saveChanges = () => {
    setProxies(
      proxies.map((proxy) =>
        proxy.name === selectedProxy.name ? selectedProxy : proxy
      )
    );
    api.put(`/api/proxies/${selectedProxy.id}/`, selectedProxy).then(() => {
      alert("Changes saved");
    });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewProxy({ name: "", status: "", usage: "", ips: [""] });
    setIpList("");
    setSeparator(",");
  };

  const handleNewProxyChange = (e) => {
    const { name, value } = e.target;
    setNewProxy({ ...newProxy, [name]: value });
  };

  const handleStatusChange = () => {
    setNewProxy({
      ...newProxy,
      status: newProxy.status === "Active" ? "Inactive" : "Active",
    });
  };

  const saveNewProxy = () => {
    const ips = ipList.split(separator).map((ip) => ip.trim());
    setNewProxy({ ...newProxy, ips });
    api
      .post("/api/proxies/", { ...newProxy, ips })
      .then((response) => {
        setProxies([...proxies, { ...response.data }]);
        closeModal();
        alert("New proxy added!");
      })
      .catch((error) => console.error("Error adding new proxy:", error));
  };

  return (
    <div className="proxies-container">
      <div className="proxies-table">
        <h2>Proxies</h2>
        <div className="proxies-all">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              {proxies.map((proxy) => (
                <tr key={proxy.id} onClick={() => selectProxy(proxy)}>
                  <td>{proxy.name}</td>
                  <td>{proxy.status}</td>
                  <td>{proxy.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-btn" onClick={openModal}>
            + Add New Proxy
          </p>
        </div>
      </div>
      <div className="proxy-details">
        {selectedProxy ? (
          <>
            <h2>{selectedProxy.name}</h2>
            <p>Usage: {selectedProxy.usage}</p>
            <hr />
            <h3>IP Addresses:</h3>

            <textarea
              placeholder="Paste IP addresses here"
              value={selectedProxy.ips}
              onChange={(e) => handleIpChange(e.target.value)}
            />
            <input
              type="text"
              placeholder="Separator (e.g., comma, newline)"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
            />

            <br />
            <br />
            <button onClick={saveChanges}>Save</button>
          </>
        ) : (
          <p>Please select a proxy to see the details.</p>
        )}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Proxy</h2>
            <input
              type="text"
              name="name"
              placeholder="Proxy Name"
              value={newProxy.name}
              onChange={handleNewProxyChange}
            />
            <div className="status">
              <label>Status: </label>
              <input
                type="checkbox"
                checked={newProxy.status === "Active"}
                onChange={handleStatusChange}
              />
              <span>
                {newProxy.status === "Active" ? "Active" : "Inactive"}
              </span>
            </div>
            <input
              type="text"
              name="usage"
              placeholder="Usage"
              value={newProxy.usage}
              onChange={handleNewProxyChange}
            />
            <h3>IP Addresses:</h3>
            <textarea
              placeholder="Paste IP addresses here"
              value={ipList}
              onChange={(e) => setIpList(e.target.value)}
            />
            <input
              type="text"
              placeholder="Separator (e.g., comma, newline)"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
            />
            <br />

            <button onClick={saveNewProxy}>Save</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proxies;
