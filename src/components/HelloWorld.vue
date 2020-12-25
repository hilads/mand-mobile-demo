<template>
  <div class="hello">
    <!-- <h1><span>{{ msg }}</span></h1> -->
    <p>年后A mobile UI toolkit, based on Vue.js 2, designed for financial scenarios.</p>
    <p>年后 A mobile UI toolkit, based on Vue.js 2, designed for financial scenarios. A mobile UI toolkit, based on Vue.js 2, designed for financial scenarios. A mobile UI toolkit, based on Vue.js 2, designed for financial scenarios. A mobile UI toolkit, based on Vue.js 2, designed for financial scenarios. A mobile UI toolkit, based on Vue.js 2, designed for financial scenarios.</p>
    <br />
    <md-button type="primary" >lolo</md-button>
        <md-icon
        name="filter"
        size="lg"
      ></md-icon>
  </div>
</template>

<script>
import { Button, Toast,Icon } from "mand-mobile";
import api from "@/api";
export default {
  name: "HelloWorld",
  components: {
    "md-button": Button,
    "md-icon": Icon,
  },
  props: {
    msg: String
  },
  methods: {
    greet() {
      Toast.info("I'm Batman!");
    }
  }
};
</script>

<style lang="stylus" scoped>
.hello
  text-align center
  padding 20px
  font-size 32px
  color #666
  line-height 56px
.hello h1
  color #333
  line-height 1.15
  font-size 64px
  margin-bottom 32px
.hello h1 span
  position relative
.hello h1 span::after
  content ''
  position absolute
  z-index -1
  left 0
  bottom 8px
  width 100%
  height 20px
  background #ecf6ff
</style>
