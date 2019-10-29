<template>
  <div class='w-all jbbc setp'>
    <div class="w-1200 m-auto">
      <!-- 进度条 -->
      <div class="w-all flex jc-c mt20">
        <div class="process">
          <div :style="{'width': currStep < 7 ? ((currStep)*146 + 73)  + 'px' : ((currStep+1)*146)  + 'px'}" class="process-step"></div>
          <div class="step-list w-all flex jc-b">
            <div v-for="(item, index) in stepList" :key="index" class="flex-1 flex fd-c ai-c items">
              <span :class="{'active':item.select}" @click="setStep(item)" class="step-dian mt3 hand">{{item.step+1}}</span>
              <span class="mt10">{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 第一步 -->
      <div v-if="currStep==0" class="w-all bc-fff mt20 mb20 pl15 pr15 flex pt5">
        <div class="w-320 pr15">
          <div class="lh-35 h-35 ">1.1、专业选择 （最少需选择2个专业）</div>
          <div class="w-all flex h-30 ai-c jbbc">
            <span class="iconfont iconchaxun ml10"></span>
            <input class="bl-0 flex-1 bc-t ml10 h-all" v-model="sepcialtyTitle" placeholder="搜索专业" type="text">
          </div>

          <div class="flex jc-b ai-c mt10">
            <div class="flex">
              <div @click="changeSpecialtyType(item)" v-for="(item, index) in specialtyType" class="flex ai-c mr15 hand" :key="index">
                <span :class="{'iconxuanzhong jb-fc':item.select,'iconweixuanzhong fc-aaa':!item.select}" class="iconfont  fs-22  mr5"></span>
                <span>{{item.name}}</span>
              </div>
            </div>
            <div class="jb-fc fs-13">
              （请先选择本专科）
            </div>
          </div>

          <div ref="specialtyList" class="w-all h-400 auto mt10">
            <div @click="selectSpecialty(item,0)" :title="item.amount" v-for="(item, index) in specialtyList" :key="index" class="h-30 lh-30 rel pl10 mb2 hand">
              <div :style="{'width':(item.amount/specialtyMax*100+'%')}" :class="[item.select?'bc-e':item.color]" class="abs zi-100 al0 at0 ab0"></div>
              <span class="zi-120 rel fc-000">{{item.name}}({{item.mlevel=='本科'?'本':'专'}})</span>
            </div>
          </div>
          <div class="h-20"></div>

        </div>
        <div class="flex-1">
          <div class="lh-35 h-35 ">1.2、所选专业显示</div>
          <div style="height:474px" class="jbbc auto">
            <div class="w-all h-30 flex ai-c">
              <div class="w-78 centent">序号</div>
              <div class="flex-1 left">专业</div>
              <div class="w-52 centent">删除</div>
              <div class="w-78 centent">心仪专业</div>
            </div>
            <div v-if="specialtyList.filter(v=>{return v.select}).length">
              <div :class="[item.color]" v-for="(item, index) in specialtyList.filter(v=>{return v.select})" :key="index" class="w-all h-30 flex ai-c mb3">
                <div class="w-78 centent fc-000">{{index}}</div>
                <div class="flex-1 left fc-000">{{item.name}}({{item.mlevel=='本科'?'本':'专'}})</div>
                <div @click="item.select=false;item.isLove=false;" class="w-52 centent hand"><span class="iconfont fc-fff fs-22 iconshanchudelete30"></span></div>
                <div title="点我可设为心仪专业" @click="selectSpecialty(item,1)" class="w-78 centent hand"><span :class="[item.isLove?'fc-love':'fc-aaa']" class="iconfont  fs-18 iconxin-tianchong"></span></div>
              </div>
            </div>
            <div v-else class="flex ai-c jc-c h-400">
              <div class="flex fd-c jc-c ai-c">
                <i class="iconfont iconnotes fs-60 fc-ddd"></i>
                <span class="fs-15 fc-aaa mt10">请在左边选择您喜欢的专业</span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-360 pl15">
          <div class="lh-35 bc-fff h-35 ">1.3 心仪专业</div>
          <div style="height:474px" class="jbbc love-spe flex fd-c ai-c">
            <span class="ml40 mr40 mt70 fs-14 jb-fc">针对你的喜好，性格，偏好等条件选择你喜 欢的专业，如不明确自己的喜好，点击按钮 心理测试您喜欢和合适您的专业。</span>
            <div @click="href('http://interest.test.86edu.net/')" class="w-130 centent mt80 hand h-35 lh-35 jb-bc rel">去测试</div>
          </div>
        </div>
      </div>

      <!-- 第二步 -->
      <div v-if="currStep==1" class="w-all  mt20 mb20 ">
        <div class="lh-35 h-35 pl15 pt5 bc-fff w-all">2.1、你对学校的级别有什么特殊要求吗？（最少需要选2个）</div>
        <div class="w-all pl15 bc-fff mb20 pt10">
          <div @click="item.select=!item.select" v-for="(item, index) in schoolTypeList" :key="index" style="display:inline-flex" class="w-190 hand ai-c mb10">
            <span :class="{'iconxuanzhong jb-fc':item.select,'iconweixuanzhong':!item.select}" class="iconfont fs-22 "></span>
            <span class="ml10 fs-14">{{item.name}}</span>
          </div>
        </div>

        <div class="bc-fff flex pt15 pl15 pb15">
          <div class="flex-1 pb20 br-a">
            <div class="bc-fff w-all">2.2、请输入你想去的院校？</div>
            <div class="fs-12 fc-999">按照优先级选择您最想去的0-3所学校。</div>
            <div class="mt10 ra-5 flex jb-bc w-500 pt2 pp3">
              <el-autocomplete :trigger-on-focus="false" class="flex-1" prefix-icon="el-icon-search" size="small" v-model="schoolValue" :fetch-suggestions="querySearchSchool" placeholder="输入您想去院校" @select="setSchool"></el-autocomplete>
              <!-- <div class="w-80 flex ai-c jc-c ml5 jb-bc hand">查询</div> -->
            </div>
            <div class="hi-200 pt20 ">
              <div v-for="(item, index) in schoolList" :key="index" class="flex-line ai-c jbbc ra-28 jc-b pr5 mr20 mb20">
                <span class="h-28 w-28 ra-all centent lh-28 jb-bc">{{index+1}}</span>
                <span class="ml15 mr15">{{item.name}}</span>
                <span @click="clearLoveSchool(index,item)" class="iconfont iconshanchudelete30 hand mr2 fc-999"></span>
              </div>
            </div>
          </div>
          <div class="w-400 flex ai-c jc-c fd-c">
            <span>不知道院校排名？点击查看您心仪院校的排名。</span>
            <img @click="$router.push({name:'school'})" class="mt10 hand" src="../../assets/other/xinli.png" alt="">
          </div>
        </div>
      </div>

      <!-- 第三步 -->
      <div v-if="currStep==2" class="w-all  mt20 mb20 pb10">
        <div class="lh-35 h-35 pl15 pt5 bc-fff flex w-all">3.1、选择自己最想去的省市自治区?</div>
        <div class="h-15 bc-fff"></div>
        <div v-for="(item, index) in areaList" :key="index" class="w-all pl15 bc-fff ai-c flex pb16">
          <div class="w-80">{{item.area}}</div>
          <div class="flex-1 flex jc-s">
            <div :class="[v.select?'jb-bb':'']" @click="setArea(item,v,index,vi)" v-for="(v, vi) in item.areas" :key="vi" class="rel hand w-100 centent h-28 lh-28 b-c mr10 ">
              <span class="zi-140 fc-000 rel">{{v.area}}</span>
              <div :style="{'width':(v.amount/areaMax*100+'%')}" :class="[v.select?'jb-bc':'jbbc']" class="abs zi-110 at0 ab0 al0 w-80"></div>
            </div>
          </div>
        </div>

        <div class="w-all mt20 bc-fff pl15">
          <div class=" w-all pt10">3.2、请输入你想去的城市?</div>
          <div class="fs-12 fc-999 pt5">按照优先级选择您最想去的0-5个城市。</div>
          <div class="mt10 ra-5 flex jb-bc w-500 pp3">
            <el-autocomplete :trigger-on-focus="false" class="flex-1" prefix-icon="el-icon-search" size="small" v-model="areaValue" :fetch-suggestions="querySearchArea" placeholder="输入您心仪的城市" @select="setSelectArea"></el-autocomplete>
            <!-- <div class="w-80 flex ai-c jc-c ml5 jb-bc hand">查询</div> -->
          </div>
          <div class="hi-100 pt20 ">
            <div v-for="(item, index) in loveAreaList" :key="index" class="flex-line ai-c jbbc ra-28 jc-b pr5 mr20 mb20">
              <span class="h-28 w-28 ra-all centent lh-28 jb-bc">{{index+1}}</span>
              <span class="ml15 mr15">{{item.value}}</span>
              <span @click="loveAreaList.splice(index, 1)" class="iconfont iconshanchudelete30 hand mr2 fc-999"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- 第四步 -->
      <div v-if="currStep==3" class="w-all pl15 mt20 mb20 pb10 bc-fff">
        <div class=" w-all pt10">4.1、你对学费有要求吗?（单选）</div>
        <div class="pt30 pb30 flex">
          <div @click="fressList.forEach(v=>{v.select=false});item.select=true" v-for="(item, index) in fressList" :key="index" class="flex ai-c jc-s hand mr50">
            <span :class="{'iconxuanzhong jb-fc':item.select,'iconweixuanzhong':!item.select}" class="iconfont fs-22 "></span>
            <span class="ml10 fs-14">{{item.name}}</span>
          </div>
        </div>
      </div>

      <!-- 第五步 -->
      <div v-if="currStep==4" class="w-all mt20 mb20 pb10">
        <div class="lh-35 h-35 pl15 pt5 bc-fff flex w-all">5.1、是否想在大学期间就留学或者交流1年或以上？</div>
        <div class="h-15 bc-fff"></div>
        <div class="bc-fff pb20 flex pl15">
          <div @click="levelSchool.forEach(v=>{v.select=false});item.select=true;if(item.name=='没有'){countryList.forEach(v=>{v.select=false})}" v-for="(item, index) in levelSchool" :key="index" class="flex ai-c jc-s hand mr50">
            <span :class="{'iconxuanzhong jb-fc':item.select,'iconweixuanzhong':!item.select}" class="iconfont fs-22 "></span>
            <span class="ml10 fs-14">{{item.name}}</span>
          </div>
        </div>

        <div class="mt20 bc-fff pb1">
          <div class="lh-35 h-35 pl15 pt5 bc-fff w-all">5.2、在下列国家/地区中，选择你想去留学的国家/地区是？（不超过三个）</div>
          <div class="pl15 pt20  pr15">
            <div @click="setCounty(item)" :class="{'bc-cee':!item.select,'bc-county':item.select}" v-for="(item, index) in countryList" :key="index" class="flex-line ai-c jc-c fd-c mr30 hand bc-e mb30">
              <img :src="rPic(item.pic)" alt="">
              <span class="h-25 lh-25">{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 第六步 -->
      <div v-if="currStep==5" class="w-all mt20 mb20 pb10">
        <div class="lh-35 h-35 pl15 pt5 bc-fff flex w-all">6.1、你喜欢本硕连读吗</div>
        <div class="h-15 bc-fff"></div>
        <div class="bc-fff pb20 flex pl15">
          <div @click="yearType.forEach(v=>{v.select=false});item.select=true;" v-for="(item, index) in yearType" :key="index" class="flex ai-c jc-s hand mr50">
            <span :class="{'iconxuanzhong jb-fc':item.select,'iconweixuanzhong':!item.select}" class="iconfont fs-22 "></span>
            <span class="ml10 fs-14">{{item.name}}</span>
          </div>
        </div>
      </div>

      <!-- 第七步 -->
      <div v-if="currStep==6" class="w-all pl15 mt20 mb20 pb20 bc-fff">
        <div class=" w-all pt10">7.1、志愿-院校冲稳保方案选择</div>
        <div v-for="(item, index) in rateList" :key="index" class="flex mt20">
          <span class="w-30 h-28 fw-7 fs-18">{{item.name}}</span>
          <div class="flex-1 flex fd-c">
            <div @click="setRank(item,index)" class="rel w-500 hand h-30">
              <input :id="'rank'+index" @blur="checkRank(item,index)" :class="{'bc-c bl-0':!item.select,'b-c bc-f':item.select}" v-model="item.value" class="h-30 pl10  w-500  zi-100 rel" type="text">
              <div v-if="!item.select" :style="{'width':(item.value/100*100+'%'),'background-color':item.color}" class="abs fc-fff at0 ab0 lh-30 pl15 al0 zi-130">{{item.value}}%</div>
            </div>
            <div class="jb-fc mt5">{{item.about}}</div>
          </div>
        </div>
      </div>

      <div v-if="currStep!=7" class="flex ai-c jc-c">
        <div v-if="![0,7].includes(currStep)" @click="toNext('prev')" class="rhbutton mr50">上一步</div>
        <div v-if="currStep<(stepList.length-2)" @click="toNext('next')" class="rhbutton">下一步</div>
        <div v-if="(currStep+1)==(stepList.length-1)" @click="toNext('next',1)" class="rhbutton ml50">查看详细报告</div>
      </div>

      <div class="h-20"></div>

    </div>

    <div v-if="currStep==7" class="w-all bc-fff">
      <div class="w-all flex ai-c fs-12 pl15 pr15 pt10 pb10 bc-e4e7ed">
        <div class="pr15 br-a">筛选条件</div>
        <div class="flex-1 lh-20 pl15">
          <div class="flex-line mr10">成绩：<span class="fc-a">{{userinfo.examType == 2 ? userinfo.artFinalScore : userinfo.score }}</span></div>
          <div class="flex-line mr10">位次：<span class="fc-a">{{userinfo.examType == 2 ? userinfo.artRank : userinfo.rank}}</span></div>
          <div class="flex-line mr10">考生科类：<span class="fc-a">{{userinfo.examType == 2?'艺体类型' :'普通考生'}}</span></div>
          <div v-if="userinfo.examType == 2" class="flex-line mr10">专业科类：<span class="fc-a">{{userinfo.artSubject}}</span></div>
          <div class="flex-line mr10">专业：<span class="fc-a">{{querytext.category}}</span><span class="fc-a" v-if="querytext.loveCategory">(最心仪：{{querytext.loveCategory}})</span></div>
          <div class="flex-line mr10">院校：<span class="fc-a">{{querytext.property}}</span><span class="fc-a" v-if="querytext.loveSchool">(最想去的大学：{{querytext.loveSchool}})</span></div>
          <div class="flex-line mr10">省份/城市：<span class="fc-a">{{querytext.area}}</span><span class="fc-a" v-if="querytext.loveCity">(最想去：{{querytext.loveCity}})</span></div>
          <div class="flex-line mr10">学费：<span class="fc-a">{{querytext.feeType}}</span></div>
          <div class="flex-line mr10">本硕连读：<span class="fc-a">{{querytext.yearType}}</span></div>
          <div v-if="querytext.countr" class="flex-line mr10">出国学习：<span class="fc-a">{{querytext.country}}</span></div>
          <div class="flex-line mr10">冲稳保：<span class="fc-a">{{querytext.rates}}</span></div>
        </div>
        <div v-if="resultCount > 50 || isContinue">
          <div @click="downloadResultData(1)" v-if="userinfo.isSelfReportPay || userinfo.isReportPay" class="flex-line hand jb-bc ra-5 h-26 lh-26 pl10 pr10 mr10">志愿报告下载</div>
          <div @click="downloadResultData(2)" v-if="userinfo.isSelfReportPay || userinfo.isReportPay" class="flex-line hand jb-bc ra-5 h-26 lh-26 pl10 pr10">志愿详情下载</div>
        </div>
      </div>

      <div class="h-28 lh-28 flex jb-bc">
        <span class="ml15">结果条数：{{resultCount}}条</span>
        <span class="ml30">筛选剩余条数：{{resultFilterCount}}条</span>
        <span class="ml30"><i class="iconfont iconfeiji"></i> 表示出国优选专业</span>
      </div>

      <table v-if="resultCount >= 50 || isContinue" class="w-all tabel-repot fs-12">
        <thead>
          <tr>
            <td class="wi-70 centent">院校代码</td>
            <td class="left wi-70">院校名称</td>
            <td class="centent wi-70">专业代码</td>
            <td colspan="2" class="left wi-70">专业名称</td>
            <!-- <td class="left w-40"></td> -->
            <td class="centent wi-70">操作</td>
            <td class="left wi-70">院校属性</td>
            <!-- <td class="w7">院校类型</td> -->
            <td class="left wi-70">专业类型</td>
            <td class="centent">选考科目范围</td>
            <!-- <td class="w8">主管部门</td> -->
            <td class="centent">学制/学费({{year.curryear}})</td>
            <td class="centent">{{year.prevone}}年招生计划</td>
            <td class="centent">{{year.prevone}}录取成绩/位次</td>
            <td class="centent">{{year.prevtwo}}录取成绩/位次</td>
            <td class="centent">预计最大可填报数</td>
            <td class="centent wi-70">所在地区</td>
            <td class="centent wi-70">院校详情</td>
          </tr>
        </thead>
        <tbody v-for="(item, index) in list" v-if="!item.delete" :key="index">
          <tr>
            <!-- 院校代码 -->
            <td class="wi-70 centent">{{item.incode}}</td>
            <!-- 院校名称 -->
            <td class="left wi-70"><span v-if="item.withCountry==1" class="iconfont iconfeiji"></span>{{item.school}}</td>
            <!-- 专业代码 -->
            <td class="centent wi-70">{{item.mcode}}</td>
            <!-- '冲','稳','保' -->
            <td>
              <div class="rel ml5 mr5">
                <span :style="{'color':['#fb2624','#fed604','#8bb446'][[101,102,103].indexOf(parseInt(item.policy))]}" class="iconfont iconbookmark2 fs-25"></span>
                <div class="abs fc-fff at1 al7 c-fff">
                  {{['冲','稳','保'][[101,102,103].indexOf(parseInt(item.policy))]}}
                </div>
              </div>
            </td>
            <!-- 专业名称 -->
            <td class="left wi-70">
              <span>{{item.major}}</span>
              <span>{{item.mlevel=='本科'?'(本)':'(专)'}}</span>
              <span v-if="item.istop==1" style="background:#94d3cd">双一流</span>
            </td>
            <!-- 操作 -->
            <td class="left wi-70">
              <div class="flex-line ">
                <span @click="deleteThisResult(item,index)" class="iconfont hover-report fs-12 hand icon0902shanchu"></span>
                <span v-if="index!=(list.length-1)" @click="setConversion(index,'down')" class="iconfont fs-18 ra-3 jb-bc ml3 hand iconjiantouxiajiang"></span>
                <span @click="setConversion(index,'up')" v-if="index!=0" class="iconfont fs-18 ra-3 jb-bc ml3 hand iconjiantoushangsheng"></span>
              </div>
            </td>
            <!-- 院校属性 -->
            <td class="center wi-70">
              <span class="ra-3 inline-block mb4 mr3 nowrap pt2 pb2 pl5 pr5 fc-fff" :style="{'background-color':v.c}" v-for="(v, index) in item.color" :key="index">{{v.name}}</span>
            </td>
            <!-- <td class="w7">院校类型</td> -->
            <td class="centent wi-70">{{item.category}}</td>
            <td class="centent">{{toChinese(item.subject)}}</td>
            <!-- <td class="w8">主管部门</td> -->
            <td class="centent">{{item.year}}/{{item.fee}}</td>
            <td class="centent">{{ item.amount }}</td>
            <td class="centent">{{ (item.lowscore2018 ==0 || item.lowscore2018 == '/' ? '-' : item.lowscore2018) + ' / ' + (item.lowrank2018 == 0 || item.lowrank2018 == '/' ? '-' : item.lowrank2018)}}</td>
            <td class="centent">{{ (item.lowscore2017 == 0 || item.lowscore2017 == '/' ?'-' : item.lowscore2017) + ' / ' + (item.lowrank2017 == 0 || item.lowrank2017 == '/' ? '-' : item.lowrank2017)}}</td>
            <td class="centent">{{ item.sumplan == 0 ? '-' : item.sumplan }}</td>
            <!-- 所在地区 -->
            <td class="centent wi-70">
              {{['北京','上海','重庆','天津'].includes(item.province)?item.province:(item.province+item.city)}}
            </td>
            <!-- 院校详情 -->
            <td class="centent wi-70">
              <span @click="href(item.site)" style="background:#e46271;" class="iconfont pt2 pb2 pl4 pr4 hand ra-4 fc-fff icongantanhao"></span>
            </td>
          </tr>
          <tr v-if="item.remark">
            <td colspan="16"><span class="ml20">简注：{{item.remark}}</span></td>
          </tr>
        </tbody>
        <tbody class="delete" v-for="(item, index) in list" v-if="item.delete" :key="index">
          <tr>
            <!-- 院校代码 -->
            <td class="wi-70 centent">{{item.incode}}</td>
            <!-- 院校名称 -->
            <td class="left wi-70"><span v-if="item.withCountry==1" class="iconfont iconfeiji"></span>{{item.school}}</td>
            <!-- 专业代码 -->
            <td class="centent wi-70">{{item.mcode}}</td>
            <!-- '冲','稳','保' -->
            <td>
              <div class="rel ml5 mr5">
                <span :style="{'color':['#fb2624','#fed604','#8bb446'][[101,102,103].indexOf(parseInt(item.policy))]}" class="iconfont iconbookmark2 fs-25"></span>
                <div class="abs fc-fff at1 al7 c-fff">
                  {{['冲','稳','保'][[101,102,103].indexOf(parseInt(item.policy))]}}
                </div>
              </div>
            </td>
            <!-- 专业名称 -->
            <td class="left wi-70">
              <span>{{item.major}}</span>
              <span>{{item.mlevel=='本科'?'(本)':'(专)'}}</span>
              <span v-if="item.istop==1" style="background:#94d3cd">双一流</span>
            </td>
            <!-- 操作 -->
            <td class="left wi-70">
              <div class="flex-line ">
                <span @click="deleteThisResult(item,index)" class="iconfont hover-report fs-12 hand icon0902shanchu"></span>
                <span v-if="index!=(list.length-1)" @click="setConversion(index,'down')" class="iconfont fs-18 ra-3 jb-bc ml3 hand iconjiantouxiajiang"></span>
                <span @click="setConversion(index,'up')" v-if="index!=0" class="iconfont fs-18 ra-3 jb-bc ml3 hand iconjiantoushangsheng"></span>
              </div>
            </td>
            <!-- 院校属性 -->
            <td class="left wi-70">
              <div class="flex-line">
                <span class="ra-3 mr3 nowrap pt2 pb2 pl5 pr5 fc-fff" :style="{'background-color':v.c}" v-for="(v, index) in item.color" :key="index">{{v.name}}</span>
              </div>
            </td>
            <!-- <td class="w7">院校类型</td> -->
            <td class="centent wi-70">{{item.category}}</td>
            <td class="centent">{{toChinese(item.subject)}}</td>
            <!-- <td class="w8">主管部门</td> -->
            <td class="centent">{{item.year}}/{{item.fee}}</td>
            <td class="centent">{{ item.amount }}</td>
            <td class="centent">{{ (item.lowscore2018 ==0 || item.lowscore2018 == '/' ? '-' : item.lowscore2018) + ' / ' + (item.lowrank2018 == 0 || item.lowrank2018 == '/' ? '-' : item.lowrank2018)}}</td>
            <td class="centent">{{ (item.lowscore2017 == 0 || item.lowscore2017 == '/' ?'-' : item.lowscore2017) + ' / ' + (item.lowrank2017 == 0 || item.lowrank2017 == '/' ? '-' : item.lowrank2017)}}</td>
            <td class="centent">{{ item.sumplan == 0 ? '-' : item.sumplan }}</td>
            <!-- 所在地区 -->
            <td class="centent wi-70">
              {{['北京','上海','重庆','天津'].includes(item.province)?item.province:(item.province+item.city)}}
            </td>
            <!-- 院校详情 -->
            <td class="centent wi-70">
              <span @click="href(item.site)" style="background:#e46271;" class="iconfont pt2 pb2 pl4 pr4 hand ra-4 fc-fff icongantanhao"></span>
            </td>
          </tr>
          <tr v-if="item.remark">
            <td colspan="16"><span class="ml20">简注：{{item.remark}}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="(!resultCount || resultCount==0) && currStep==7" class="flex h-350 ai-c jc-c">
      <div class="fs-16">
        你的筛选条件过于严格，为了保证志愿填写质量，请返回修改您的要求
      </div>
      <!-- <div class="fs-16" v-if="resultCount > 100">
        你的筛选条件过于宽泛，你可以返回修改你的要求
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['userinfo'])
  },
  data() {
    return {
      currStep: 0,
      list: [],
      deleteList: [],
      sepcialtyTitle: '',
      resultCount: 0,
      resultFilterCount: 0,
      isChange: false,//当前条件是否改变
      schoolValue: '',
      areaValue: '',
      isContinue: false,
      stepList: [
        { name: '专业选择', check: 'category', select: true, step: 0 }, { name: '院校选择', check: 'property', select: false, step: 1 },
        { name: '地区选择', check: 'area', select: false, step: 2 }, { name: '学费/家庭环境', check: 'feeType', select: false, step: 3 },
        { name: '留学交换/中外合作', check: 'abroad', select: false, step: 4 }, { name: '本硕连读', check: 'yearType', select: false, step: 5 },
        { name: '志愿-院校冲稳保方案', check: 'rates', select: false, step: 6 }, { name: '详细报告', check: 'no', select: false, step: 7 }
      ],
      query: {
        category: '',//专业
        loveCategory: '',// 心爱的专业
        property: '',// 院校级别
        loveSchool: '',// 喜欢的学校
        area: '',// 地区
        loveCity: '',// 喜欢的学校
        feeType: '',//  学费
        abroad: '',// 是否出国留学交换/中外合作
        country: '',//  留学国家
        yearType: '',// 本硕连读
        rates: '',// 冲稳保比例
      },
      querytext: {
        category: '',//专业
        loveCategory: '',// 心爱的专业
        property: '',// 院校级别
        loveSchool: '',// 喜欢的学校
        area: '',// 地区
        loveCity: '',// 喜欢的学校
        feeType: '',//  学费
        abroad: '',// 是否出国留学交换/中外合作
        country: '',//  留学国家
        yearType: '',// 本硕连读
        rates: '',// 冲稳保比例
      },
      schoolTypeList: [
        { select: false, name: '双一流大学A' }, { select: false, name: '双一流大学B' },
        { select: false, name: '985院校' }, { select: false, name: '211院校' },
        { select: false, name: '双一流学科建设大学' }, { select: false, name: '公办本科' },
        { select: false, name: '中外合办院校' }, { select: false, name: '独立学院' },
        { select: false, name: '民办本科' }, { select: false, name: '公办高职高专' }, { select: false, name: '民办高职高专' }
      ],
      specialtyType: [{ name: '本科', select: true, value: '本科' }, { name: '专科', select: true, value: '高职' }],
      fressList: [{ name: '对学费毫不关心', select: false, value: 1 }, { name: '同等院校专业优先考虑学费', select: true, value: 2 }, { name: '坚决不去学费超25000专业, 根据选择屏蔽掉学费超25000的志愿', select: false, value: 3 }],
      specialtyList: [],
      specialtyBaseList: [],
      specialtyMax: 0,
      schoolList: [],
      areaList: [],
      areaMax: 0,
      loveAreaList: [],
      levelSchool: [{ name: '有', select: false, value: 1 }, { name: '没有', select: true, value: 2 }],
      yearType: [{ name: '喜欢', select: false, value: '喜欢' }, { name: '一般', select: true, value: '一般' }],
      countryList: [
        { name: '爱尔兰', pic: 'aierlan', select: false }, { name: '奥地利', pic: 'aodili', select: false },
        { name: '澳大利亚', pic: 'aodaliya', select: false }, { name: '白俄罗斯', pic: 'baieluosi', select: false },
        { name: '丹麦', pic: 'danmai', select: false }, { name: '德国', pic: 'deguo', select: false },
        { name: '俄罗斯', pic: 'eluosi', select: false }, { name: '法国', pic: 'faguo', select: false },
        { name: '芬兰', pic: 'fenlan', select: false }, { name: '韩国', pic: 'hanguo', select: false },
        { name: '荷兰', pic: 'helan', select: false }, { name: '加拿大', pic: 'jianada', select: false },
        { name: '捷克', pic: 'jieke', select: false }, { name: '马来西亚', pic: 'malaxiya', select: false },
        { name: '美国', pic: 'usa', select: false }, { name: '日本', pic: 'riben', select: false },
        { name: '瑞典', pic: 'ruidian', select: false }, { name: '瑞士', pic: 'ruishi', select: false },
        { name: '乌克兰', pic: 'wukelan', select: false }, { name: '西班牙', pic: 'xibanya', select: false },
        { name: '新加坡', pic: 'xinjiapo', select: false }, { name: '新西兰', pic: 'xinxilan', select: false },
        { name: '意大利', pic: 'yidali', select: false }, { name: '英国', pic: 'yingguo', select: false },
        { name: '中国台湾', pic: 'taiwan', select: false }, { name: '中国香港', pic: 'xianggang', select: false }
      ],
      rateList: [
        { name: '冲', old: 20, max: 40, min: 10, select: false, about: '冲：历年该专业在浙最低录取位次不低于你的位次。', value: 20, color: '#FB2624' },
        { name: '稳', old: 30, max: 60, min: 30, select: false, about: '稳：历年该专业在浙最低录取位次不高于或接近于你的位次。', value: 30, color: '#FED604' },
        { name: '保', old: 50, max: 50, min: 30, select: false, about: '保：根据该专业历年在浙录取情况你的成绩能比较稳的被录取。要求不少于30%。', value: 50, color: '#8BB446' },
      ]
    }
  },
  methods: {
    ...mapActions(
      [
        'getSurveyCategory',
        'getSurveySchool',
        'getSchoolLevelValid',
        'getSchoolCategoryValid',
        'getAreaSchool',
        'getSurveySchoolCitys',
        'getSurveyCitys',
        'getSurveyResultNew',
        'getCommonreportDownload',
        'getReportDownload'
      ]),
    setArea(item, v, index) {
      if (this.loveAreaList.some(val => { return v.area.includes(val.province) })) {
        this.$message.error('当前省份/自治区/直辖市有你想去的城市，无法取消');
        return;
      }
      v.select = !v.select;
      this.$set(this.areaList, index, item);
    },
    clearLoveSchool(index, item) {
      this.schoolList.splice(index, 1);
      //当第二步未下一步时，删除当前院校，喜欢的地区也删除
      if (!this.query.property) {
        this.loveAreaList.forEach((v, i) => {
          if (item.city == v.value) {
            this.loveAreaList.splice(i, 1)
          }
        });

        this.areaList.forEach(val => {
          val.areas.forEach(v => {
            if (v.area.includes(item.province)) {
              v.select = false;
            }
          })
        })
      }
    },
    //列表换位
    setConversion(index, type) {
      let _tr, _prevTr, _nextTr
      switch (type) {
        case "up":
          _tr = this.list[index]
          _prevTr = this.list[index - 1]
          this.$set(this.list, index, _prevTr)
          this.$set(this.list, index - 1, _tr)
          break;
        case "down":
          _tr = this.list[index]
          _nextTr = this.list[index + 1]
          this.$set(this.list, index + 1, _tr)
          this.$set(this.list, index, _nextTr)
          break;
      }
    },
    // 当前行上移下移
    downloadResultData(type) {
      let downRes = (data) => {
        let aps = type == 1 ? this.getCommonreportDownload({ result: JSON.stringify(data) }) : this.getReportDownload({ result: JSON.stringify(data) });
        aps.then(res => {
          this.href(res.data.value,true);
        })
      }
      if (this.list.filter(v => { return !v.delete }).length > 85) {
        this.$confirm('剩余结果条数大于85条，是否继续下载?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          confirmButtonClass: 'pub-confirm',
          showClose: false,
          customClass:'confirmBtn',
          type: 'warning'
        }).then(res => {
          downRes(this.list.filter(v => { return !v.delete }));
        })
      } else {
        downRes(this.list.filter(v => { return !v.delete }));
      }
    },
    // 删除当前行
    deleteThisResult(item, index) {
      item.delete = !item.delete;
    },
    setColor(property, topProperty) {
      let [color, rt, benke, bk, zk] = [[], property.split(','), false, false, false];
      switch (topProperty) {
        case "1":
          benke = true; bk = true;
          color.push({ name: '双一流A', c: '#94d3cd' });
          break;
        case "2":
          benke = true; bk = true;
          color.push({ name: '双一流B', c: '#94d3cd' });
          break;
        case "3":
          benke = true; bk = true;
          color.push({ name: '双一流学科学校', c: '#94d3cd' });
          break;
      }
      rt.forEach((v, index) => {
        if (v == 1) {
          switch (index) {
            case 0:
              benke = true; bk = true;
              // color.push({ name: '双一流', c: '#94d3cd' });
              break;
            case 1:
              benke = true; bk = true;
              color.push({ name: '985', c: '#f6846c' });
              break;
            case 2:
              benke = true; bk = true;
              color.push({ name: '211', c: '#fb989d' });
              break;
            case 3:
              if (!benke) {
                bk = true;
                color.push({ name: '本科', c: '#bbdcc9' });
              }
              break;
            case 4:
              color.push({ name: '独立', c: '#3ea5ce' });
              break;
            case 5:
              color.push({ name: '民办', c: '#d7ac4d' });
              break;
            case 6:
              // 20180326更新：暂时不显示
              // color.push({ name: '中外', c: '#6d8285' });
              break;
            case 7:
              if (!bk) {
                zk = true;
                color.push({ name: '专科', c: '#8f81be' });
              }
              break;
            case 8:
              if (!zk) {
                color.push({ name: '公办', c: '#bbdcc9' });
              }
              break;
          }
        }
      })
      return color;
    },
    setRank(item, index) {
      item.select = true;
      setTimeout(() => { document.getElementById('rank' + index).focus(); }, 200);
    },
    toChinese(arr) {
      let array = arr && arr.split(",") || new Array(7).fill(0);
      let sub = ["化学", "历史", "地理", "政治", "技术", "物理", "生物"], selSub = [];
      for (let i = 0; i < array.length; i++) {
        if (array[i] == 1) {
          selSub.push(sub[i])
        }
      }
      if (selSub.length == 7 || selSub.length == 0) {
        return '不限'
      } else {
        return selSub.join(',')
      }
    },
    checkRank(item, index) {
      if (parseInt(item.value) < item.min) {
        item.value = item.min;
        this.$message.error(item.name + "比例不能低于" + item.min + "%");
      }
      if (parseInt(item.value) > item.max) {
        item.value = item.max;
        this.$message.error(item.name + "比例不能高于" + item.max + "%");
      }
      if (this.rateList.reduce((count, v) => { return count + parseInt(v.value) }, 0) != 100) {
        this.$message.error("请调整你的冲稳保比例，冲稳保三个比例系数加起来必须为100%");
      }
      item.select = false;
    },
    setCounty(item) {
      if (this.levelSchool.find(v => { return v.select }).name == "没有") {
        this.$message.error('步骤5.1中选是想要留学的，才可以选择想要留学的国家');
        return;
      }
      if (this.countryList.filter(v => { return v.select }).length > 2 && !item.select) {
        this.$message.error('您想去留学的国家/地区最多只能选择3个');
        return;
      }
      item.select = !item.select;
    },
    rPic(pic) {
      return require('../../assets/country/' + pic + '.jpg');
    },
    getResult() {
      if (!this.isChange) { return false; }
      let load = this.$loading(this.$store.state.loadObj);
      this.getSurveyResultNew(this.query).then(res => {
        load.close();
        this.isChange = false;
        if (res.code == 20000) {
          this.resultCount = res.data.size
          this.resultFilterCount = res.data.size
          res.data.array.forEach(v => {
            v.delete = false;
            v.color = this.setColor(v.property, v.topProperty);
          })
          this.list = res.data.array;
          let resultTip = "";
          if (this.resultCount < 50) {
            resultTip = "你的筛选条件过于严格，为了保证志愿填写质量，请返回修改您的要求"
          } else if (this.resultCount < 120) {
            resultTip = "你的筛选条件过于宽泛，你可以返回修改你的要求"
          } else if (this.resultCount > 120) {
            resultTip = "你的筛选条件过于宽泛，你可以返回修改你的要求"
          }
          if (resultTip) {
            this.$confirm(resultTip, '', {
              confirmButtonText: '重新查询',
              cancelButtonText: '继续查看',
              closeOnClickModal: false,
              confirmButtonClass: 'pub-confirm',
              showClose: false,
              type: 'warning',
              customClass:'confirmBtn'
            }).then(() => {
              this.currStep = 0;
            }).catch(() => {
              this.isContinue = true;
            });
          }
        }
      }).catch(res => {
        load.close();
      })
    },
    //步骤园点，点击事件
    setStep(item) {
      let isNext = false;
      if (this.currStep < item.step) {
        for (let i = this.currStep; i < item.step; i++) {
          if (!this.query[this.stepList[i].check]) {
            isNext = true;
            break;
          }
        }
        if (isNext) {
          this.$message.error('请先完成前面的步骤');
          return;
        }
      }
      if (this.currStep < item.step) {
        this.toNext('next', this.currStep, item.step)
      }
      this.currStep = item.step;
      this.stepList.forEach(v => {
        if (v.step <= item.step) {
          v.select = true;
        } else {
          v.select = false;
        }
      });
    },
    toNext(type, index, kep) {
      if (type == 'next') {
        if (this.currStep < this.schoolTypeList.length) {
          // 第一步
          if (this.currStep == 0) {
            if (this.specialtyList.filter(v => { return v.select }).length >= 2) {
              let setp1 = this.specialtyList.filter(v => { return v.select }).map(v => { return `${v.code},${v.name},${v.mlevel}` }).join('|');
              if (this.query.category != setp1) {
                this.isChange = true;
              }
              this.query.category = setp1;
              this.querytext.category = this.specialtyList.filter(v => { return v.select }).map(v => { return v.name }).join('、');
            } else {
              this.$message.error("请至少选择两个以上的专业用于专业推荐");
              return;
            }
            let loveCategory = this.specialtyList.find(v => { return v.isLove })
            if (loveCategory) {
              if (this.query.loveCategory != `${loveCategory.code},${loveCategory.name}`) {
                this.isChange = true;
                this.query.loveCategory = `${loveCategory.code},${loveCategory.name}`;
                this.querytext.loveCategory = loveCategory.name;
              }
            }
            // 第二步
          } else if (this.currStep == 1) {
            if (this.schoolTypeList.filter(v => { return v.select }).length < 2) {
              this.$message.error("请至少选择两个院校类型");
              return;
            } else {
              let step2 = this.schoolTypeList.map(v => { return v.select ? 1 : 0 }).toString();
              if (this.query.property != step2) {
                this.isChange = true;
              }
              this.query.property = step2;
              this.querytext.property = this.schoolTypeList.filter(v => { return v.select }).map(v => { return v.name }).join('、');
            }
            if (this.schoolList.length > 0) {
              if (this.querytext.loveSchool != this.schoolList.map(v => { return v.name }).join('、')) {
                this.isChange = true;
              }
              this.query.loveSchool = this.schoolList.map(v => { return `${v.incode},${v.name}` }).join('|');
              this.querytext.loveSchool = this.schoolList.map(v => { return v.name }).join('、');
            }
            // 第三步
          } else if (this.currStep == 2) {
            let [cout, sel] = [0, []];
            this.areaList.forEach(item => { item.areas.forEach(v => { if (v.select) { cout++; sel.push(v.area) } }) })
            if (cout < 3) {
              this.$message.error("请至少选择三个以上的省份区域");
              return;
            } else {
              if (this.query.area != sel.toString()) {
                this.isChange = true;
              }
              this.query.area = sel.toString();
              this.querytext.area = sel.join('、');
            }
            if (this.loveAreaList.length > 0) {
              if (this.query.loveCity != this.loveAreaList.map(v => { return v.city }).toString()) {
                this.isChange = true;
              }
              this.query.loveCity = this.loveAreaList.map(v => { return v.city }).toString();
              this.querytext.loveCity = this.loveAreaList.map(v => { return v.city }).join('、');
            }
            // 第四步
          } else if (this.currStep == 3) {
            if (this.query.feeType != this.fressList.find(v => { return v.select }).value) {
              this.isChange = true;
            }
            this.query.feeType = this.fressList.find(v => { return v.select }).value;
            this.querytext.feeType = this.fressList.find(v => { return v.select }).name;
            // 第五步
          } else if (this.currStep == 4) {
            if (this.query.abroad != this.levelSchool.find(v => { return v.select }).value) {
              this.isChange = true;
            }
            this.query.abroad = this.levelSchool.find(v => { return v.select }).value;
            this.querytext.abroad = this.levelSchool.find(v => { return v.select }).name;
            if (this.countryList.filter(v => { return v.select }).length > 0) {
              let step2 = this.countryList.filter(v => { return v.select }).map(v => { return v.name }).toString();
              if (this.query.country != step2) {
                this.isChange = true;
              }
              this.query.country = step2;
              this.querytext.country = this.countryList.filter(v => { return v.select }).map(v => { return v.name }).join('、');
            }
            // 第六步
          } else if (this.currStep == 5) {
            if (this.query.yearType != this.yearType.find(v => { return v.select }).value) {
              this.isChange = true;
            }
            this.query.yearType = this.yearType.find(v => { return v.select }).value;
            this.querytext.yearType = this.yearType.find(v => { return v.select }).name;
            // 第七步
          } else if (this.currStep == 6) {
            if (this.rateList.reduce((count, v) => { return count + parseInt(v.value) }, 0) != 100) {
              this.$message.error("请调整你的冲稳保比例，冲稳保三个比例系数加起来必须为100%");
              return;
            }
            if (this.query.rates != this.rateList.map(v => { return v.value }).toString()) {
              this.isChange = true;
            }
            this.query.rates = this.rateList.map(v => { return v.value }).toString();
            this.querytext.rates = this.rateList.map(v => { return v.name + v.value + '%' }).join('、');
          }
          console.log('query', this.query)
          if (!kep) {
            this.currStep++;
          } else {
            this.currStep = kep;
          }
          this.stepList[this.currStep].select = true;
          if (index == 1 || kep == 7) {
            this.getResult();
          }
        }
      } else if (type == 'prev') {
        if (this.currStep <= 0) {
          this.currStep = 0;
        } else {
          this.stepList[this.currStep].select = false;
          this.currStep--;
        }
      }
    },
    querySearchSchool(v, cb) {
      if (v) {
        this.getSurveySchool({ name: v }).then(res => {
          if (res.code == 20000) {
            res.data.array.forEach(v => {
              v.value = v.name;
            })
            cb(res.data.array);
          }
        })
      }
    },
    querySearchArea(v, cb) {
      if (v) {
        this.getSurveyCitys({ name: v }).then(res => {
          if (res.code == 20000) {
            res.data.array.forEach(v => {
              v.value = v.city;
            })
            cb(res.data.array);
          }
        })
      }
    },
    //地区选择
    setSelectArea(item) {
      if (this.loveAreaList.length > 5) {
        this.$message.error("您最多只能选择5所想去的院校")
        return;
      }
      !this.loveAreaList.some(v => { return v.city == item.city }) && this.loveAreaList.push(item);
      this.areaValue = '';
      this.areaList.forEach(val => {
        val.areas.forEach(v => {
          if (v.area.includes(item.province)) {
            v.select = true;
          }
        })
      })
    },
    //想去的院校
    setSchool(item) {
      this.getSurveySchoolCitys({ incodes: item.incode }).then(res => {
        this.areaList.forEach(item => {
          item.areas.forEach(v => {
            if (v.area.includes(res.data.array[0].province)) {
              v.select = true;
            }
          })
        });
        //为选中的学校加上省，市 ，用做删除 clearLoveSchool方法中用到
        if (!this.loveAreaList.some(v => { return v.value == res.data.array[0].city })) {
          this.loveAreaList.push({ ...res.data.array[0], value: res.data.array[0].city });
          let fsch = this.schoolList.find(v => { return v.incode == item.incode });
          if (fsch) {
            fsch.city = res.data.array[0].city;
            fsch.province=res.data.array[0].province;
          }
        }
      });
      if (this.schoolList.length > 3) {
        this.$message.error("您最多只能选择3所想去的院校")
        return;
      }
      !this.schoolList.some(v => { return v.name == item.name }) && this.schoolList.push(item);
      let stl = this.schoolTypeList.map(v => { return v.select ? 1 : 0 });
      let prom = this.query.loveCategory ?
        [
          this.getSchoolLevelValid({ incode: item.incode, property: stl.toString() }),
          this.getSchoolCategoryValid({ incode: item.incode, ccode: this.query.loveCategory.split(",")[0] })
        ] :
        [
          this.getSchoolLevelValid({ incode: item.incode, property: stl.toString() })
        ]
      Promise.all(prom).then(res => {
        let [res1, res2] = res;
        if (res1.message != '请求成功') {
          this.$confirm('当前未被选中该喜欢的院校的类型，是否自动选中?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass:'confirmBtn',
            type: 'warning'
          }).then(com => {
            let dt = res1.dt.split('|');
            if (dt[1]) {
              dt[1].split(',').forEach(val => {
                switch (val) {
                  case "1":
                    this.schoolTypeList[0].select = true;
                    break
                  case "2":
                    this.schoolTypeList[1].select = true;
                    break
                  case "3":
                    this.schoolTypeList[4].select = true;
                    break
                }
              })
            }
            dt[0].split(',').forEach((val, index) => {
              if (val == '1') {
                if (index == 1) {
                  this.schoolTypeList[2].select = true;
                }
                if (index == 2) {
                  this.schoolTypeList[3].select = true;
                }
                if (index == 3) {
                  this.schoolTypeList[5].select = true;
                }
                if (index == 4) {
                  this.schoolTypeList[7].select = true;
                }
                if (index == 5) {
                  this.schoolTypeList[8].select = true;
                }
                if (index == 6) {
                  this.schoolTypeList[6].select = true;
                }
              }
            })
            if (dt[0].split(',')[7] == 1 && dt[0].split(',')[8] == 1) {
              this.schoolTypeList[9].select = true
            } else if (dt[0].split(',')[7] == 1) {
              this.schoolTypeList[10].select = true
            }

          })
        }
        setTimeout(() => {
          if (res2 && res2.message != '请求成功') {
            this.$confirm(res2.message + '?', '提示', {
              confirmButtonText: '继续',
              cancelButtonText: '取消',
              customClass:'confirmBtn',
              type: 'warning'
            })
          }
        }, 200);
      });
      this.schoolValue = '';
    },

    //专业点击
    changeSpecialtyType(item) {
      if (this.specialtyType.filter(v => { return v.select }).length > 1) {
        item.select = !item.select;
        this.specialtyList = this.specialtyBaseList.filter(v => { return v.mlevel != item.value });
      } else {
        this.specialtyType.forEach(v => { v.select = true });
        this.specialtyList = this.specialtyBaseList;
      }
    },
    // 点我可设为心仪专 // 与选中专业
    selectSpecialty(item, type) {
      if (type == 0) {
        item.select = !item.select;
      }
      if (type == 1) {
        let mod = this.specialtyList.find(v => { return v.isLove });
        if (mod) {
          mod.isLove = false;
        }
        item.isLove = true;
      }

    }
  },
  created() {
    this.$store.state.loadObj.target = this.$refs.specialtyList;
    this.loader = this.$loading(this.$store.state.loadObj);
    this.getSurveyCategory().then(res => {
      this.loader.close();
      if (res.code == 20000) {
        this.specialtyList = res.data.array.map(v => { v.isLove = false; v.color = v.mlevel == '本科' ? 'bc-b' : 'bc-spec'; v.select = false; return v; });
        this.specialtyBaseList = this.specialtyList;
        this.specialtyMax = res.data.array[0].amount;
      }
    });
    this.getAreaSchool().then(res => {
      this.areaList = res.data.array;
      this.areaList.forEach(item => {
        item.areas.forEach(v => {
          v.select = false;
          if (this.areaMax < v.amount) {
            this.areaMax = v.amount;
          }
        })
      })
    })
  },
  watch: {
    sepcialtyTitle(old) {
      this.specialtyList = this.specialtyBaseList.filter(v => { return v.name.includes(this.sepcialtyTitle) });
    }
  }
}
</script>

<style lang='less' scoped>
.hover-report {
  background-color: #999;
  padding: 2px;
  border-radius: 3px;
  color: #fff;
  &:hover {
    background-color: #eb8718;
  }
}
.tabel-repot {
  .delete {
    td {
      background-color: #ff6b6b;
      color: #fff !important;
    }
  }
  thead {
    td {
      padding: 15px 10px;
      border-bottom: 2px solid #eee;
      color: #000;
    }
  }
  tbody {
    tr {
      &:last-child td {
        border-bottom: 2px solid #eee;
        padding-top: 0px;
        padding-bottom: 10px;
        color: #999;
      }
      &:first-child td {
        padding-left: 0px;
        padding-right: 3px;
        padding-top: 7px;
        color: #000;
      }
    }
  }
}
.bc-e4e7ed {
  background-color: #e4e7ed;
}
.bc-county {
  background-color: #70abf3;
  color: #fff;
}
.bc-cee {
  -webkit-filter: grayscale(100%);
  background-color: #eee;
  filter: grayscale(100%);
}
.rhbutton {
  background-color: #ff8600;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
  font-weight: 700;
  text-transform: uppercase;
  background: #ff8600;
  background-image: linear-gradient(180deg, #ffa33e 20%, #ff7202 80%);
  -webkit-border-radius: 20px;
  border-radius: 20px;
  border-width: 0px;
  font-size: 15px;
  color: #fff;
  line-height: 39px;
  text-align: center;
  cursor: pointer;
  height: 39px;
  min-width: 180px;
  max-width: 296px;
}
.w-360 {
  width: 360px;
}
// .bb-btn {
//   &:before {
//     content: " ";
//     position: absolute;
//     width: 130px;
//     height: 36px;
//     border: 2px solid #ff7100;
//     top: 6px;
//     left: 6px;
//     z-index: 0;
//   }
// }
.love-spe {
  background-image: url("../../assets/other/to-test.jpg");
  background-position: bottom;
  background-repeat: no-repeat;
}
.fc-love {
  color: #ff5295;
}
.bc-spec {
  background-color: #86c2ff;
}
.bc-b {
  background-color: #ffe3cc;
}
.setp {
  .process {
    width: 1168px;
    background: url("../../assets/other/report-step.png") no-repeat;
    min-height: 50px;
    position: relative;
    .process-step {
      background-image: linear-gradient(0deg, #9cca3e 0%, #c6ee61 100%);
      height: 5px;
      position: absolute;
      top: 11px;
      border-radius: 20px;
      // max-width: 1166px;
      width: 50%;
      z-index: 300;
    }
    .step-list {
      position: relative;
      background-color: transparent;
      z-index: 500;
      .items {
        width: 1168/8px;
      }
      .step-dian {
        width: 22px;
        height: 22px;
        line-height: 22px;
        color: #fff;
        text-align: center;
        border-radius: 50%;
        position: relative;
        font-size: 16px;
        background: none;
        background-image: linear-gradient(0deg, #787879 0%, #adaeae 100%);
        &.active {
          background-image: linear-gradient(
            0deg,
            #febf04 0%,
            #ffd65e 100%
          ) !important;
        }
      }
    }
  }
}
</style>
