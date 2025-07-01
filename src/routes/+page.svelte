<script lang="ts">
	import { onMount } from 'svelte';
	import { m } from '$lib/paraglide/messages.js';

	export let data: {
		manifestoHtml: string;
		manifestoMarkdown: string;
	};

	interface GitHubCommit {
		sha: string;
		commit: {
			author: {
				name: string;
				date: string;
			};
			message: string;
		};
	}

	let githubStats = { stars: '--', forks: '--', contributors: '--' };
	let commits: GitHubCommit[] = [];

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}).format(date);
	}

	async function fetchGitHubStats() {
		try {
			const repo = 'erikolesen/democratic-code-manifesto';

			const [repoData, commitsData] = await Promise.all([
				fetch(`https://api.github.com/repos/${repo}`).then((r) => r.json()),
				fetch(`https://api.github.com/repos/${repo}/commits?per_page=3`).then((r) => r.json())
			]);

			githubStats.stars = repoData.stargazers_count;
			githubStats.forks = repoData.forks_count;
			commits = commitsData;

			// Get contributor count
			const contributors = await fetch(`https://api.github.com/repos/${repo}/contributors`).then(
				(r) => r.json()
			);
			githubStats.contributors = contributors.length;
		} catch (error) {
			console.log('GitHub API error (likely rate limited):', error);
		}
	}

	onMount(() => {
		fetchGitHubStats();
	});
</script>

<svelte:head>
	<title>Democratic Code: A Manifesto</title>
	<meta
		name="description"
		content="Software that embodies democratic values creates more democratic organizations"
	/>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8">
	<header class="mb-8 border-b-4 border-gray-900 pb-4 text-center">
		<h1 class="font-bagnard-bold mb-2 text-5xl tracking-tight uppercase">Democratic Code</h1>
		<p class="font-bagnard-italic mb-4 text-xl text-gray-600">
			Software that embodies democratic values creates more democratic organizations
		</p>
		<p class="font-bagnard-sans text-sm tracking-wider text-gray-500 uppercase">
			A Living Manifesto • Version 1.0 • Open Source
		</p>
	</header>

	<nav class="my-6 border-t border-b border-gray-300 py-3 text-center">
		<a
			href="#preamble"
			class="font-bagnard-sans mx-4 border-b-2 border-transparent text-sm tracking-wider text-gray-900 uppercase no-underline transition-colors hover:border-gray-900"
			>Manifesto</a
		>
		<a
			href="#the-four-pillars-philosophical-foundations"
			class="font-bagnard-sans mx-4 border-b-2 border-transparent text-sm tracking-wider text-gray-900 uppercase no-underline transition-colors hover:border-gray-900"
			>Principles</a
		>
		<a
			href="#from-principles-to-practice-implementation-framework"
			class="font-bagnard-sans mx-4 border-b-2 border-transparent text-sm tracking-wider text-gray-900 uppercase no-underline transition-colors hover:border-gray-900"
			>Practice</a
		>
		<a
			href="#the-future-were-building"
			class="font-bagnard-sans mx-4 border-b-2 border-transparent text-sm tracking-wider text-gray-900 uppercase no-underline transition-colors hover:border-gray-900"
			>Action</a
		>
		<a
			href="https://github.com/erikolesen/democratic-code-manifesto"
			target="_blank"
			class="font-bagnard-sans mx-4 border-b-2 border-transparent text-sm tracking-wider text-gray-900 uppercase no-underline transition-colors hover:border-gray-900"
			>GitHub</a
		>
	</nav>

	<main
		class="prose prose-lg prose-headings:font-bold prose-h2:text-3xl prose-h2:uppercase prose-h2:tracking-tight prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:italic prose-h3:mt-6 prose-h3:mb-3 prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2 prose-p:text-justify prose-p:mb-4 prose-a:text-gray-900 prose-a:underline hover:prose-a:bg-gray-100 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-pre:bg-gray-100 prose-pre:border-l-4 prose-pre:border-gray-900 prose-pre:p-5 prose-pre:my-6 prose-pre:overflow-x-auto prose-ul:my-4 prose-ul:ml-8 prose-ol:my-4 prose-ol:ml-8 prose-li:mb-2 max-w-none"
	>
		<!-- Render the manifesto HTML - content is trusted as it comes from our own markdown -->
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html data.manifestoHtml}
	</main>

	<aside class="my-8 border border-l-4 border-gray-300 border-l-gray-900 bg-gray-100 p-6">
		<h3 class="font-bagnard-bold mt-0 mb-4 text-lg tracking-wider uppercase">
			{m.sidebar_community_title()}
		</h3>
		<div
			class="font-bagnard-sans my-4 flex flex-col justify-between gap-2 text-sm sm:flex-row sm:gap-0"
		>
			<div class="text-center">
				<span class="block text-xl font-bold">★ {githubStats.stars}</span>
				<span>{m.sidebar_stars()}</span>
			</div>
			<div class="text-center">
				<span class="block text-xl font-bold">⑂ {githubStats.forks}</span>
				<span>{m.sidebar_forks()}</span>
			</div>
			<div class="text-center">
				<span class="block text-xl font-bold">👥 {githubStats.contributors}</span>
				<span>{m.sidebar_contributors()}</span>
			</div>
		</div>

		<h4 class="font-bagnard-bold mb-3 text-base">{m.sidebar_recent_activity()}</h4>
		<div class="space-y-2">
			{#if commits.length > 0}
				{#each commits as commit (commit.sha)}
					<div class="font-bagnard-serif border-b border-gray-200 pb-2 text-sm">
						<div class="font-bold">{commit.commit.message.split('\n')[0]}</div>
						<div class="font-bagnard-sans text-xs text-gray-600">
							{commit.commit.author.name} • {formatDate(commit.commit.author.date)}
						</div>
					</div>
				{/each}
			{:else}
				<div class="font-bagnard-serif border-b border-gray-200 pb-2 text-sm">
					<div class="font-bold">{m.sidebar_loading_activity()}</div>
					<div class="font-bagnard-sans text-xs text-gray-600">{m.sidebar_github_api()}</div>
				</div>
			{/if}
		</div>

		<p class="font-bagnard-sans mt-4 text-sm">
			<a
				href="https://github.com/erikolesen/democratic-code-manifesto"
				target="_blank"
				class="text-gray-900 underline hover:bg-gray-200">{m.sidebar_contribute()}</a
			>
			•
			<a
				href="https://github.com/erikolesen/democratic-code-manifesto/discussions"
				target="_blank"
				class="text-gray-900 underline hover:bg-gray-200">{m.sidebar_join_discussion()}</a
			>
			•
			<a
				href="https://github.com/erikolesen/democratic-code-manifesto/fork"
				target="_blank"
				class="text-gray-900 underline hover:bg-gray-200">{m.sidebar_fork_manifesto()}</a
			>
		</p>
	</aside>

	<footer class="mt-12 border-t border-gray-300 pt-8 text-center text-sm text-gray-600">
		<p class="font-bagnard-serif mb-4 italic">
			{m.footer_living_manifesto()}
		</p>
		<p class="font-bagnard-sans">
			{m.footer_licensed_under()}
			<a
				href="https://creativecommons.org/licenses/by-sa/4.0/"
				target="_blank"
				class="text-gray-900 underline hover:bg-gray-100">CC BY-SA 4.0</a
			>
			•
			<a
				href="https://github.com/erikolesen/democratic-code-manifesto"
				target="_blank"
				class="text-gray-900 underline hover:bg-gray-100">{m.footer_source_code()}</a
			>
		</p>
	</footer>
</div>

<style>
	/* Custom utilities that aren't in Tailwind by default */
	@layer utilities {
		.prose h2:target,
		.prose h3:target,
		.prose h4:target {
			@apply -mx-2 rounded bg-yellow-100 px-2 py-1;
		}
	}
</style>
