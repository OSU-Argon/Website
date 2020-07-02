import App, { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { TinaCMS, TinaProvider } from 'tinacms';
import { GithubClient, TinacmsGithubProvider } from 'react-tinacms-github';
import { BranchSwitcherPlugin } from '../tina-plugins/branch-switcher';
import 'semantic-ui-css/semantic.min.css';

export default class AppClass extends App {
	cms: TinaCMS;
	constructor(props: AppProps) {
		super(props);
		this.cms = new TinaCMS({
			enabled: props.pageProps.preview,
			plugins: [BranchSwitcherPlugin],
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
			toolbar: {
				buttons: {
					save: 'Save',
					reset: 'Reset',
				},
			},
		});
	}
	render(): JSX.Element {
		const { Component, pageProps } = this.props;
		return (
			<TinaProvider cms={this.cms}>
				<TinacmsGithubProvider
					onLogin={onLogin}
					onLogout={onLogout}
					error={pageProps.error}
				>
					<RecoilRoot>
						<Component {...pageProps} />
					</RecoilRoot>
				</TinacmsGithubProvider>
			</TinaProvider>
		);
	}
}

const onLogin = () => {
	const token = localStorage.getItem('tinacms-github-token') || null;
	const headers = new Headers();
	if (token) {
		headers.append('Authorization', 'Bearer ' + token);
	}
	return fetch(`/api/preview`, { headers: headers }).then(() => {
		window.location.href = window.location.pathname;
	});
};

const onLogout = () => {
	return fetch(`/api/reset-preview`).then(() => {
		window.location.reload();
	});
};
