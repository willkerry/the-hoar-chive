import Link from 'next/link'
import Image from 'next/image'

const Header: any = () => {
  return (
    <div className="flex items-center justify-between">
      <Link href="/">
        <a>
          <h1 className="text-2xl font-bold tracking-tight">
            The Hoar<span className="font-thin">chive</span>
          </h1>
          <p className="text-xl font-light">
            Satire, <span className="line-through">freshly</span> squeezed from
            Warwick Uni
          </p>
        </a>
      </Link>
      <a
        href="https://www.amazon.co.uk/gp/product/1543260004/ref=as_li_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1543260004&linkCode=as2&tag=wkerrycouk-21"
        className="flex py-1 pl-2 border-2 border-transparent rounded hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 active:border-gray-600"
      >
        <Image
          src="/logo/book.png"
          width={40}
          height={50}
          className="flex"
          alt="Our big white paperback Hoar book."
        />
      </a>
    </div>
  )
}

export default Header
