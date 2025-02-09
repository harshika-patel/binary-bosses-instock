import "./InventoryItemDetails.scss";
import { Link, useParams } from "react-router-dom";
import arrowBack from "../../assets/Icons/arrow_back-24px.svg";
import editWhiteFill from "../../assets/Icons/edit-white-24px.svg";


const InventoryItemDetails = ({ inventory }) => {
  const { inventoryId } = useParams();
  

  return (
    <section className="component-card">
      <div className="title-wrapper">
        <div className="title-wrapper__left">
          <Link to="/inventory">
            <img className="title-wrapper__arrow" src={arrowBack} alt="back" />
          </Link>
          <h2 className="title-wrapper__h2">{inventory.warehouse_name}</h2>
        </div>
        <Link to={`/inventory/${inventoryId}/edit`}>
          <div>
            <button className="title-wrapper__right">
              <img src={editWhiteFill} alt="edit" />
              <span className="title-wrapper__edit-text">Edit</span>
            </button>
          </div>
        </Link>
      </div>

      <hr className="divider"></hr>

      <div className="details">
        <div className="details_left-data">
          <div>
            <p className="details__labels">ITEM DESCRIPTION:</p>
            <p className="details__outputs">{inventory.description}</p>
          </div>
          <div>
            <p className="details__labels">CATEGORY:</p>
            <p className="details__outputs">{inventory.category}</p>
          </div>
        </div>
        <hr className="details__divider"></hr>
        <div className="details_right-data">
          <div className="status-and-quantity">
            <div>
              <p className="details__labels">STATUS:</p>
              <p className="inventory__status">{inventory.status}</p>
            </div>
            <div>
              <p className="details__labels">QUANTITY:</p>
              <p className="details__outputs">{inventory.quantity}</p>
            </div>
          </div>
          <div>
            <p className="details__labels">WAREHOUSE:</p>
            <p className="details__outputs">{inventory.warehouse_name}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InventoryItemDetails;
