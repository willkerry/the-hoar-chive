import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Meta from '../components/meta'

const About: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 antialiased">
      <Meta
        title="About"
        description="The Hoar was a satire rag."
        image="https://thehoar.org/wp-content/uploads/2016/03/protest-footer.png"
        type="website"
        date="2016-09-08T11:09:39+00:00"
      />
      <main className="flex flex-col flex-1 max-w-screen-sm gap-2 px-4 my-8">
        <Header />

        <div className="my-12 prose">
          <p className="px-4 py-3 text-sm text-gray-500 border rounded">
            <strong className="font-medium text-gray-800">
              Editors’ explanation, apology and excuse:
            </strong>{' '}
            The Hoar shut down a little while after it stopped being funny. This
            site is a snapshot taken around that time. All of these articles
            were sent in by readers whose names we didn’t ask for, and were
            published mostly without prejudice.
          </p>
          <h2 className="text-4xl font-light tracking-tight">
            The<em> Hoar</em> was a satire rag,
            <br />
            vigorously squeezed from
            <br />
            the grey vistas of Warwick Uni.
          </h2>
          <p>
            People tried to explain what we did on{' '}
            <a
              className="line-through"
              title="Some meat-hook abortion of a Trump-tower frat-kid killed the Hoar’s Wikipedia page, presumably because the local schools were out for summer."
            >
              Wikipedia
            </a>
            &nbsp;and in{' '}
            <Link href="http://thetab.com/uk/warwick/2016/02/22/spoke-hoar-satire-free-speech-next-target-13136">
              <a>
                <em>The Tab</em>
              </a>
            </Link>
            .<br />
            We got{' '}
            <a href="http://thetab.com/uk/warwick/2016/06/02/warwick-bnoc-nomination-2016-theodora-hoar-14881">
              nominated
            </a>{' '}
            for BNOC of the year too.
          </p>
          <p>
            After a few seconds of thought we closed the <em>Hoar</em> to focus
            on our drinking.
          </p>
          <p>
            <Link href="https://thehoar.org/wp-content/uploads/2017/02/will-and-will-300x158.jpg">
              Will &amp; Will
            </Link>
          </p>
          <Image
            src="https://thehoar.org/wp-content/uploads/2016/03/protest-footer.png"
            width={608}
            height={166}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default About
