import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { GetStaticProps } from 'next'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm } from 'react-tinacms-github'
import Layout from '../components/layout'

export const Index = ({ file }): JSX.Element => {
  const [data, form] = useGithubJsonForm(file, {
    label: 'Home Page',
    fields: [{ name: 'title', component: 'text' }],
  })
  usePlugin(form)

  return (
    <Layout>
      <Head>
        <title>{data.title}</title>
      </Head>
      <h1>About the OSU Argon Geochronology Lab</h1>
    </Layout>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/home.json',
      parse: parseJson,
    })
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default,
      },
    },
  }
}
