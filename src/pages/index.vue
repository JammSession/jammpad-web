<template lang="pug">
.landing
  .landing__text 
    span JAMM 
    span is a social token for crypto-natives, experimenting with tokenized community tools

  .landing__description Participate by holding JAMM
  .landing__buy Buy JAMM
  .landing__buy__price 
    span 1 JAMM
    span =
    span $0.19
  .landing__participate
    a.landing__participate__container(
      v-for="options in jammParticipationOptions"
      :href="options.link"
      target="_blank"
    )
      img(:src="require(`~/assets/images/${options.imgName}`)")
      .landing__participate__container__title {{ options.title }}
      .landing__participate__container__value {{ options.value }}
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

    get jammParticipationOptions() {
      return [
        {
          imgName: 'outpost.png',
          title: 'Content',
          value: '500 JAMM',
          link: 'https://outpost-protocol.com/jamm'
        },
        {
          imgName: 'discord.png',
          title: 'Discord',
          value: '1000 JAMM',
          link: 'https://discord.gg/wZnHNaY8BV'
        },
        {
          imgName: 'snapshot.png',
          title: 'Snapshot',
          value: '> 0 JAMM',
          link: 'https://snapshot.page/#/jamm'
        },
        {
          imgName: 'twitter.png',
          title: 'Twitter',
          value: 'Free',
          link: 'https://twitter.com/JammSession_'
        },
      ]
    }
  }
</script>

<style lang="scss" scoped>
.landing {
  &__text {
    text-align: center;
    margin: 1rem 0 2rem;
    font-size: 1.2rem;
    padding: 0 2rem;
    line-height: 1.6rem;

    @include breakpoint(sm) {
      font-size: 1.4rem;
      line-height: 1.8rem;
      margin: 2.5rem 0 4rem;
    }

    span {
      &:first-of-type {
        color: $color-jammGreen;
        font-weight: 800;
      }
    }
  }

  &__description {
    margin-top: 2rem;
    opacity: 0.8;
    text-align: center;
    font-weight: 300;
    font-size: 0.9rem;
    @include breakpoint(sm) {
      margin-top: 3rem;
      font-size: 1rem;
    }
  }

  &__buy {
    @extend %btn-primary;
    width: 5rem;
    margin: 1.5rem auto 0rem;

    &__price {
      margin: 0.5rem 0;
      text-align: center;
      font-size: 0.8rem;
      opacity: 0.8;
      span {
        &:first-of-type {
          color: $color-jammGreen;
          font-weight: 500;
          padding-right: 0.5rem;
        }
        &:last-of-type {
          padding-left: 0.5rem;
        }
      }

      svg { 
        color: $color-jammGreen;
      }
    }
  }

  &__participate {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem 2rem;
    cursor: pointer;

    @include breakpoint(sm) {
      margin-top: 3rem;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 2rem;
    }

    &__container {
      @extend %col;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      background-color: $color-jammSmoke;
      border: 1px solid rgba($color-jammGreen, 0.2);
      transition: 0.2s ease-in-out;

      img {
        height: 3rem;
        width: auto;
        @include breakpoint(sm) {
          height: 5rem;
        }
      }

      &__title {
        padding: 0.5rem 0 0.25rem;
        font-weight: 500;
        @include breakpoint(sm) {
          padding: 1rem 0 0.75rem;
          font-size: 1.1rem;
        }
      }

      &__value {
        color: $color-jammGreen;
        font-size: 0.9rem;
      }

      &:hover {
        @include breakpoint(sm) {
          transform: translate(0.15rem, -0.25rem);
          box-shadow: -0.15rem 0.25rem 0 rgba($color-jammGreen, 0.7);
        }
      }
    }
  }
}
</style>