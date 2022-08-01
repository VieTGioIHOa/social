import React from 'react'

export default function Skeleton() {
    return (
        <div className="w-full lg:flex lg:mx-[-8px]">
            <div className="animate-pulse lg:w-1/2 lg:px-2 mb-3 ">
                <div className="bg-slate-200 rounded-xl overflow-hidden">
                    <div className="h-[175px] bg-slate-500"></div>
                    <div className="mt-2 p-5">
                        <div className='p-2 bg-slate-500 rounded-md w-24'></div>
                        <div className='p-4 bg-slate-500 rounded-md my-2 w-40'></div>
                        <div className="h-[74px] bg-slate-500 rounded-md"></div>
                        <div className='flex justify-between mt-2'>
                            <div className="p-3 w-16 bg-slate-500 rounded-md"></div>
                            <div className="p-3 w-16 bg-slate-500 rounded-md"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="animate-pulse lg:w-1/2 lg:px-2 mb-3 ">
                <div className="bg-slate-200 rounded-xl overflow-hidden">
                    <div className="h-[175px] bg-slate-500"></div>
                    <div className="mt-2 p-5">
                        <div className='p-2 bg-slate-500 rounded-md w-24'></div>
                        <div className='p-4 bg-slate-500 rounded-md my-2 w-40'></div>
                        <div className="h-[74px] bg-slate-500 rounded-md"></div>
                        <div className='flex justify-between mt-2'>
                            <div className="p-3 w-16 bg-slate-500 rounded-md"></div>
                            <div className="p-3 w-16 bg-slate-500 rounded-md"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
