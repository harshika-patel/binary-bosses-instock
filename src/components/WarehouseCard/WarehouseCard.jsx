import "./WarehouseCard.scss";
import chevron_right from "../../assets/Icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";

const WarehouseCard = ({
  warehouse_name,
  address,
  city,
  country,
  contact_name,
  contact_phone,
  contact_email,
}) => {
  return (
    <article className="warehouse-card">
      <div className="warehouse-card__content">
        <div className="warehouse-card__section">
          <div className="warehouse-card__details">
            <h3 className="warehouse-card__label">WAREHOUSE</h3>
            <div className="warehouse-card__name">
              <p className="warehouse-card__name-text">{warehouse_name}</p>
              <img
                className="warehouse-card__icon"
                src={chevron_right}
                alt="chevron_right_icon"
              />
            </div>
          </div>
          <div className="warehouse-card__details">
            <h3 className="warehouse-card__label">ADDRESS</h3>
            <p className="warehouse-card__text">{`${address}, ${city}, ${country}`}</p>
          </div>
        </div>
        <div className="warehouse-card__section">
          <div className="warehouse-card__details">
            <h3 className="warehouse-card__label">CONTACT NAME</h3>
            <p className="warehouse-card__text">{contact_name}</p>
          </div>
          <div className="warehouse-card__details">
            <h3 className="warehouse-card__label">CONTACT INFORMATION</h3>
            <div className="warehouse-card__contact">
              <p className="warehouse-card__contact-text">{contact_phone}</p>
              <p className="warehouse-card__contact-text">{contact_email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="warehouse-card__actions">
        <img
          className="warehouse-card__icon"
          src={deleteIcon}
          alt="delete-icon"
        />
        <img className="warehouse-card__icon" src={editIcon} alt="edit-icon" />
      </div>
    </article>
  );
};

export default WarehouseCard;
