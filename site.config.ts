import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '1cad70bfc05f802a8519df6546101d17',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'Jesse Qin\'s Blogs',
  domain: 'jesseqin.me',
  author: 'Jesse Qin',

  // open graph metadata (optional)
  description: 'Welcome to my blogs!',

  // social usernames (optional)
  twitter: 'Jesse8868',
  github: 'JesseQin123',
  linkedin: 'koodall-jesseqin-phd',
  // mastodon: '#', // optional mastodon profile URL, provides link verification
  // newsletter: '#', // optional newsletter URL
  // youtube: '#', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  // pageUrlOverrides: {
  //   '/foo': '067dd719a912471ea9a3ac10710e7fdf',
  //   '/bar': '0be6efce9daf42688f65c76b89f8eb27'
  // }
  pageUrlOverrides: null,

  // whether to use the default notion navigation style or a custom one with links to
  // important pages. To use `navigationLinks`, set `navigationStyle` to `custom`.
  // navigationStyle: 'default'
  navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'Blogs',
      pageId: '1cad70bfc05f8151bf44ddc6991d2d57'
    },
    {
      title: 'Readings',
      pageId: '1cad70bfc05f81faa2d9f743496d3801'
    },
    {
      title: 'Skills',
      pageId: '1d2d70bfc05f802b8fb9dfb8998d70ac'
    },
    {
      title: 'About',
      pageId: '1cad70bfc05f8078a0d9d049ca20bdcf'
    }
  ]
})
