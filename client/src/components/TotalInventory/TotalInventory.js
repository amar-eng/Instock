import React, { useState, useEffect } from 'react';
import InventoryList from '../InventoryList/InventoryList';
import sortIcon from '../../assets/Icons/sort-24px.svg';
import axios from 'axios';
import { BASE_URL, sortingData } from '../../utils/utils';
import { Link } from 'react-router-dom';
import './TotalInventory.scss';

function TotalInventory() {
  const [inventoryList, setInventoryList] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [searchText, setSearchText] = useState('');

  const fetchInventory = () => {
    axios
      .get(`${BASE_URL}/inventory`)
      .then((result) => {
        setInventoryList(result.data);
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });
  };

  const sortTable = (column) => {
    const inventoryData = inventoryList;

    // Conditionals
    const isColumn = sortColumn === column;
    const isAscending = sortOrder === 'asc';
    const isColumnAsc = isColumn && isAscending;

    // Validate column being clicked to dictate sorting order and update state
    if (!isColumn || isColumnAsc) {
      const sortArr = sortingData(inventoryData, column, 'asc');
      setInventoryList(sortArr);
      setSortOrder('desc');
      setSortColumn(column);
    } else {
      const sortArr = sortingData(inventoryData, column, 'desc');
      setInventoryList(sortArr);
      setSortOrder('asc');
      setSortColumn(column);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const updateList = (updateData) => {
    setInventoryList(updateData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter the inventoryList based on searchText
    const filteredList = inventoryList.filter((item) =>
      item.itemName.toLowerCase().includes(searchText.toLowerCase())
    );
    setInventoryList([...filteredList]); // Use the spread operator to create a new array
  };

  return (
    <section className="total-inventory">
      <div className="total-inventory__container">
        <div className="total-inventory__header">
          <h2 className="total-inventory__title">Inventory</h2>
          <form onSubmit={handleSubmit} className="total-inventory__search">
            <input
              className="total-inventory__search-input"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            ></input>
          </form>
          <Link to="/inventory/add">
            <button className="total-inventory__button">+ Add New Item</button>
          </Link>
        </div>
        <div className="total-inventory__heading-container">
          <p
            className="total-inventory__table-heading total-inventory__table-heading--item"
            onClick={() => {
              sortTable('itemName');
            }}
          >
            INVENTORY ITEM
            <img src={sortIcon} alt="" />
          </p>
          <p
            className="total-inventory__table-heading"
            onClick={() => {
              sortTable('category');
            }}
          >
            CATEGORY
            <img src={sortIcon} alt="" />
          </p>
          <p
            className="total-inventory__table-heading"
            onClick={() => {
              sortTable('status');
            }}
          >
            STATUS
            <img src={sortIcon} alt="" />
          </p>
          <p
            className="total-inventory__table-heading"
            onClick={() => {
              sortTable('quantity');
            }}
          >
            QTY
            <img src={sortIcon} alt="" />
          </p>
          <p
            className="total-inventory__table-heading"
            onClick={() => {
              sortTable('warehouseName');
            }}
          >
            WAREHOUSE
            <img src={sortIcon} alt="" />
          </p>
          <p className="total-inventory__table-heading">ACTIONS</p>
        </div>
        <div className="total-inventory__table">
          {inventoryList &&
            inventoryList.map((inventory) => (
              <InventoryList
                key={inventory.id}
                id={inventory.id}
                warehouseName={inventory.warehouseName}
                itemCat={inventory.category}
                itemName={inventory.itemName}
                itemQty={inventory.quantity}
                itemStatus={inventory.status}
                updatedList={updateList}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default TotalInventory;
