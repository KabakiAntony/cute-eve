import {describe, it, expect, beforeEach, afterEach} from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ShowAlert from '@/components/ShowAlert.vue'

describe('ShowAlert.vue', ()=>{
    
    it('should render a success message when passed a success prop',()=>{
        const wrapper = shallowMount(ShowAlert,{
            props:{
                type:'success',
                message:"This is a success message"
            }
        })

        expect(wrapper.findComponent(ShowAlert).exists()).toBe(true)
        expect(wrapper.classes()).toContain('success')
        expect(wrapper.classes('success')).toBe(true)
        wrapper.unmount()
    })

    it('should render an error message when passed an error prop',()=>{
        const wrapper = shallowMount(ShowAlert,{
            props:{
                type:'error',
                message:"This is an error message"
            }
        })

        expect(wrapper.findComponent(ShowAlert).exists()).toBe(true)
        expect(wrapper.classes()).toContain('error')
        expect(wrapper.classes('error')).toBe(true)
        wrapper.unmount()
    })
})