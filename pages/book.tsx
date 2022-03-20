import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Meta from '../components/meta'

const Book: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 antialiased">
      <Meta
        title="We wrote a book"
        description="Fancy a new doorstop?"
        image="https://thehoar.org/wp-content/uploads/2017/02/book.jpg"
        type="website"
        date="2016-09-08T11:09:39+00:00"
      />
      <main className="flex flex-col flex-1 max-w-screen-sm gap-2 px-4 my-8">
        <Header />

        <div className="my-12 prose">
          <h2 className="text-5xl font-light tracking-tight">
            We wrote a book
          </h2>

          <Image
            src="https://thehoar.org/wp-content/uploads/2017/02/book.jpg"
            width={608}
            height={405}
          />

          <p>This is the end, darling readers.</p>

          <p>
            In Warwick, everything passes, nothing changes. As such, in a year
            of existence, the Hoar captured all that it wished to say in this
            narrow, grey, corporate affair of a university. Should you ever find
            yourself resenting this mechanistic campus of grating self-interest
            in the West Midlands — open a bottle of red and find your grievance
            here in this book.
          </p>

          <p>It’s been a pleasure Hoaring ourselves out for you,</p>

          <p>With love,</p>

          <p>Theodora x</p>

          <div className="flex justify-center">
            <Link href="https://www.amazon.co.uk/gp/product/1543260004/ref=as_li_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1543260004&linkCode=as2&tag=wkerrycouk-21">
              <a className="px-4 py-2 no-underline uppercase border-2 border-gray-800 rounded focus:outline-none hover:bg-gray-800 hover:text-white focus:ring-4 focus:ring-yellow-400 active:translate-y-px active:bg-gray-700 active:text-white">
                Buy the book on Amazon
              </a>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Book
