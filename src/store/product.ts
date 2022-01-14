import { defineStore } from "pinia";
import { getAllProducts, IProduct } from "../api/product";
import { CartProduct } from "./cart";

const useProductStore = defineStore('product', {
    state:() => {
        return {
            all: [] as IProduct[]
        }
    },
    getters: {},
    actions: {
        async getAllProduct() {
            const products = await getAllProducts()
            this.all = products
        },
        decrementStock(product: IProduct) {
            const target = this.all.find(item => item.id === product.id)
            if(target) {
                target.stock--
            }
        },
        incrementStock(product: CartProduct, incCount: number) {
            const target = this.all.find(item => item.id === product.id) as IProduct
            target.stock += incCount
        } 
    }
})

// 有个顺序问题，就是必须等待 app 实例上存在 pinia 实例之后才能创建 store
setTimeout(() => {
    const productStore = useProductStore()
    productStore.$onAction(({ name, after, onError }) => {
        const startTime = Date.now()
        after((result) => {
            console.log(`name: ${name}, time: ${Date.now() - startTime}, result: ${result}`)
        })
        onError((reason) => { 
        console.log(reason)
        })
    })
}, 0);

export default useProductStore