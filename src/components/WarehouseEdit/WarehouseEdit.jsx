

// import "./WarehouseEdit.scss";
// import React, { useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import arrowBack from "../../assets/Icons/arrow_back-24px.svg";
// import axios from "axios";

// const updateWarehouse = ({ warehouseId }) => {
//   const baseUrl = import.meta.env.API_URL;

//   const [warehouseData, setWarehouseData] = useState({
//     warehouse_name: "Washington",
//     address: "33 Pearl Street W",
//     city: "Washington",
//     country: "USA",
//     contact_name: "Graeme Lyon",
//     contact_position: "Warehouse Manager",
//     contact_phone: "+1 (647) 504-0911",
//     contact_email: "glyon@instock.com",
//   });

//   const [loading, setLoading] = useState(fasle);
//   const [message, setMessage] = useState("");
//   const [ name, setName] = useState("");
//   const [ address, setAddress ] = useState("");
//   const [city, setCity ] = useState("");
//   const [country, setCountry ] = useState("");
//   const [ contact, setContact ] = useState("");
//   const [position, setPosition ] = useState("");
//   const [ phone, setPhone ] = useState("");
//   const [email, setEmail ] = useState("");



//   const updateWarehouse = async () => {
//     setLoading(true);
//     setMessage("");

//     try {
//       const response = await axios.put(
//         `${baseUrl}/warehouses/${warehouseId}`,
//         warehouseData
//       );
//       setMessage(" Warehouse updated successfully!");
//       console.log("Updated Warehouse:", response.data);
//     } catch (error) {
//       setMessage(" Error updating warehouse.");
//       console.error(error.response?.data || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="warehouse__form">
//       <h1>
//         <Link to="/">
//           <img className="title-wrapper__arrow" src={arrowBack} alt="back" />
//         </Link>
//         Edit Warehouse
//       </h1>
//       <hr className="divider"></hr>
//       <article>
//         <h2>Warehouse Details</h2>
//         <label forHtml="name" className="warehouse__label">
//           Warehouse Name
//         </label>
//         <input
//           id="name"
//           className="warehouse__input"
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <label forHtml="address" className="warehouse__label">
//           Street Address
//         </label>
//         <input
//           id="address"
//           className="warehouse__input"
//           type="text"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//         <label forHtml="city" className="warehouse__label">
//           City
//         </label>
//         <input
//           id="city"
//           className="warehouse__input"
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//         />
//         <label forHtml="country" className="warehouse__label">
//           Country
//         </label>
//         <input
//           id="country"
//           className="warehouse__input"
//           type="text"
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//         />
//       </article>
//       <article>
//         <h2>Contact Details</h2>
//         <label forHtml="contact" className="warehouse__label">
//           Contact Name
//         </label>
//         <input
//           id="contact"
//           className="warehouse__input"
//           type="text"
//           value={contact}
//           onChange={(e) => setContact(e.target.value)}
//         />
//         <label forHtml="position" className="warehouse__label">
//           Position
//         </label>
//         <input
//           id="position"
//           className="warehouse__input"
//           type="text"
//           value={position}
//           onChange={(e) => setPosition(e.target.value)}
//         />
//         <label forHtml="phone" className="warehouse__label">
//           Phone Number
//         </label>
//         <input
//           id="phone"
//           className="warehouse__input"
//           type="number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         <label forHtml="email" className="warehouse__label">
//           Email
//         </label>
//         <input
//           id="email"
//           className="warehouse__input"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </article>
//       <div className="buttons">
//         <button>Cancel</button>
//         <button onClick={updateWarehouse} disabled={loading}>
//           {""}
//           Save {loading ? "Updating..." : "Update Warehouse"}
//         </button>
//         {message && <p>{message}</p>}
//       </div>
//     </section>
//   );
// };

// export default updateWarehouse;


// 

import "./WarehouseEdit.scss";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import arrowBack from "../../assets/Icons/arrow_back-24px.svg";

const WarehouseEdit = () => {
  const { warehouseId } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.API_URL;

  const [formData, setFormData] = useState({
    warehouse_name: "Washington",
    address: "33 Pearl Street W",
    city: "Washington",
    country: "USA",
    contact_name: "Graeme Lyon",
    contact_position: "Warehouse Manager",
    contact_phone: "+1 (647) 504-0911",
    contact_email: "glyon@instock.com",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.put(`${baseUrl}/warehouses/${warehouseId}/edit`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage("Warehouse updated successfully!");
      // navigate("/warehouse-details");
    } catch (error) {
      setMessage("Error updating warehouse.");
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="warehouse-form">
      <div className="warehouse-form__header">
        <Link to="/" className="warehouse-form__header-link">
          <img className="back-arrow" src={arrowBack} alt="Back" />
        </Link>
        <h1 className="warehouse-edit__title">Edit Warehouse</h1>
      </div>
      <hr className="warehouse-edit__divider" />
      <form onSubmit={handleSubmit} className="warehouse-edit__form">
        <div className="form-section">
        <div className="section">
          <h2 className="warehouse-edit__subheading">Warehouse Details</h2>
          <label htmlFor="warehouse_name" className="warehouse-edit__label">Warehouse Name</label>
          <input type="text" name="warehouse_name" className="warehouse-edit__input" value={formData.warehouse_name} onChange={handleChange} />

          <label htmlFor="address" className="warehouse-edit__label">Street Address</label>
          <input type="text" name="address" className="warehouse-edit__input" value={formData.address} onChange={handleChange} />

          <label htmlFor="city" className="warehouse-edit__label">City</label>
          <input type="text" name="city" className="warehouse-edit__input" value={formData.city} onChange={handleChange} />

          <label htmlFor="country" className="warehouse-edit__label">Country</label>
          <input type="text" name="country" className="warehouse-edit__input" value={formData.country} onChange={handleChange} />
        </div>

        <div className="warehouse-edit__section">
          <h2 className="warehouse-edit__subheading">Contact Details</h2>
          <label htmlFor="contact_name" className="warehouse-edit__label">Contact Name</label>
          <input type="text" name="contact_name" className="warehouse-edit__input" value={formData.contact_name} onChange={handleChange} />

          <label htmlFor="contact_position" className="warehouse-edit__label">Position</label>
          <input type="text" name="contact_position" className="warehouse-edit__input" value={formData.contact_position} onChange={handleChange} />

          <label htmlFor="contact_phone" className="warehouse-edit__label">Phone Number</label>
          <input type="tel" name="contact_phone" className="warehouse-edit__input" value={formData.contact_phone} onChange={handleChange} />

          <label htmlFor="contact_email" className="warehouse-edit__label">Email</label>
          <input type="email" name="contact_email" className="warehouse-edit__input" value={formData.contact_email} onChange={handleChange} />
        </div>

        <div className="warehouse-edit__buttons">
          <Link to="/warehouse-details">
            <button type="button" className="warehouse-edit__button warehouse-edit__button--cancel">Cancel</button>
          </Link>
          <button type="submit" className="warehouse-edit__button warehouse-edit__button--save" disabled={loading}>
            Save
            {loading ? "Updating..." : "Update Warehouse"}
          </button>
        </div>
        </div>
        {message && <p className="warehouse-edit__message">{message}</p>}
      </form>
    </section>
  );
};

export default WarehouseEdit;
