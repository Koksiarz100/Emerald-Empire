'use client'

import Link from "next/link"
import { useState, useEffect } from "react"

import './layout.scss'

import checkCredentials from "../utility/auth/actions/checkCredentials"

export default function Nav() {
  const [ username, setUsername ] = useState<string>('');

  useEffect(() => {
    async function fetchUsername() {
      const username = await checkCredentials();
      if (username) {
        setUsername(username);
      }
    }
  
    fetchUsername();
  }, []);

  return (
    <nav>
      Emerald Empire
      <div className="links-wrapper">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        { username.length > 0 ? <Link href="/profile">{username}</Link> : <Link href="/login">Login</Link> }
      </div>
    </nav>
  )
}