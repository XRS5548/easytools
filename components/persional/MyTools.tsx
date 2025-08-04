'use client'
import React from 'react'
import { ToolCard } from './cards'
import { useRouter } from 'next/navigation';
import mytools from '@/mytools.json';

export default function MyToolsSection() {
    const router = useRouter();
    return (
        <div id='tools'>
            <h1 className="text-4xl text-center my-5  border-b pb-4">All Tools</h1>
            <div className='flex flex-wrap justify-evenly gap-2.5 px-5 '>
                {/* {mytools.map(item=>item.title)} */}
                {mytools.map((item,indx) => {
                    return <ToolCard  image={item.image} title={item.title} onclick={()=>router.push(item.url)} key={indx} />
                })}
            </div>
        </div>
    )
}
