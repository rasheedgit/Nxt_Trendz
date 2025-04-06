import {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'

import 'reactjs-popup/dist/index.css'
import './index.css'

const CartSummary = () => {
  const [selectedPayment, setSelectedPayment] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handlePaymentChange = event => {
    setSelectedPayment(event.target.value)
  }

  const handleConfirmOrder = () => {
    if (selectedPayment === 'cod') {
      setOrderPlaced(true)
    }
  }

  const paymentOptions = [
    {label: 'Card', value: 'card', disabled: true},
    {label: 'Net Banking', value: 'netbanking', disabled: true},
    {label: 'UPI', value: 'upi', disabled: true},
    {label: 'Wallet', value: 'wallet', disabled: true},
    {label: 'Cash on Delivery', value: 'cod', disabled: false},
  ]

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(each => {
          total += each.price * each.quantity
        })

        return (
          <>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}/-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>

              <Popup
                modal
                trigger={
                  <button type="button" className="checkout-button">
                    Checkout
                  </button>
                }
              >
                {close => (
                  <div className="popup-container">
                    <h3>Select Payment Method</h3>
                    <form className="payment-options-form">
                      {paymentOptions.map(option => (
                        <label key={option.value}>
                          <input
                            type="radio"
                            name="payment"
                            value={option.value}
                            onChange={handlePaymentChange}
                            disabled={option.disabled}
                          />
                          {option.label}
                        </label>
                      ))}
                    </form>

                    <div className="summary">
                      <p>
                        <strong>Total Items:</strong> {cartList.length}
                      </p>
                      <p>
                        <strong>Total Price:</strong> Rs {total}/-
                      </p>
                    </div>

                    <button
                      type="button"
                      className="confirm-order-button"
                      onClick={handleConfirmOrder}
                      disabled={selectedPayment !== 'cod'}
                    >
                      Confirm Order
                    </button>

                    {orderPlaced && (
                      <p className="success-message">
                        Your order has been placed successfully
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={close}
                      className="close-popup-button"
                    >
                      Close
                    </button>
                  </div>
                )}
              </Popup>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
