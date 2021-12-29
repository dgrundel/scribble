import markdownIt from 'markdown-it';
import turndown from 'turndown';

const mdParser = markdownIt({ 
    html: true,
});
const mdRenderer = new turndown({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
});

export const markdownToHtml = (md: string): string => mdParser.render(md) + '\n';
export const htmlToMarkdown = (html: string): string => mdRenderer.turndown(html);

