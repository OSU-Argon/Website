import App, { AppProps } from 'next/app'
import React, { FunctionComponent } from 'react'
import { RecoilRoot } from 'recoil'
import { TinaCMS, TinaProvider } from 'tinacms'
import { GithubClient, TinacmsGithubProvider } from 'react-tinacms-github'
import 'semantic-ui-css/semantic.min.css'

const AppComponent: FunctionComponent<{ pageProps?: any }> = ({
  pageProps,
  children,
}) => {
  const cms = new TinaCMS({
    enabled: pageProps.preview,
    apis: {
      github: new GithubClient({
        proxy: '/api/proxy-github',
        authCallbackRoute: '/api/create-github-access-token',
        clientId: process.env.GITHUB_CLIENT_ID,
        baseRepoFullName: process.env.REPO_FULL_NAME,
        baseBranch: process.env.BASE_BRANCH,
      }),
    },
    sidebar: true,
    toolbar: true,
  })
  return (
    <TinaProvider cms={cms}>
      <TinacmsGithubProvider
        onLogin={() => {
          const token = localStorage.getItem('tinacms-github-token') || null
          const headers = new Headers()
          if (token) {
            headers.append('Authorization', 'Bearer ' + token)
          }
          return fetch(`/api/preview`, { headers: headers }).then(() => {
            window.location.href = window.location.pathname
          })
        }}
        onLogout={() => {
          return fetch(`/api/reset-preview`).then(() => {
            window.location.reload()
          })
        }}
        error={pageProps.error}
      >
        {children}
      </TinacmsGithubProvider>
    </TinaProvider>
  )
}

export default class AppClass extends App {
  constructor(props: AppProps) {
    super(props)
  }
  render(): JSX.Element {
    const { Component, pageProps } = this.props
    return (
      <RecoilRoot>
        <AppComponent pageProps={pageProps}>
          <Component {...pageProps} />
        </AppComponent>
      </RecoilRoot>
    )
  }
}
