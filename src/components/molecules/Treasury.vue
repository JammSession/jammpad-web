<template lang="pug">
a.treasury(:href="treasuryLink")
  .treasury__wrapper
    .treasury__header
      .treasury__icon
        fa-icon(:icon="['fas', 'gem']")
        span JAMM Treasury
      .treasury__content
        .treasury__content__jamm {{ treasuryBalance.toLocaleString() }} JAMM
        .treasury__content__usd ({{ (treasuryBalance * jammPrice).toLocaleString() }} USD )
        fa-icon.treasury__content__link(:icon="['fas', 'external-link-square-alt']")

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
  &__wrapper {
    background-color: $color-jammSmoke;
    border-radius: 0.25rem;
    padding: 1rem 1.5rem;
    &:hover {
      .treasury__content__link {
        opacity: 1;
      }
    }
  }

  &__header {
    @extend %row;
    justify-content: space-between;
  }

  &__icon {
    @extend %row;
    justify-content: space-between;
    svg {
      font-size: 1.1rem;
      color: $color-jammGreen;
      padding-right: 0.5rem;
    }
  }
  &__content {
    @extend %row;
    &__jamm {
      font-weight: 500;
      color: $color-jammGreen;
    }
    &__usd {
      font-size: 0.8rem;
      opacity: 0.8;
      padding-left: 0.75rem;
    }
    &__link {
      transition: 0.2s ease-in-out;
      opacity: 0.7;
      padding-left: 1.5rem;
    }
  }
}
</style>
