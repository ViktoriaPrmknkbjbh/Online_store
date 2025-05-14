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
    {path: "/Returns", component:Returns, name:'Returns'},
    {path: "/CompletedOrders", component:CompletedOrders, name:'CompletedOrders'},
    {path: "/OrdersOnWay", component:OrdersOnWay, name:'OrdersOnWay'},
    {path: "/Orders", component:Orders, name:'Orders'},
    {path: "/BonusCard", component:BonusCard, name:'BonusCard'},
    {path: "/PersonalData", component:PersonalData, name:'PersonalData'},
    {path: "/AboutUs", component:AboutUs, name:'AboutUs'},
    {path: "/Basket", component:Basket, name:'Basket'},
    {path: "/Catalog", component:Catalog, name:'Catalog'},
    {path: '/Book/:id', component:Book, name:'Book'},
    {path: '/Book1/:id', component:Book1, name:'Book1'},
    {path: "/FAQ", component:FAQ, name:'FAQ'},
    {path: "/Favorites", component:Favorites, name:'Favorites'},
    {path: "/", component:Home, name:'Home'},
    {path: "/PersonalAccount", component:PersonalAccount, name:'PersonalAccount'}, 
    {path: "/Registrations", component: Registrations, name:"Registrations"},
    {path: "/Authorization", component:Authorization, name:'Authorization'},
    {path: "/Rules", component: Rules, name:'Rules'},
    {path: "/Change", component: Change, name:'Change'},
]
export const router=createRouter({
    history: createWebHistory(),
    routes
    })