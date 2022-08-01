import React from 'react'

export default function SkeletonPageDetail() {
    return (
        <div className="animate-pulse p-5 bg-slate-200 rounded-xl shadow-xl">
            <div className="flex flex-col-reverse sm:flex-row rounded-xl overflow-hidden">
                <div className="sm:w-3/5 sm:px-3 sm:mt-0 mt-4 w-full">
                    <div className='p-4 bg-slate-500 rounded-md  w-40'></div>
                    <div className='p-2 bg-slate-500 rounded-md my-2 w-24'></div>
                    <div className='h-10 w-full bg-slate-500 rounded-md'></div>
                    <div className='flex mx-[-12px]'>
                        <div className="p-3 w-1/2 ">
                            <div className="bg-slate-500 h-40 rounded-md"></div>
                        </div>
                        <div className="p-3 w-1/2 ">
                            <div className="bg-slate-500 h-40 rounded-md"></div>
                        </div>
                    </div>
                </div>
                <div className="sm:w-2/5 sm:px-3 w-full ">
                    <div className='h-[280px] rounded-md bg-slate-500'></div>
                </div>
            </div>
        </div>
    )
}
