<script setup lang="ts">
import useCartStore from './store/cart';
import useProductStore from './store/product';

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
productStore.getAllProduct()

const cartStore = useCartStore()


</script>

<template>
  <h1>商品列表</h1>
  <ul>
    <li v-for="item in productStore.all" :key="item.id">
      商品名称：{{ item.name }}
      商品价格：{{ item.price }}
      商品库存：{{ item.stock }}
      <button :disabled="!item.stock" @click="cartStore.addToCart(item)">加入购物车</button>
    </li>
  </ul>
  <hr>
  <h1>购物车</h1>
  <p>商品总价（元）：{{ cartStore.totalPrice.toLocaleString() }}</p>
  <p v-show="cartStore.settleStatus" style="color: brown;">购物车状态：{{ cartStore.settleStatus }}</p>
  <p><button @click="cartStore.settleCart">结算购物车</button></p>
  <ul>
    <li v-for="item in cartStore.cartProducts" :key="item.id">
      {{ item.name }} - {{ item.price }} X {{ item.count }} <button @click="cartStore.removeCartProduct(item)">移除</button>
    </li>
  </ul>
  
</template>
<!-- 
  需求描述：
    1. 展示商品列表和购物车列表
    2. 点击加入购物车的商品会出现在购物车列表
    3. 如果购物车内已存在该商品，则是数量累加，否则就是新增
    4. 结算功能
    5. 总价功能
    6. 库存不足的时候禁用加入购物车按钮
 -->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
