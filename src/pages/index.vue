<template lang="pug">
.landing
  .landing__text Welcome to JAMM Pad!
</template>

<script lang="ts">
  import { Component, Vue, State } from 'nuxt-property-decorator'

@Component({
  components: {}
})
  export default class extends Vue {
    scrollToTop () {
      return true
    }

    async beforeMount() {
      const res = await this.$tokenService.getTokenInfo()
      console.log(res)
    }
  }
</script>

<style lang="scss" scoped>
.landing {
  &__text {
    @extend %col;
    margin: 2rem 0 1rem;
    display: block;
    font-weight: 500;
    padding: 1rem 0 1rem;
    @include breakpoint(sm) {
      font-size: 1.2rem;
      padding: 1rem 0 2rem;
    }
  }
}
</style>