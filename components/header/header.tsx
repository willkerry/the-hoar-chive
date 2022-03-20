import Link from 'next/link'

const Header: any = () => {
  return (
    <Link href="/">
      <a>
        <h1 className="text-2xl font-bold tracking-tight">
          The Hoar<span className="font-thin">chive</span>
        </h1>
        <p className="text-xl font-light">
          Satire, <span className="line-through">freshly</span> squeezed from Warwick Uni
        </p>
      </a>
    </Link>
  )
}

export default Header
