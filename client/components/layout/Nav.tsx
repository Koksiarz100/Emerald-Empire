import Link from "next/link"

import './layout.scss'

export default function Nav() {
  return (
    <nav>
      Emerald Empire
      <div className="links-wrapper">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  )
}