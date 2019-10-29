<template>
  <div class='w-all'>
    <div class="banner"></div>
    <div class="w-1200 m-auto">
      <div class="flex ai-c fd-c jc-c pt20">
        <div class="flex fs-18"><span class="bt-8 w-35"></span><span>我们的服务</span></div>
        <div class="flex fs-14 mt10"><span class="ml100">service</span><span class="bt-8 w-35"></span></div>
      </div>

      <div class="w-all mb20 pl30">
        <div style="width:340px;" v-for="(item, index) in list" :key="index" class="b-c h-92 ml45 mt30 flex-line ai-c jc-b">
          <img class="h-53 w-53 ra-100 ml20 mr20" :src="getUrl(item.url)" alt="">
          <div class="flex fd-c flex-1">
            <div class="fs-16">{{item.name}}</div>
            <div class="fs-12 fc-999">{{item.about}}</div>
          </div>
        </div>
      </div>

      <div class="flex ai-c fd-c jc-c pt20">
        <div class="flex fs-18"><span class="bt-8 w-35"></span><span>我们的特色</span></div>
        <div class="flex fs-14 mt10"><span class="ml100">feature</span><span class="bt-8 w-35"></span></div>
      </div>

      <div class="w-all flex fd-c pb50 pl20">
        <div v-for="(item, index) in abouts" :key="index" class="flex fd-c mb20">
          <div class="flex ai-c mb10">
            <img src="../assets/other/star.png" alt="">
            <span class="jb-fc ml5 fs-18">{{item.name}}</span>
          </div>
          <div class="fc-555" v-html="item.about"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: '信息成绩', about: '必填写真实信息', url: 'about-0' },
        { name: '地区位置', about: '选择想去的大学所在城市', url: 'about-1' },
        { name: '目标院校', about: '选择院校条件及具体院校', url: 'about-2' },
        { name: '专业选择', about: '选择感兴趣的专业,为你推荐合适你的专业', url: 'about-3' },
        { name: '留学', about: '选择留学国家，留学指导为你详细解读', url: 'about-4' },
        { name: '下载报表', about: '', url: 'about-5' },
      ],
      abouts: [
        {
          name: '超大的用户使用量支撑',
          about: '经过2017、2018浙江新高考两年的超<span class="fc-000 fb">10万</span>用户的使用。'
        },
        {
          name: '各级专业门类完美匹配',
          about: '能够做到专业从年度招生计划<span class="fc-000 fb">精确匹配</span>、专业门类到大类到二级专业（本专各500多）的<span class="fc-000 fb">精确和模糊查询匹配</span>。专业匹配从两个维度做到了匹配。'
        },
        {
          name: '混合位次比算法精准定位',
          about: '查询结果的算法完全采用<span class="fc-000 fb">混合位次比算法</span>，学生在查询结果可以按照自己喜好进行再次筛选的冲稳保结果查看。有两种下载结果方式可供选择。'
        },
        {
          name: '电脑手机双端快捷查询',
          about: '手机端也可以做到志愿查询显示<span class="fc-000 fb">多种查询数据结果</span>（竖屏和横屏显示），且可以将手机的查询分享给需要的考生、家长、老师便于大家在填报志愿上进行交流和沟通讨论。'
        },
        {
          name: '普通类艺体类一网打尽',
          about: '金榜题名系统是浙江省新高考志愿填报辅助系统中目前能够完善解决<span class="fc-000 fb">普通类平行志愿填报和艺体类平行志愿填报</span>查询的系统。'
        },
        {
          name: '高一选课查询快人一步',
          about: '金榜题名系统能够给<span class="fc-000 fb">高一学生</span>在七选三选课规划时提供<span class="fc-000 fb">未来高考</span>时选课对应可填报志愿的查询，让高一学生做到提前规划高考目标。'
        },
      ]
    }
  },
  methods: {
    getUrl(url) {
      return require('../assets/other/' + url + '.png');
    }
  },
  created() {

  }
}
</script>

<style lang='less' scoped>
.banner {
  height: 390px;
  width: 100%;
  background-image: url("../assets/banner/jb-pc-b-3.png");
  background-size: 100% 100%;
}
</style>
