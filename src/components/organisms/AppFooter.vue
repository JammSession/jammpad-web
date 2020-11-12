<template lang="pug">
footer.appFooter(:class="{ 'appFooter--fixedButton': isFixedButtonShown }")
  .appFooter__content
    p.appFooter__brand
      small &copy; {{ `${$moment().format('YYYY')}` }}
      span JAMM
    ul.appFooter__links.footerLinks
      li
        a(:href="discordLink" target="_blank")
          fa-icon(:icon="['fab', 'discord']" size="2x")
      li
        a(:href="twitterLink" target="_blank")
          fa-icon(:icon="['fab', 'twitter']" size="2x")
      li
        a(:href="githubLink" target="_blank")
          fa-icon(:icon="['fab', 'github']" size="2x")
</template>

<script>
export default {
  props: {
    isFixedButtonShown: { type: Boolean, default: () => false }
  },
  computed: { 
    discordLink() {
      return 'https://discord.gg/wZnHNaY8BV'
    },
    twitterLink() {
      return 'https://twitter.com/JammSession_'
    },
    githubLink() {
      return 'https://github.com'
    },
  }
}
</script>

<style lang="scss" scoped>
.appFooter {
  @extend %col;
  box-sizing: border-box;
  font-size: 0.6rem;
  text-align: center;
  width: 100%;
  padding: 0 1rem;

  @include breakpoint(sm) {
    font-size: 0.75rem;
    grid-gap: 0.25rem;
  }

  &__content {
    @extend %row;
    justify-content: space-between;
    width: 100%;
    max-width: $screen-max-width;
  }

  &__brand {
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: auto auto;
    justify-content: center;

    small {
      color: rgba($color-swan, 0.6);
      font-size: inherit;
    }

    a {
      color: rgba($color-swan, 0.6);
      transition: 0.2s ease-in-out;
      &:hover {
        opacity: 0.7;
      }
    }
  }
}

.footerLinks {
  align-items: center;
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 2rem;
  justify-content: center;
  list-style-type: none;
  padding: 0;

  @include breakpoint(sm) {
    grid-gap: 3rem;
  }

  a {
    color: rgba($color-swan, 0.6);
    transition: 0.2s ease-in-out;
    &:hover {
      opacity: 0.7;
    }
  }

  img {
    height: auto;
    width: 22px;

    @include breakpoint(sm) {
      width: 28px;
    }
  }
}
</style>
