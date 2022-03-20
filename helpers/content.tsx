import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import remarkStringify from 'remark-stringify'
import rehypeRemark from 'rehype-remark'

export const htmlToReactParser = async (html: string) => {
  const processor = await unified()
    .use(rehypeParse)
    .use(rehypeRemark)
    .use(remarkStringify)
    .process(html)
  const result = await String(processor)
  return result
}
