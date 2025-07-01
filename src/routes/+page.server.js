import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

export async function load() {
	try {
		// Read the canonical markdown file from project root
		const manifestoPath = path.join(process.cwd(), 'index.md');
		const manifestoContent = fs.readFileSync(manifestoPath, 'utf-8');

		// Remove Jekyll frontmatter if present
		const content = manifestoContent.replace(/^---[\s\S]*?---\n/, '');

		// Convert to HTML with marked
		const html = marked(content);

		return {
			manifestoHtml: html,
			manifestoMarkdown: content // Also provide raw markdown if needed
		};
	} catch (error) {
		console.error('Error loading manifesto:', error);
		return {
			manifestoHtml: '<h1>Error loading manifesto</h1><p>Could not load the manifesto content.</p>',
			manifestoMarkdown: ''
		};
	}
}
