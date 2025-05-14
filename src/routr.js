import { createRouter, createWebHistory} from 'vue-router'
import Registrations from "./components/Registrations.vue"
import AboutUs from './components/AboutUs.vue'
import Basket from './components/Basket.vue'
import Catalog from './components/Catalog.vue'
import FAQ from './components/FAQ.vue'
import Favorites from './components/Favorites.vue'
import Home from './components/Home.vue'
import PersonalAccount from './components/PersonalAccount.vue'
import Rules from './components/Rules.vue'
import Book from './components/boock.vue'
import Authorization from './components/Authorization.vue'
import Orders from './components/Orders.vue'
import BonusCard from './components/BonusCard.vue'
import PersonalData from './components/PersonalData.vue'
import Change from './components/Change.vue'
import Returns from './components/Returns.vue'
import CompletedOrders from './components/CompletedOrders.vue'
import OrdersOnWay from './components/OrdersOnWay.vue'
import Book1 from './components/Book.vue'
const routes=[
    {path: "/Online_store/Returns", component:Returns, name:'Returns'},
    {path: "/Online_store/CompletedOrders", component:CompletedOrders, name:'CompletedOrders'},
    {path: "/Online_store/OrdersOnWay", component:OrdersOnWay, name:'OrdersOnWay'},
    {path: "/Online_store/Orders", component:Orders, name:'Orders'},
    {path: "/Online_store/BonusCard", component:BonusCard, name:'BonusCard'},
    {path: "/Online_store/PersonalData", component:PersonalData, name:'PersonalData'},
    {path: "/Online_store/AboutUs", component:AboutUs, name:'AboutUs'},
    {path: "/Online_store/Basket", component:Basket, name:'Basket'},
    {path: "/Online_store/Catalog", component:Catalog, name:'Catalog'},
    {path: '/Online_store/Book/:id', component:Book, name:'Book'},
    {path: '/Online_store/Book1/:id', component:Book1, name:'Book1'},
    {path: "/Online_store/FAQ", component:FAQ, name:'FAQ'},
    {path: "/Online_store/Favorites", component:Favorites, name:'Favorites'},
    {path: "/Online_store/", component:Home, name:'Home'},
    {path: "/Online_store/PersonalAccount", component:PersonalAccount, name:'PersonalAccount'}, 
    {path: "/Online_store/Registrations", component: Registrations, name:"Registrations"},
    {path: "/Online_store/Authorization", component:Authorization, name:'Authorization'},
    {path: "/Online_store/Rules", component: Rules, name:'Rules'},
    {path: "/Online_store/Change", component: Change, name:'Change'},
]
export const router=createRouter({
    history: createWebHistory(),
    routes
    })