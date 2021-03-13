import Container from '../components/container'
import PostPreview from '../components/post-preview'
import Intro from '../components/intro'
import Layout from '../components/layout'
import PostList from '../components/post-list'
import { getAllPosts } from '../lib/api'
import { BLOG_NAME } from '../lib/constants'
import Head from 'next/head'

export default function Index({ allPosts }) {
  return (
    <>
      <Layout>
        <Head>
          <title>{BLOG_NAME}</title>
        </Head>
        <Container>
          <Intro />
          <PostList>
            {allPosts.map((post) => (
              <PostPreview
                key={post.slug}
                title={post.title}
                date={post.date}
                author={post.author}
                slug={post.slug}
                excerpt={post.excerpt}
              />
            ))}
          </PostList>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'author', 'excerpt'])

  return {
    props: { allPosts },
  }
}
