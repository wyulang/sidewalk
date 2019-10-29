<template>
  <div class='w-all bc-eceef2'>
    <div class="bc-273c56 pl10 fs-14 fb lh-30">三位一体</div>
    <div class="rel flex ai-c bc-fff jc-c pt8 pb8">
      <div class="flex-line w-600 rel">
        <div class="abs zi-100 at12 h-2 bc-d al23 ar15 ">
          <div class="h-all rel zi-100 wb-100 jb-bc"></div>
        </div>
        <div class="flex ai-c rel zi-110 w-600 jc-b">
          <div class="flex fd-c jc-c jb-fc ai-c">
            <span class="iconfont fs-20 iconxiaoxi-chenggong mt3"></span>
            <span>结果</span>
          </div>
          <div class="flex fd-c jc-c rel zi-130 jb-fc ai-c">
            <span class="iconfont fs-20 jb-fc bc-fff iconxiaoxi-chenggong"></span>
            <span class="fs-12">面试题解析</span>
          </div>
          <div class="flex fd-c jc-c jb-fc ai-c">
            <span class="iconfont fs-20 iconxuanzhong1"></span>
            <span class="fs-12">课程</span>
          </div>
        </div>
      </div>
      <div @click="$router.push({name:'trinity-analyze'})" class="abs ar100 at15 h-28 pl20 pr20 hand ra-5 jb-bc lh-28">上一步</div>
    </div>
    <!-- banner -->
    <div class="bannels"></div>
    <div class="pt20 pb20 fs-25 center fb">精品课程</div>

    <div class="w-1200 m-auto">
      <div class="bc-fff w-all mb20">
        <div class="flex jc-b pl10 pr10">
          <el-carousel trigger="click" indicator-position="outside" arrow="always" class="w-all pt25 pb10">
            <el-carousel-item v-for="item in cours" class="flex jc-b pl100 pr100" :key="item">
              <div @click="toDetail(0,val.id,0)" v-for="(val, index) in item" :key="index" class="flex sha-b hand fd-c" style="width:265px;height:280px">
                <div class="h-160 w-all bc-a">
                  <img :src="val.coverPicture" class="w-all h-all" alt="">
                </div>
                <div class="ml15 mr15 mt10 pb10 bb-1">面试精讲</div>
                <div class="pt15 pb15 flex ai-c pl15 pr15">
                  <img :src="val.teacherPic" class="w-47 h-47 ra-all" alt="">
                  <span class="ml8 fc-999 flex-1">{{val.teacherName}}</span>
                  <span class="fc-999">{{val.createTime}}</span>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <div v-for="(item, index) in list" :key="index">
        <div class="w-all bc-fff flex pt10 pb10 pl10">
          <img :src="item.schoolBadgeSite" class="w-47 h-47 ra-all" alt="">
          <div class="flex fd-c jc-c ml10">
            <span class="fs-20 fb">{{item.name}}</span>
            <span class="mt3">{{item.type}}</span>
          </div>
        </div>

        <div class="mt10 flex jc-b w-all fw ">
          <div @click="toDetail(item.id,val.id,1)" v-for="(val, index) in item.trainingCourseVos" :key="index" class="flex sha-b bc-fff wb-23 hand mb10 fd-c">
            <div class="h-160 w-all bc-a">
              <img :src="val.coverPicture" class="w-all h-all" alt="">
            </div>
            <div class="ml15 mr15 mt10 pb10 bb-1">面试精讲</div>
            <div class="pt15 pb15 flex ai-c pl15 pr15">
              <img :src="val.teacherPic" class="w-47 h-47 ra-all" alt="">
              <span class="ml8 fc-999 flex-1">{{val.teacherName}}</span>
              <span class="fc-999">{{val.createTime}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="h-20 w-all flex"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      list: [],
      cours: []
    }
  },
  methods: {
    ...mapActions(['findCourseByUniversiyIds', 'findExcellentCourse']),
    toDetail(schoolId, courseId, type) {
      this.href('#/trinity/course/detail', null, { s: schoolId, c: courseId, type: type });
    },
    initData() {
      this.findCourseByUniversiyIds({ ids: this.session('trinitySchoolId') }).then(res => {
        if (res.code == 20000) {
          this.list = res.dt;
        }
      })
      this.findExcellentCourse({ ids: this.session('trinitySchoolId') }).then(res => {
        if (res.code == 20000) {
          let mod = [];
          res.data.array.forEach((item, index) => {
            let len = parseInt(index / 3);
            if (len == (index / 3)) {
              mod.push([]);
            }
            mod[len].push(item);
          });
          // console.log('tag', mod)
          this.cours = mod;
        }
      })
    },
  },
  created() {
    this.initData();
  }
}
</script>

<style lang='less' scoped>
.bc-273c56 {
  color: #fff;
  background-color: #273c56;
}
.bannels {
  background-color: #58a3ff;
  height: 340px;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("../../assets/banner/trinity-scours.png");
}
.bc-eceef2 {
  background-color: #eceef2;
}
</style>
