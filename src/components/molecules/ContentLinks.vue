<template lang="pug">
.contentLinks 
  loading-spinner(v-if="loading")
  a.contentLinks__content(
    v-for="post, index in content" 
    v-if="!loading && index < 3"
    :href="articleLink(post.txId)" target="_blank"
  )
    .contentLinks__content__hold 
      fa-icon(:icon="['fas', 'lock']")
      span {{post.readRequirement}} JAMM
    img.contentLinks__content__image(:src="post.featuredImg")
    .contentLinks__content__text
      section
        .contentLinks__content__text__title {{ post.title }}
        .contentLinks__content__text__subtitle {{ post.subtitle }}
      .contentLinks__content__text__footer
        .contentLinks__content__text__footer__author {{ (post.user || {}).name || 'Anonymous'}} 
        .contentLinks__content__text__footer__timestamp {{ $moment(post.timestamp * 1000).format('MMMM Do YYYY')}}

  a.contentLinks__all-btn(:href="outpostLink" target="_blank") 
    span All Content
    fa-icon(:icon="['fas', 'external-link-square-alt']")
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator'
  import LoadingSpinner from '~/components/atoms/LoadingSpinner.vue'
@Component({
  components: {
    LoadingSpinner
  }
})
  export default class ContentLinks extends Vue {
    private content = []
    private loading = true

    async beforeMount() {
      this.content = await this.$outpostService.getSortedPosts()
      this.loading = false
    }

    get outpostLink () {
      return this.$outpostService.link
    }

    articleLink (id) {
      return this.$outpostService.articleLink(id)
    }
  }
</script>

<style lang="scss" scoped>
.contentLinks {
  &__content + &__content {
    margin-top: 1rem;
  }
  &__content {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    grid-gap: 1rem;
    padding: 1.5rem;
    background-color: $color-jammSmoke;
    border-radius: 0.25rem;
    transition: 0.2s ease-in-out;

    @include breakpoint(sm) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      grid-gap: 2rem;
      padding: 1.5rem 2rem;
    }

    &:hover {
      opacity: 0.9;
      @include breakpoint(sm) {
        .contentLinks__content__image {
          transform: scale(1.03);
        }
      }
    }

    &__hold {
      @extend %row;
      position: absolute;
      top: -0.25rem;
      right: -0.25rem;
      border-radius: 0.75rem;
      padding: 0.25rem 0.5rem;
      font-size: 0.8rem;
      background-color: $color-jammGreen;
      color: $color-jammMetal;
      box-shadow: -1px 1px 4px $color-jammMetal;

      @include breakpoint(sm) {
        font-size: 0.9rem;
        top: -0.5rem;
        right: -0.5rem;
      }

      svg {
        font-size: 0.7rem;
        opacity: 0.8;
        margin-right: 0.25rem;
      }
    }

    &__image {
      border-radius: 0.25rem;
      min-height: 6rem;
      margin: 0 auto;
      transition: 0.2s ease-in-out;
    }

    &__text {
      @extend %col;
      height: 100%;
      &__title {
        font-weight: 400;
        line-height: 1.3;
        font-size: 1.1rem;
        color: $color-jammGreen;
      }
      &__subtitle {
        padding-top: 0.5rem;
        font-weight: 300;
        line-height: 1.2;
      }
      &__footer {
        @extend %row;
        width: 100%;
        justify-content: space-between;
        margin-top: auto;
        font-size: 0.8rem;
        opacity: 0.6;

        &__author {
          
        }
        &__timestamp {

        }
      }
    }
  }
  &__all-btn {
    @extend %btn-secondary;
    margin-top: 1rem;
    svg {
      padding-top: 0.05rem;
    }
  }
}
</style>
