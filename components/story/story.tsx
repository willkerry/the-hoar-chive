import React from 'react'
import StoryType from '../../types/story'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export default function Story({
  slug,
  title,
  date,
  description,
  aspectRatio,
  body,
  ogimage,
}: StoryType) {
  const prettyDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return (
    <article id={slug}>
      <time
        dateTime={date}
        className="block mb-3 text-xs tracking-wide uppercase"
      >
        {prettyDate}
      </time>

      <h2 className="mb-4 text-4xl font-semibold leading-9 tracking-tight">
        {title}
      </h2>
      <p className="pb-6 text-lg font-light leading-snug">{description}</p>

      {aspectRatio && (
        <div className="flex mb-6 overflow-hidden border rounded">
          <Image
            src={ogimage}
            alt={title}
            width={606}
            height={606 / aspectRatio}
          />
        </div>
      )}

      <div
        className="prose"
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      />
      <p className="px-4 py-3 mt-12 text-gray-500 border rounded">
        <strong className="font-medium text-gray-800">
          Editors’ explanation, apology and excuse:
        </strong>{' '}
        The Hoar shut down a little while after it stopped being funny. This
        site is a snapshot taken around that time. All of these articles were
        sent in by readers whose names we didn’t ask for, and were published
        mostly without prejudice.
      </p>
    </article>
  )
}
