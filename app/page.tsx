import { Cards } from '@/components/persional/cards';
import { HeroSection } from '@/components/persional/hero-section'
import { NavbarTop } from '@/components/persional/navbar'
import React from 'react'

export default function page() {
  const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows
`;
  return (
    <>
      <NavbarTop />
      <HeroSection />
      <h1 className="text-4xl text-center mt-5 border-b pb-4">All Tools</h1>
      <div className='flex flex-wrap justify-evenly gap-2.5 px-5 '>
        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,].map((item)=>{
          return <Cards key={item} />
        })}
      </div>
    </>
  )
}
