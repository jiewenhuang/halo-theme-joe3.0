import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Halo-theme-Joe3",
  description: "Halo-theme-Joe3 base docs",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Demo', link: 'https://www.jiewen.run/?preview-theme=theme-Joe3' }
    ],

    sidebar: [
      {
        text: '开始',
        items: [
          { text: '介绍', link: '/guide/what-is-joe3' },
        ],
        collapsible: true,
        collapsed: true
      },
      {
        text: '功能',
        items: [
          { text: '自定义标签', link: '/theme-style/custom-labels' },
        ],
        collapsible: true,
        collapsed: true
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jiewenhuang/halo-theme-joe3.0' }
    ],
    editLink: {
      pattern: ({ filePath }) => {
        if (filePath.startsWith('packages/')) {
          return `https://github.com/jiewenhuang/halo-theme-joe3.0/tree/main/docs/docs/${filePath}`
        } else {
          return `https://github.com/jiewenhuang/halo-theme-joe3.0/tree/main/docs/docs/${filePath}`
        }
      }
    },
    lastUpdated: true
  }
})
