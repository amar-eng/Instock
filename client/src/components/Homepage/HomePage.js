import React, { useState, useEffect } from 'react';
import WarehouseList from '../WarehouseList/WarehouseList';
import axios from 'axios';
import { BASE_URL, sortingData } from '../../utils/utils';
import sortIcon from '../../assets/Icons/sort-24px.svg';
import './HomePage.scss';
import { Link } from 'react-router-dom';

function HomePage() {
  const [warehouseList, setWarehouseList] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [searchText, setSearchText] = useState('');

  const fetchInventory = () => {
    axios
      .get(`${BASE_URL}/warehouse`)
      .then((result) => {
        console.log(result.data[0].contact);
        setWarehouseList(result.data);
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });
  };

  const sortTable = (column, column2) => {
    const isColumn = sortColumn === column;
    const isAscending = sortOrder === 'asc';
    const isColumnAsc = isColumn && isAscending;

    if (!isColumn || isColumnAsc) {
      const sortArr = sortingData(warehouseList, column, 'asc', column2);
      setWarehouseList(sortArr);
      setSortOrder('desc');
      setSortColumn(column);
    } else {
      const sortArr = sortingData(warehouseList, column, 'desc', column2);
      setWarehouseList(sortArr);
      setSortOrder('asc');
      setSortColumn(column);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const updateList = (updateData) => {
    setWarehouseList(updateData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredList = warehouseList.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setWarehouseList([...filteredList]);
  };

  return (
    <section className="warehouse-main">
      <div className="warehouse-main__container">
        <div className="warehouse-main__header">
          <h2 className="warehouse-main__title">Warehouses</h2>
          <form onSubmit={handleSubmit} className="total-inventory__search">
            <input
              className="total-inventory__search-input"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            ></input>
          </form>
          <Link to="/warehouse/add">
            <button className="warehouse-main__addbutton">
              + Add New Warehouse
            </button>
          </Link>
        </div>
        <div className="warehouse-main__heading-container">
          <p
            className="warehouse-main__table-heading warehouse-main__table-heading--item"
            onClick={() => {
              sortTable('name');
            }}
          >
            WAREHOUSE
            <img src={sortIcon} alt="" />
          </p>
          <p
            className="warehouse-main__table-heading warehouse-main__table-heading--address"
            onClick={() => {
              sortTable('address');
            }}
          >
            ADDRESS
            <img src={sortIcon} alt="" />
          </p>
          <p
            className="warehouse-main__table-heading warehouse-main__table-heading--name"
            onClick={() => {
              sortTable('contact', 'name');
            }}
          >
            CONTACT NAME
            <img src={sortIcon} alt="" />
          </p>
          <p
            className="warehouse-main__table-heading warehouse-main__table-heading--info"
            onClick={() => {
              sortTable('contact', 'phone');
            }}
          >
            CONTACT INFORMATION <img src={sortIcon} alt="" />
          </p>
          <p className="warehouse-main__table-heading">ACTIONS</p>
        </div>
        <div className="warehouse__table">
          {warehouseList &&
            warehouseList.map((warehouse) => (
              <WarehouseList
                key={warehouse.id}
                id={warehouse.id}
                name={warehouse.name}
                address={warehouse.address}
                city={warehouse.city}
                country={warehouse.country}
                contactName={warehouse.contact.name}
                contactPhone={warehouse.contact.phone}
                contactemail={warehouse.contact.email}
                updatedList={updateList}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
