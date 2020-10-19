module.exports = {
    base: '/blog/',
    title:"6Yi's Blog",
    description: 'Just playing around',
    theme: 'reco',
    author: '6yi',
  

  
    themeConfig: {
      authorAvatar: 'img/head.jpg',
      valineConfig: {
        showComment: false,
        
      },
      //导航栏
      nav: [
        { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
        { text: '关于我', link: '/views/aboutme/', icon: 'reco-date' }
      ],
    
      subSidebar: 'auto',
      type: 'blog',
      noFoundPageByTencent: false,
        // 博客配置
       blogConfig: {
         noFoundPageByTencent: false,
         "category": {
          "location": 2,
          "text": "分类"
        },
         tag: {
           location: 3,     // 在导航栏菜单中所占的位置，默认3
           text: '标签'      // 默认文案 “标签”
         }
       }
     },
     plugins: [
      [
        'vuepress-plugin-comment',
        {
          choosen: 'valine', 
          // options选项中的所有参数，会传给Valine的配置
          options: {
            el: '#valine-vuepress-comment',
            appId: 'EbkhQqOY5mUmig0iROGrAWeK-gzGzoHsz',
            appKey: 'hkwqYCeuM4Cynv2V1dmHJG0B'
          }
        }
      ]
    ]
}