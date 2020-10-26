<template>
  <div class="bread_container">
    <el-breadcrumb class="breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(name, index) in matchedArr" :key="index">
          {{ name }}
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changeBarDirection: false,
    };
  },
  created() {},
  computed: {
    matchedArr() {
      let temp = [],
        temps = [];
      this.$route.matched.filter((item, index, self) => {
        if (item.meta.title) {
          const name = item.meta.title;
          temp.push(name);
        }
      });
      temp.filter((item, index, self) => {
        if (!temps.includes(item)) {
          temps.push(item);
        }
      });
      return temps;
    },
  },
  mounted() {},
  methods: {
    // handleLefeMenu() {
    //   this.$store.dispatch("setLeftCollapse"); // 折叠菜单
    //   this.$store.dispatch("handleLeftMenu"); // 改变菜单宽度 180->35/35-180
    //   this.changeBarDirection = !this.changeBarDirection;
    // },
  },
  watch: {},
};
</script>

<style lang="less">
.bread_container {
  // background-color: #eaebec;
  padding: 0 25px;
  .breadcrumb {
    height: 30px;
    line-height: 30px;
    .breadbutton {
      float: left;
      margin: 4px 5px 0 0;
    }
  }
}
</style>
