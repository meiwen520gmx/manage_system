<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>
    <!--三个条件：1有且只有一个子项目，2子菜单是否还包含子菜单，3是否必须展示-->
    <!--app-link在meta存在时展示，相当于添加点击功能，即a标签（处理内链还是外链）-->
    <!--item是实际展示，该模版只有一个render()方法来渲染（渲染图标，标题等）-->
    <!--若child小于2执行以上步骤-->

    <!--若child大于2执行以下步骤（我调我自己sidebar-item）-->
    <!--插槽title展示父路由（render方法渲染）-->
    <!--sidebar-item遍历child（is-nest控制isNest，决定submenu-title-noDropdown即子菜单各项目的样式是否展示，bath-path处理该菜单各项目的链接）-->
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: "Index",
  props: {
    route: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      onlyOneChild: null,
    };
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        //把需要显示的children存入showingChildren
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true }; //没有子菜单，则用parent覆盖onlyOneChild来展示
        return true;
      }
      return false; //child大于2时，则展示ELSubmenu
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>

<style lang="less" scoped></style>
