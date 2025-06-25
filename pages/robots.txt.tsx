import type { GetServerSideProps } from 'next'

import { host } from '@/lib/config'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ error: 'method not allowed' }))
    res.end()

    return {
      props: {}
    }
  }

  // cache for up to one day
  res.setHeader('Cache-Control', 'public, max-age=86400, immutable')
  res.setHeader('Content-Type', 'text/plain')

  // Allow crawling in production or if explicitly enabled
  const isProduction = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'
  const allowCrawling = isProduction || process.env.ALLOW_CRAWLING === 'true'

  if (allowCrawling) {
    res.write(`User-agent: *
Allow: /

# Disallow API routes and sensitive paths
Disallow: /api/
Disallow: /_next/
Disallow: /404
Disallow: /500

# Allow specific API endpoints that should be crawlable
Allow: /api/social-image

# Crawl delay to be respectful to server
Crawl-delay: 1

# Sitemap location
Sitemap: ${host}/sitemap.xml
`)
  } else {
    res.write(`User-agent: *
Disallow: /

Sitemap: ${host}/sitemap.xml
`)
  }

  res.end()

  return {
    props: {}
  }
}

export default function noop() {
  return null
}
