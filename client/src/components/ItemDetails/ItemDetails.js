import editIcon from '../../assets/Icons/edit-24px.svg';
import backArrow from '../../assets/Icons/arrow_back-24px.svg'
import { Link } from 'react-router-dom';
import './ItemDetails.scss'

const ItemDetails = ({ itemId, itemName, itemDesc, itemCat, itemStatus, itemQty, itemWarehouse }) => {

    return (
        <div className='item-details'>
            <div className='item-details__header'>
                <Link className='item-details__back-arrow' to='/inventory'><img src={backArrow} alt='' /></Link>
                <h2 className='item-details__title'>{itemName}</h2>
                <Link className='item-details__edit-button' to={'/inventory/edit/' + itemId}><img className='item-details__icon' src={editIcon} alt='' /><p className='item-details__edit-button--text'>Edit</p></Link>
            </div>
            <div className='item-details__details'>
                <div className='item-details__container item-details__container--item'>
                    <div className='item-details__sub-container'>
                        <h3 className='item-details__label'>ITEM DESCRIPTION:</h3>
                        <p className='item-details__paragraph'>{itemDesc}</p>
                    </div>
                    <div className='item-details__sub-container'>
                        <h3 className='item-details__label'>CATEGORY:</h3>
                        <p className='item-details__paragraph'>{itemCat}</p>
                    </div>
                </div>
                <div className='item-details__container item-details__container--stock'>
                    <div className='item-details__stock-sub'>
                        <h3 className='item-details__label'>STATUS:</h3>
                        <p className={itemStatus === 'In Stock' ? 'item-details__status item-details__status--is' : 'item-details__status item-details__status--oos'}>{itemStatus}</p>
                    </div>
                    <div className='item-details__stock-sub'>
                        <h3 className='item-details__label'>QUANTITY:</h3>
                        <p className='item-details__paragraph'>{itemQty}</p>
                    </div>
                    <div className='item-details__stock-sub'>
                        <h3 className='item-details__label'>WAREHOSUE:</h3>
                        <p className='item-details__paragraph'>{itemWarehouse}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;