import { StripHtmlPipe } from './strip-html.pipe';

describe('StripHtml Pipe', () => {

  const pipe = new StripHtmlPipe();

  it('should remove the html content', () => {
    const htmlContent = '<html><body>Test</body></html>';
    expect(pipe.transform(htmlContent)).toBe('Test');
  });

  it ('should rmeove html tags that have parameters', () => {
    const htmlContent = '<html xmlns="http://www.w3.org/1999/html"><body<a href="#here"><b>Test</b></a></body</html>';
    expect(pipe.transform(htmlContent)).toBe('Test');
  });
});
