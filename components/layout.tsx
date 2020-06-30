import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import { useGithubEditing } from 'react-tinacms-github'

const Layout: FunctionComponent<{ preview?: any }> = ({
  children,
  preview,
}) => {
  const router = useRouter()
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Menu pointing secondary inverted>
          <Container>
            <img className="logo" src="/logo.png" />
            <Link href="/">
              <Menu.Item
                active={router.pathname === '/'}
                as="a"
                name="home"
                style={{ margin: '-.5em 0 .5em' }}
              >
                Home
              </Menu.Item>
            </Link>
            <Link href="/about-us">
              <Menu.Item
                active={router.pathname === '/about-us'}
                as="a"
                name="about-us"
                style={{ margin: '-.5em 0 .5em' }}
              >
                About Us
              </Menu.Item>
            </Link>
            <Menu.Item position="right">
              <EditLink editMode={preview} />
            </Menu.Item>
          </Container>
        </Menu>
      </header>
      <main>
        <Container>{children}</Container>
      </main>
      <footer>
        <Container>Footer</Container>
      </footer>
      <style jsx>{`
        header {
          position: fixed;
          width: 100%;
          background: black;
          padding: 0.5em 0;
        }
        .logo {
          height: 3em;
          padding-right: 1em;
          margin-right: 1em;
          border-right: 1px solid white;
        }
        header .menuItem {
          margin-top: -0.5em;
          margin-bottom: 0.5em;
        }
        main {
          padding-top: 6em;
        }
        footer {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 60px;
          padding-top: 20px;
          padding-bottom: 20px;
          background-color: #f5f5f5;
          margin-top: 0;
          margin-bottom: 0;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  )
}

export default Layout

export interface EditLinkProps {
  editMode: boolean
}

export const EditLink = ({ editMode }: EditLinkProps) => {
  const github = useGithubEditing()

  return (
    <Button
      as="a"
      inverted
      onClick={editMode ? github.exitEditMode : github.enterEditMode}
    >
      {editMode ? 'Exit Edit Mode' : 'Edit Mode'}
    </Button>
  )
}
