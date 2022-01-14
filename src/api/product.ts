export interface IProduct {
    id: number
    name: string
    price: number
    stock: number
}

const products: IProduct[] = [
    { id: 1, name: '小米10', price: 3499, stock: 2 },
    { id: 2, name: '小米11', price: 3899, stock: 10 },
    { id: 3, name: '小米12 Pro', price: 5499, stock: 7 },
    { id: 4, name: 'IPhone 13 Pro', price: 8499, stock: 3 },
]

const wait = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null)
        }, 300);
    })
}

export const getAllProducts = async () => {
    await wait()
    return products
}

export const commitOrder = async () => {
    await wait()
    return Math.random() > 0.5
}