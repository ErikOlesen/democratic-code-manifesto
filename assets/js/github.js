async function fetchGitHubStats() {
    try {
        const repo = 'yourusername/democratic-code-manifesto';
        const [repoData, commits] = await Promise.all([
            fetch(`https://api.github.com/repos/${repo}`).then(r => r.json()),
            fetch(`https://api.github.com/repos/${repo}/commits?per_page=3`).then(r => r.json())
        ]);
        
        // Update stats
        document.getElementById('stars').textContent = `★ ${repoData.stargazers_count}`;
        document.getElementById('forks').textContent = `⑂ ${repoData.forks_count}`;
        
        // Update recent commits
        const commitsHtml = commits.map(commit => `
            <div class="commit-item">
                <div class="commit-message">${commit.commit.message}</div>
                <div class="commit-meta">${commit.commit.author.name} • ${new Date(commit.commit.author.date).toLocaleDateString()}</div>
            </div>
        `).join('');
        document.getElementById('commits').innerHTML = commitsHtml;
        
    } catch (error) {
        console.log('GitHub API rate limited, using static data');
    }
}

fetchGitHubStats();
