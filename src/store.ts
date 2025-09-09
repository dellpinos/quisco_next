import { create } from 'zustand';
import { OrderItem } from './types';
import { Product } from '@prisma/client';

interface Store {
    order: OrderItem[],
    addToCart: (product: Product) => void,
    increaseQuantity: (id: Product['id']) => void,
    decreaseQuantity: (id: Product['id']) => void,
    deleteItem: (id: Product['id']) => void
}

const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToCart: (product) => {

        const { categoryId, image, ...data } = product;
        let order : OrderItem[] = [];

        if(get().order.find(item => item.id === data.id)) {

            order = get().order.map( item => item.id === data.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item);

        } else {
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }];
        }

        set((state) => ({
            order
        }));
    },
    increaseQuantity: (id) => {
        const product = get().order.find(item => item.id === id);

        if(product && product.quantity < MAX_ITEMS) {

            set((state) => ({
                order: state.order.map( item => item.id === id ? {
                    ...item,
                    quantity: item.quantity + 1,
                    subtotal: item.price * (item.quantity + 1)
                } : item)
            }))
        }

    },
    decreaseQuantity: (id) => {
        const product = get().order.find(item => item.id === id);

        if(product && product.quantity > MIN_ITEMS) {
            set((state) => ({
                order: state.order.map( item => item.id === id ? {
                    ...item,
                    quantity: item.quantity - 1,
                    subtotal: item.price * (item.quantity - 1)
                } : item)
            }))
        }
    },
    deleteItem: (id) => {
        const product = get().order.find(item => item.id === id);

        if(product) {
            set((state) => ({
                order: state.order.filter( item => item.id !== product.id)
            }));
        }
    }
}));