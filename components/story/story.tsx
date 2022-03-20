import React from 'react'
import StoryType from '../../types/story'
import Image from 'next/image'

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
      <p className="pb-6 text-xl font-light leading-snug">{description}</p>
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
    </article>
  )
}
