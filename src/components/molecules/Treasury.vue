<template lang="pug">
a.treasury(:href="treasuryLink")
  .treasury__container
    .treasury__header
      .treasury__icon
        fa-icon(:icon="['fas', 'gem']")
        span JAMM Treasury
      .treasury__amount
        .treasury__amount__jamm {{ Math.floor(treasuryBalance).toLocaleString() }} JAMM
        .treasury__amount__usd ({{ (Math.floor(treasuryBalance * jammPrice)).toLocaleString() }} USD )
      fa-icon.treasury__link(:icon="['fas', 'external-link-square-alt']")

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator'
  import Transaction from '~/components/molecules/Transaction.vue'
@Component({
  components: {
    Transaction
  }
})
  export default class Treasury extends Vue {
    @Prop() jammPrice!: number
    private treasuryBalance = 0

    async beforeMount() {
      this.treasuryBalance = await this.$tokenService.getTreasuryBalance()
    }
    get treasuryLink() {
      return this.$tokenService.treasuryLink
    }
  }
</script>

<style lang="scss" scoped>
.treasury {
  &__container {
    background-color: $color-jammSmoke;
    border-radius: 0.25rem;
    @include breakpoint(sm) {
      &:hover {
        .treasury__header {
          background-color: rgba($color-swan, 0.1);
        }
      }
    }
  }

  &__header {
    display: grid;
    border-radius: 0.25rem;
    padding: 1rem 1.5rem;
    grid-gap: 1.5rem 0.5rem;
    transition: 0.2s ease-in-out;
    grid-template-areas: 
      'trasuryIcon link'
      'amount amount';
    @include breakpoint(sm) {
      grid-template-columns: 1fr 1fr auto;
      grid-template-areas: 
      'trasuryIcon amount amount';
    }
  }

  &__icon {
    @extend %row;
    justify-self: start;
    grid-area: trasuryIcon;
    svg {
      font-size: 1.1rem;
      color: $color-jammGreen;
      padding-right: 0.5rem;
    }
  }
  &__amount {
    grid-area: amount;
    @extend %row;
    @include breakpoint(sm) {
      justify-content: flex-end;
    }
    &__jamm {
      font-weight: 500;
      // color: $color-jammGreen;
    }
    &__usd {
      font-size: 0.8rem;
      opacity: 0.8;
      padding-left: 0.75rem;
    }
  }
  &__link {
    justify-self: end;
    grid-area: link;
    transition: 0.2s ease-in-out;
    opacity: 0.6;
    padding-left: 1.5rem;
    @include breakpoint(sm) {
      display: none;
    }
  }
}
</style>
