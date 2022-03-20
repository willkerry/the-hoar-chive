import Head from 'next/head'

const Meta = ({
  title = 'The Hoar',
  description,
  image = 'https://thehoar.org/wp-content/uploads/2016/03/Facebook-1.png',
  type,
  date,
}: {
  title?: string
  description: string
  image?: string
  type: 'website' | 'article'
  date: string
}) => {
  const publication: string = 'The Hoar'
  return (
    <Head>
      {title !== publication ? (
        <title>
          {title} | {publication}
        </title>
      ) : (
        <title>{publication} – Satire, freshly squeezed from Warwick Uni</title>
      )}
      <meta name="description" content={description} />
      <meta name="article:published_time" content={date} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="The Hoar" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@thehoar" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        href="/favicon/favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="/favicon/favicon-16x16.png"
        sizes="16x16"
      />
      <link rel="manifest" href="/favicon/manifest.json" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-/>ab.svg"
        color="#000000"
      />
      <meta name="theme-color" content="#000000" />
    </Head>
  )
}

export default Meta
