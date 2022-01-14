import { defineStore } from "pinia";
import { commitOrder, IProduct } from "../api/product";
import useProductStore from "./product";

export interface CartProduct { 
    id: number
    name: string
    price: number
    count: number
} 
const useCartStore = defineStore('cart', {
    state: () => ({
        cartProducts: [] as CartProduct[],
        settleStatus: null as null | string
    }),
    getters: {
        totalPrice(state) {
            return state.cartProducts.reduce((total, next) => {
                return total + next.price
            }, 0)
        }
    },
    actions: {
        addToCart(product: IProduct) {
            const productStore = useProductStore()
            // 从购物车中找该产品
            const target = this.cartProducts.find(item => item.id === product.id)
            if(target) {
                // 如果找到，则数量 +1
                target.count++
            } else {
                // 如果没有则加入购物车
                this.cartProducts.push({
                    id: product.id,
                    price: product.price,
                    name: product.name,
                    count: 1
                })
            }
            // 将对应的商品的库存 -1
            productStore.decrementStock(product)
        },
        async settleCart() {
            const res = await commitOrder()
            if(res) {
                this.settleStatus = '成功！'
                this.cartProducts = []
            } else {
                this.settleStatus = '失败！请重试~~'
            }
        },
        removeCartProduct(product: CartProduct) {
            this.cartProducts = this.cartProducts.filter(item => {
                return item.id !== product.id
            })
            const productStore = useProductStore()
            productStore.incrementStock(product, product.count)
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: '我买的东西',
                storage: localStorage,
                paths: ['cartProducts']
            }
        ]
    }
})

export default useCartStore