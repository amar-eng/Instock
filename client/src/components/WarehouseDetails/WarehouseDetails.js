import "./WarehouseDetails.scss";

export default function WarehouseDetails(props) {
  const { address, city, country, contact } = props.info;

  return (
    <section className="warehouse-details">
      <div className="warehouse-details__address">
        <h3 className="warehouse-details__heading">WAREHOUSE ADDRESS:</h3>
        <address className="warehouse-details__text">
          {address}, <br />
          {city}, {country}
        </address>
      </div>
      <div className="warehouse-details__contact-name">
        <h3 className="warehouse-details__heading">CONTACT NAME:</h3>
        <div className="warehouse-details__text">
          {contact.name} <br />
          {contact.position}
        </div>
      </div>
      <div className="warehouse-details__contact-info">
        <h3 className="warehouse-details__heading">CONTACT INFORMATION:</h3>
        <div className="warehouse-details__text">
          {contact.phone}
          <br />
          {contact.email}
        </div>
      </div>
    </section>
  );
}
