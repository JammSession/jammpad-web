<template lang="pug">
.topbar(:class="{'topbar--rinkeby': isRinkeby, 'topbar--unsupported': isUnsupportedNet }" )
  .topbar__content
    client-only
      .topbar__rinkebyLogo(v-if="isRinkeby") Rinkeby
    client-only
      .topbar__unsupported(v-if="isUnsupportedNet") Unsupported Network
    nuxt-link.topbar__link(:to="'/'")
      img.topbar__logo(src="~assets/images/logo.png")
    .topbar__menu
      //- a.topbar__menu__item(:href="outpostLink" target="_blank")
      //-   fa-icon(:icon="['fas', 'sticky-note']")
      //-   span Content
      //- a.topbar__menu__item(:href="snapshotLink" target="_blank")
      //-   fa-icon(:icon="['fas', 'vote-yea']")
      //-   span Governance
      .topbar__wallet
        button(
          v-if="!hasWallet"
          @click="sendToMetamask"
        ) Install Wallet
        button(
          v-else-if="isWalletLocked"
          @click="unlockWallet"
        ) Connect Wallet
        span(v-else) {{ (myJammBalance || 0).toLocaleString() }} JAMM
      //- a.topbar__buy(:href="uniswapLink" target="_blank") Buy JAMM
</template>

<script lang="ts">
  import { Component, Vue, State } from 'nuxt-property-decorator'

@Component({
  components: {
  }
})
  export default class TopBar extends Vue {
    @State ownAddress
    @State networkId
    @State finishedInit
    @State myJammBalance

    get hasWallet () {
      return this.$ethereumService.hasWallet
    }

    get isWalletLocked() {
      return !this.ownAddress.length
    }

    get isMainnet () {
      return this.networkId === 1
    }

    get isRinkeby () {
      return this.networkId === 4
    }

    get isUnsupportedNet () {
      return !(this.isMainnet || this.isRinkeby)
    }

    get shortenedAddress() {
      return `${this.ownAddress.substring(0, 5)}...${this.ownAddress.substring(this.ownAddress.length - 5, this.ownAddress.length)}`
    }

    get outpostLink () {
      return 'https://outpost-protocol.com/jamm'
    }

    get snapshotLink () {
      return 'https://snapshot.page/#/jamm'
    }

    async unlockWallet() {
      return await this.$ethereumService.unlockWallet()
    }

    sendToMetamask() {
      window.open('https://metamask.io/', '_blank')
    }
  }
</script>

<style lang="scss" scoped>
.topbar {
  @extend %col;
  padding: 0.5rem 1rem;
  background-color: darken($color-shark, 1);
  /* border-bottom: 1px solid $color-meadow; */
  z-index: 999;
  @include breakpoint(sm) {
    box-shadow: 0 2px 4px rgba($color-woodsmoke, 0.6);
  }

  &--rinkeby {
    border-bottom: 2px solid $color-kournikova;
  }

  &--unsupported {
    border-bottom: 2px solid $color-error;
  }

  // for the nuxt links
  a {
    display: flex;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    width: 100%;
    max-width: $screen-max-width;
    font-size: 0.9rem;
    @include breakpoint(sm) {
      font-size: 1rem;
    }
  }

  &__rinkebyLogo {
    position: absolute;
    bottom: -1.5rem;
    left: 1rem;
    color: $color-shark;
    background-color: $color-kournikova;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    border-radius: 0 0 0.25rem 0.25rem;
  }

  &__unsupported {
    position: absolute;
    bottom: -1.5rem;
    left: 1rem;
    color: $color-shark;
    background-color: $color-error;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    border-radius: 0 0 0.25rem 0.25rem;
  }

  &__link {
    @extend %row;
    justify-content: flex-start;
  }

  &__logo {
    align-self: center;
    height: 1.65rem;
    width: auto;
    margin-right: 1rem;
    @include breakpoint(sm) {
      height: 2rem;
      margin-right: 1.5rem;
    }
  }

  &__menu {
    @extend %row;
    &__item + &__item {
      margin-left: 1rem;
      @include breakpoint(sm) {
        margin-left: 3rem;
      }
    }
    &__item {
      transition: 0.2s ease-in-out;

      svg { 
        margin-right: 0.5rem;
      }

      &:hover {
        color: $color-jammGreen;
      }
    }
  }

  &__wallet {
    margin-left: 2rem;

    @include breakpoint(sm) {
      margin-left: 6rem;
    }
    button {
      @extend %btn-primary--small;
      @extend %btn-primary--gray;
    }

    span {
      background-color: rgba($color-swan, 0.1);
      padding: 0.25rem 0.5rem;
      border-radius: 0.5rem;
      color: $color-jammGreen;
      font-weight: 500;

      @include breakpoint(sm) {
        padding: 0.4rem 0.75rem;
      }
    }
  }

  &__buy {
    @extend %btn-primary--small;
    font-size: 0.8rem;
  }
}
</style>