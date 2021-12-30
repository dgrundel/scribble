import markdownIt from 'markdown-it';
import turndown from 'turndown';

const mdParser = markdownIt({ 
    html: true, // Enable HTML tags in source
    // breaks: true, // Convert '\n' in paragraphs into <br>
    // typographer: true, // https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
});
const mdRenderer = new turndown({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
});

export const markdownToHtml = (md: string): string => mdParser.render(md) + '\n';
export const htmlToMarkdown = (html: string): string => mdRenderer.turndown(html);

