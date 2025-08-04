'use client'
import React from 'react'
import { ToolCard } from './cards'
import { useRouter } from 'next/navigation';

export default function MyToolsSection() {
    const router = useRouter();
    return (
        <>
            <h1 className="text-4xl text-center my-5  border-b pb-4">All Tools</h1>
            <div className='flex flex-wrap justify-evenly gap-2.5 px-5 '>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,].map((item) => {
                    return <ToolCard  image="https://images-cdn.ubuy.co.in/634e3087a8d91d07b6770436-myogrip-5-ft-halloween-hanging-ghost.jpg" title='Sample Title' onclick={(e)=>router.push('/sample')} key={item} />
                })}
            </div>
        </>
    )
}
