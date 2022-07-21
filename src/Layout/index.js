import React from 'react'
import { useSelector } from 'react-redux'

import Form from '../components/Form/Form'
import Pagination from '../components/Pagination'
import OptionsInMobile from '../components/OptionsInMob'
import NavBar from '../components/NavBar/NavBar'

export default function Layout({ children }) {

    const { pageCount } = useSelector(state => state.posts)

    return (
        <>
            <NavBar />
            <div className='flex flex-wrap flex-col sm:flex-row sm:px-0 px-3 ml-[-36px]'>
                <OptionsInMobile />
                <div className='w-full mt-24 sm:mt-0 sm:w-1/2 lg:w-2/3 pl-9'>
                    {children}
                </div>
                <div className='w-full hidden sm:block sm:w-1/2 lg:w-1/3 pl-9'>
                    <Form />
                </div>
                <div className='w-full'>
                    <Pagination pageCount={pageCount} />
                </div>
            </div>
        </>
    )
}
