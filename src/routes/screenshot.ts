import { FastifyPluginAsync } from 'fastify';
import puppeteer from 'puppeteer';

const screenshotRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post<{ Body: { url: string } }>('/screenshot', async (request, reply) => {
    const { url } = request.body;

    
    console.log(`Received request to capture screenshot for URL: ${url}`);

    if (!url || !/^https?:\/\/.+$/.test(url)) {
      console.log('Invalid URL received:', url);  
      return reply.status(400).send({ error: 'Invalid URL' });
    }

    try {
      
      console.log('Launching browser...');
      const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser', 
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu',
        ]
      });

      
      console.log('Opening new page...');
      const page = await browser.newPage();

      
      console.log(`Navigating to URL: ${url}`);
      await page.goto(url, { waitUntil: 'networkidle2' });

      
      console.log('Taking screenshot...');
      const screenshot = await page.screenshot({ type: 'png' });

      if (!screenshot) {
        console.log('Screenshot capture failed: no image data returned.');
        await browser.close();
        return reply.status(500).send({ error: 'Failed to capture screenshot: No image data returned' });
      }

      console.log('Screenshot captured successfully.');

      
      await browser.close();

      
      console.log('Sending screenshot as response...');
      reply
        .header('Content-Type', 'image/png')
        .header('Content-Disposition', `inline; filename="screenshot.png"`)
        .send(screenshot);

    } catch (error) {
      
      console.error('Error occurred while capturing screenshot:', error);

      if (error instanceof Error) {
        reply.status(500).send({ error: 'Failed to capture screenshot', details: error.message });
      } else {
        reply.status(500).send({ error: 'Failed to capture screenshot' });
      }
    }
  });
};

export default screenshotRoute;
