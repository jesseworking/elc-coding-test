import React from 'react';

class Product extends React.Component {
    render() {
        const {name, picture, price, about, active} = this.props;

        return (
            <div className='product'>
                <img className='product-image' src={picture} alt={name} />
                <div className='product-info'>
                    <div className='product-name'>
                        <h3>{name}</h3>
                        <div className={`product-status ${active ? 'product-active' : 'product-inactive'}`}>
                            {active ? "Active" : "Inactive"}
                        </div>
                    </div>
                    <h2>{price}</h2>
                    <p className='product-desc'>{about}</p>
                </div>
            </div>
        )
    }
}

module.exports = Product;
