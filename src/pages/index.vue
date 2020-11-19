<template lang="pug">
.landing
  .landing__text 
    span JAMM 
    span is finding the signal in the noise of tokenized communities.

  .landing__description 
    span Hold JAMM 
    span to get access to exclusive insights and experiments.
  .landing__buy Join JAMM
  .landing__buy__price 
    span 1 JAMM
    span =
    span ${{jammPrice}}
  .landing__participate
    a.landing__participate__container(
      v-for="options in jammParticipationOptions"
      :href="options.link"
      target="_blank"
    )
      img(:src="require(`~/assets/images/${options.imgName}`)")
      .landing__participate__container__title {{ options.title }}
      .landing__participate__container__value {{ options.value }}
  .landing__main
    section.landing__full-width
      .landing__headline Latest Content
      content-links
    section.landing__full-width
      .landing__headline JAMM Governance
      treasury(:jammPrice="jammPrice")
</template>

<script lang="ts">
  import { Component, Vue, State } from 'nuxt-property-decorator'
  import ContentLinks from '~/components/molecules/ContentLinks.vue'
  import Treasury from '~/components/molecules/Treasury.vue'

@Component({
  components: {
    ContentLinks,
    Treasury
  }
})
  export default class extends Vue {
    scrollToTop () {
      return true
    }

    private jammPrice = 0;

    async beforeMount() {
      this.jammPrice = (await this.$tokenService.getTokenInfo()).usd
    }


    get jammParticipationOptions() {
      return [
        {
          imgName: 'discord.png',
          title: 'Discord',
          value: '1000 JAMM',
          link: 'https://discord.gg/wZnHNaY8BV'
        },
        {
          imgName: 'outpost.png',
          title: 'Content',
          value: '500 JAMM',
          link: 'https://outpost-protocol.com/jamm'
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
  &__full-width {
    width: 100%;
  }
  &__text {
    text-align: center;
    margin: 1rem 0 1.5rem;
    font-size: 1.4rem;
    padding: 0 2rem;
    line-height: 1.8rem;

    @include breakpoint(sm) {
      font-size: 2.2rem;
      line-height: 3rem;
      margin: 2.5rem 0 3rem;
    }

    span {
      &:first-of-type {
        color: $color-jammGreen;
        font-weight: 800;
      }
    }
  }

  &__description {
    margin-top: 0.5rem;
    opacity: 0.8;
    text-align: center;
    font-weight: 300;
    font-size: 1rem;
    padding: 0 2rem;
    @include breakpoint(sm) {
      margin-top: 1rem;
      font-size: 1.2rem;
    }

    span { 
      &:first-of-type {
        font-weight: 500;
      }
    }
  }

  &__headline {
    font-weight: 500;
    padding: 1rem;
    text-align: center;
    font-size: 1.1rem;
    // color: $color-jammGreen;
    @include breakpoint(sm) {
      font-size: 1.2rem;
      padding: 2rem;
    }
  }

  &__buy {
    @extend %btn-primary;
    width: 5rem;
    margin: 2rem auto 0rem;

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

  &__main {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2rem;
    justify-items: center;
    @include breakpoint(sm) {
      margin: 0 auto;
      max-width: 40rem;
      grid-gap: 2rem;
    }
  }

  &__participate {
    margin: 2rem 0 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    cursor: pointer;

    @include breakpoint(sm) {
      margin: 5rem 0 4rem;
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
        // filter: drop-shadow(0px 0px 10px rgba($color-jammGreen, 0.6));
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
          transform: translate(0.25rem, -0.25rem);
          box-shadow: -0.25rem 0.25rem 0 rgba($color-jammGreen, 1);
        }
      }
    }
  }
}
</style>