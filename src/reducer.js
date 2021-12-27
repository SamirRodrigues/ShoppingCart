const reducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_CART':
      return { ...state, cart: [] }
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(cartItem => cartItem.id !== action.payload)
      }
    case 'INCREASE':
      let tempCartIncrease = state.cart.map(item => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount + 1 }
        }
        return item
      })
      return {
        ...state,
        cart: tempCartIncrease
      }
    case 'DECREASE':
      let tempCartDecrease = state.cart
        .map(item => {
          if (item.id === action.payload) {
            return { ...item, amount: item.amount - 1 }
          }
          return item
        })
        .filter(item => item.amount !== 0)
      return {
        ...state,
        cart: tempCartDecrease
      }

    case 'GET_TOTALS':
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem
          const itemTotal = price * amount

          cartTotal.total += itemTotal
          cartTotal.amount += amount
          return cartTotal
        },
        {
          total: 0,
          amount: 0
        }
      )

      total = parseFloat(total.toFixed(2))
      return { ...state, total, amount }

    case 'LOADING':
      return { ...state, loading: true }

    case 'DISPLAY_ITEMS':
      return { ...state, loading: false, cart: action.payload }

    default:
      throw new Error('NO MATCHING ACTION TYPE')
  }
}

export default reducer
