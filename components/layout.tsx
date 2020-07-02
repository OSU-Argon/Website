import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FunctionComponent } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { useCMS } from 'tinacms';

const Layout: FunctionComponent = ({ children }) => {
	const router = useRouter();
	const cms = useCMS();
	return (
		<>
			<Head>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<Container>{children}</Container>
			</main>
			<header>
				<Menu pointing secondary inverted>
					<Container>
						<img height='42' width='147' className='logo' src='/logo.png' />
						<Link href='/'>
							<Menu.Item
								active={router.pathname === '/'}
								as='a'
								name='home'
								style={{ margin: '-.5em 0 .5em' }}
							>
								Home
							</Menu.Item>
						</Link>
						<Link href='/about-us'>
							<Menu.Item
								active={router.pathname === '/about-us'}
								as='a'
								name='about-us'
								style={{ margin: '-.5em 0 .5em' }}
							>
								About Us
							</Menu.Item>
						</Link>
						<Menu.Item position='right'>
							<Button as='a' inverted onClick={() => cms && cms.toggle()}>
								{cms && cms.enabled ? 'Exit Edit Mode' : 'Edit Mode'}
							</Button>
						</Menu.Item>
					</Container>
				</Menu>
			</header>
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
					padding-right: 1em;
					margin-right: 1em;
					border-right: 1px solid white;
				}
				header .menuItem {
					margin-top: -0.5em;
					margin-bottom: 0.5em;
				}
				main {
					position: absolute;
					width: 100%;
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
	);
};

export default Layout;
