import Link from 'next/link'
import Image from 'next/image'

export default function CoverImage({ title, src, slug }) {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      width="100%"
      height="57%"
      layout="responsive"
    />
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
