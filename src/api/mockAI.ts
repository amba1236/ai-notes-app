// Generate a short AI-style summary from rich text content
export async function generateAISummary(content: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let text = content
        .replace(/<\/(p|div|br)>/gi, '. ')
        .replace(/<(li)>/gi, '• ')
        .replace(/<\/*ul>/gi, '')
        .replace(/<[^>]*>?/gm, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (!/[.!?]$/.test(text)) text += '.';

      const short = text.substring(0, 160).trim();

      resolve(short ? `${short}... (AI summary)` : 'No content to summarise.');
    }, 1200);
  });
}
