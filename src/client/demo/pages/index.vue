<template>
  <div class='w-all h-all flex fs-16 ai-c fd-c jc-c'>
    <div class="mb10">请求次数：<el-input v-model="count" class="w-150" placeholder="请输入内容"></el-input>
    </div>
    <!-- <el-button @click="setXml" type="primary" icon="el-icon-search">发送</el-button> -->
    <span>成功：{{message}}</span>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      count: 1,
      message: ''
    }
  },
  methods: {
    setXml() {
      let url = 'www.366tax.cn:52808/DZFP/skfw.htm';

      for (let i = 0; i < this.count; i++) {
        
        setTimeout(() => {
          let parmar = `<?xml version="1.0" encoding="gbk"?>
                      <business id="FPKJ" comment="发票开具">
                      <REQUEST_COMMON_FPKJ class="REQUEST_COMMON_FPKJ">
                      <COMMON_FPKJ_FPT class="COMMON_FPKJ_FPT">
                      <FPQQLSH>YLCS${new Date().getTime()}${i}</FPQQLSH>
                      <KPLX>0</KPLX>
                      <BMB_BBH>30.0</BMB_BBH>
                      <ZSFS>0</ZSFS>
                      <XSF_NSRSBH>${new Date().getTime()}${i}E</XSF_NSRSBH>
                      <XSF_MC>宁波银行</XSF_MC>
                      <XSF_DZDH>东莞市虎门镇小捷滘捷东路东侧厂房首层 0769-89136887</XSF_DZDH>
                      <XSF_YHZH>中国工商银行东莞虎门支行 2010022109200221985</XSF_YHZH>
                      <GMF_NSRSBH>${new Date().getTime()}${i}</GMF_NSRSBH>
                      <GMF_MC>东莞令特电子有限公司</GMF_MC>
                      <GMF_DZDH></GMF_DZDH>
                      <GMF_YHZH></GMF_YHZH>
                      <KPR>杨密</KPR>
                      <SKR>王勤</SKR>
                      <FHR>贺莉丽</FHR>
                      <YFP_DM>0</YFP_DM>
                      <YFP_HM>0</YFP_HM>
                      <JSHJ>1330.35</JSHJ>
                      <HJJE>1255.05</HJJE>
                      <HJSE>75.3</HJSE>
                      <KCE></KCE>
                      <BZ></BZ>
                      </COMMON_FPKJ_FPT>
                      <COMMON_FPKJ_XMXXS class="COMMON_FPKJ_XMXX" size="1">
                      <COMMON_FPKJ_XMXX>
                      <FPHXZ>0</FPHXZ>
                      <SPBM>3040409030000000000</SPBM>
                      <ZXBM></ZXBM>
                      <XMMC>进口收派服务费</XMMC>
                      <GGXH></GGXH>
                      <DW>月</DW>
                      <XMSL>1</XMSL>
                      <XMDJ>1255.04717</XMDJ>
                      <XMJE>1255.05</XMJE>
                      <SL>0.06</SL>
                      <SE>75.3</SE>
                      </COMMON_FPKJ_XMXX>
                      </COMMON_FPKJ_XMXXS>
                      </REQUEST_COMMON_FPKJ>
                      </business>`;
          axios.post(url, parmar, { headers: { 'Content-Type': 'text/xml;charset=UTF-8' } }).then(res => {
            this.message = `成功次数：${i}`;
          })
        }, 50);

      }


    }
  }
}
</script>

<style lang='less' scoped>
</style>
