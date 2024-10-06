'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { useUser } from "@/components/utility/auth/Auth"

import './layout.scss'

export default function Nav() {
  const { username } = useUser();
  
  return (
    <nav>
      Emerald Empire
      <div className="links-wrapper">
        <Link href="/">Home</Link>
        <Link href="/games">Games</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        { username.length > 0 ? <Link href="/profile">{username}</Link> : <Link href="/login">Login</Link> }
      </div>
    </nav>
  )
}