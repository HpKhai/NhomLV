
const UserRouter = require ('./UserRouter')
const ProductRouter = require ('./ProductRouter')
const OrderRouter = require ('./OrderRouter')
const StoreRouter = require ('./StoreRouter')
const PaymentRouter = require ('./PaymentRouter')


const routes = (app)=> {
    app.use('/api/user',UserRouter)
    app.use('/api/product',ProductRouter)
    app.use('/api/order',OrderRouter)
    app.use('/api/store',StoreRouter)
    app.use('/api/payment', PaymentRouter)
}

module.exports = routes