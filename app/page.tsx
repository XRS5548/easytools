import { HeroSection } from '@/components/persional/hero-section'
import MyToolsSection from '@/components/persional/MyTools';
import { NavbarTop } from '@/components/persional/navbar'
import React from 'react'


export default function page() {
  const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows
`;
  return (
    <>
      <HeroSection />
      <MyToolsSection />
    </>
  )
}
