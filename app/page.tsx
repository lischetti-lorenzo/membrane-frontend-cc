'use client'
import { useEffect, useState } from 'react';
import { NavBar } from '../components/UI/NavBar'
import { useAccount, useNetwork } from 'wagmi';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;


  return (
    <>
      <NavBar />
    </>
  )
}
