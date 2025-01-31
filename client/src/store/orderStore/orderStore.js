import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export const useOrderStore = create(
    persist(
        (set) => ({
            orderData: {},
            setOrderData: (newOrderData) => {
                const currentTime = Date.now()
                localStorage.setItem("order-storage-time", currentTime)
                set((state) => ({
                    orderData: {
                        ...state.orderData,
                        ...newOrderData
                    }
                }))
            },
            loadUserData: (userData) => {
                set((state) => ({
                    orderData: {
                        ...state.orderData,
                        ...userData
                    }
                }))
            },
            checkExpiration: () => {
                const lastUpdateTime = localStorage.getItem('order-storage-time')
                const currentTime = Date.now()
                const expirationTime = 60 * 60 * 1000
                const timeDifference = currentTime - Number(lastUpdateTime)
                
                if (timeDifference > expirationTime) {
                    localStorage.removeItem('order-storage')
                    localStorage.removeItem('order-storage-time')
                    set({orderData: {}})
                }
            }
        }),
        {
            name: "order-storage",
            getStorage: () => localStorage,
        }
    )
)