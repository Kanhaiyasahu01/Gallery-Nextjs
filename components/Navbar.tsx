import React from 'react'
import Image from 'next/image'
import SearchInput from './SearchInput'
import Navitems from './Navitems'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'
const Navbar = () => {
  return (
    <div className='fixed w-full bg-white z-50 shadow-sm'>
      <div className='flex items-center max-w-6xl justify-between h-14 mx-auto px-3'>
        <div className='flex item-center gap-2'>
          <Image 
          src = {'/linkedin-logo.png'}
          alt = "Logo"
          width={35}
          height={45}
          />
          <div className='md:block hidden'>
            <SearchInput/>
          </div>
        </div>
        
        <div className='flex items-center gap-5 '>
          <div className='md:block hidden'>
            <Navitems />
          </div>
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className='rounded-full' >
                <SignInButton/>
            </div>
          </SignedOut>
        </div>
        </div>

      </div>
    </div>  
  )
}

export default Navbar