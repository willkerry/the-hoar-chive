import Link from 'next/link'

const Footer: any = () => {
  return (
    <footer className="flex items-center justify-center w-full h-24 border-t">
      <div className="w-full max-w-screen-sm p-4 text-sm text-gray-700">
        <div className="flex gap-3">
          <Link href="/about">
            <a className="underline hover:no-underline">About</a>
          </Link>
          <Link href="/book">
            <a className="underline hover:no-underline">Book</a>
          </Link>
          <p>
            © The Hoar 2016. Freshly squeezed from the University of Warwick.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
