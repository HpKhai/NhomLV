import HomePage from "../pages/HomePage/HomePage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import OrderPage from "../pages/OrderPage/OderPage"
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage"
import ProductsPage from "../pages/ProductsPage/ProductsPage"
import SignInPage from "../pages/SignInPage/SignInPage"
import SignUpPage from "../pages/SignUpPage/SignUpPage"
import ProfilePage from "../pages/Profile/ProfilePage"
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage"
import AdminPage from "../pages/AdminPage/AdminPage"
import MapPage from "../pages/Map/MapPage"
import PaymentPage from "../pages/PaymentPage/PaymentPage"
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess"


export const   routes = [
{
    path: '/',
    page: HomePage,
    isShowHeader: true
},
{
    path: '/order',
    page: OrderPage,
    isShowHeader: true
},
{
    path: '/payment',
    page: PaymentPage,
    isShowHeader: true,
},
{
    path: '/ordersuccess',
    page: OrderSuccess,
    isShowHeader: true,
},
{
    path: '/products',
    page: ProductsPage, 
    isShowHeader: true
},
{
    path: '/product/:type',
    page: TypeProductPage,
    isShowHeader: true
},
{
    path: '/product-details/:id',
    page: ProductDetailsPage,
    isShowHeader: true
},
{
    path: '/sign-in',
    page: SignInPage,
    isShowHeader: true
},
{
    path: '/sign-up',
    page: SignUpPage,
    isShowHeader: true
},
{
    path: '/profile-user',
    page: ProfilePage,
    isShowHeader: true
},
{
    path: '/map',
    page: MapPage,
    isShowHeader: true
},
{
    path: '/system/admin',
    page: AdminPage,
    isShowHeader: false,
    isPrivate: true,
},

{
    path: '*',
    page: NotFoundPage
},
]
