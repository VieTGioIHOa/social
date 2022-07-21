import React, { useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';

import { AppContext } from '../../context/AppContext';
import { getPosts } from '../../redux/actions/posts';

export default function Pagination({ pageCount }) {

    const dispatch = useDispatch()

    const { setPage, darkTheme } = useContext(AppContext)

    const handlePaginate = ({ selected }) => {
        setPage(Number(selected) + 1)
        dispatch(getPosts(Number(selected) + 1))
    }

    return (
        <div className="text-center my-3">
            <ReactPaginate
                nextLabel={<FontAwesomeIcon className="w-full" icon={faAngleRight} />}
                previousLabel={<FontAwesomeIcon className="w-full" icon={faAngleLeft} />}
                previousLinkClassName="text-slate-400 w-full"
                nextLinkClassName="text-slate-400 w-full"
                breakLabel="..."
                breakClassName="text-blue-500 rounded-sm h-8 w-8 bg-white flex items-center justify-center"
                pageCount={Number(pageCount)}
                pageRangeDisplayed={2}
                containerClassName="flex justify-center"
                pageClassName={`${darkTheme ? 'bg-slate-900' : 'bg-slate-200'} h-8 w-8 bg-white rounded-sm shadow-sm mx-[2px] flex items-center justify-center`}
                pageLinkClassName={`${darkTheme ? 'text-white' : 'text-slate-900'}  w-full`}
                activeClassName="text-white border-2 border-solid border-blue-700"
                activeLinkClassName=""
                previousClassName={`${darkTheme ? 'bg-slate-900' : 'bg-slate-200'} h-8 w-8 bg-white rounded-sm shadow-sm mx-[2px] flex items-center justify-center`}
                nextClassName={`${darkTheme ? 'bg-slate-900' : 'bg-slate-200'} h-8 w-8 bg-white rounded-sm shadow-sm mx-[2px] flex items-center justify-center`}
                disabledClassName="bg-slate-100 text-white cursor-default"
                onPageChange={handlePaginate}
            />
        </div>
    )
}
