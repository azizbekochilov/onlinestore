export const PRODUCTS = "http://localhost:1337/api/products?populate=image&populate=brand&populate=category"
export const PRODUCT = "http://localhost:1337/api/products/id?populate=image&populate=brand&populate=category&populate=reviews"
export const BRANDS = "http://localhost:1337/api/brands"
export const CATEGORIES = "http://localhost:1337/api/categories"

export const ORDER_PRODUCTS = 'http://localhost:1337/api/orders'
export const ORDER_PRODUCT = 'http://localhost:1337/api/orders/id?populate=product'

export const ORDERS = 'http://localhost:1337/api/orders?populate=user&user=order_products'
export const ORDER = 'http://localhost:1337/api/orders/id?populate=user&user=order_products'

export const REVIEWS = 'http://localhost:1337/api/reviews'
export const REVIEW = 'http://localhost:1337/api/reviews?populate=product&populate=customer&filters[product][id]=productId'