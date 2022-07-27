import {describe, it, expect} from 'vitest'
import { mount } from '@vue/test-utils'
import App from "@/App.vue"
import router from '@/router/index.js'
import store from '@/store/index.js'
import Forgot from '@/views/Forgot.vue'
import Index from '@/views/Index.vue'


describe('App.vue', ()=>{

    it('should render the index component',async ()=>{
        router.push({name: 'Index'})
        await router.isReady()

        const wrapper = mount(App,{
            global: {
                plugins: [router, store]
            }
        })

        expect(wrapper.findComponent(Index).exists()).toBe(true)
        wrapper.unmount()
    })
    
    it('should render the forgot component',async ()=>{
        router.push({name: 'Forgot'})
        await router.isReady()

        const wrapper = mount(App,{
            global: {
                plugins: [router, store]
            }
        })

        expect(wrapper.findComponent(Forgot).exists()).toBe(true)
        wrapper.unmount()
    })
})