<template lang="pug">
.transaction
  .transaction__value(:class="txInfo.isOutbound ? 'transaction__value--negative' : 'transaction__value--positive'")
    span {{txInfo.isOutbound ? '-' : '+'}}
    span {{txInfo.value.toLocaleString()}} {{txInfo.tokenSymbol}}
  .transaction__time {{$moment(txInfo.timeStamp * 1000).format('MMMM Do YYYY')}}
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator'
  import { TransactionInfo } from '~/types'
@Component({})
  export default class Transaction extends Vue {
    @Prop() txInfo!: TransactionInfo

    // WIP -> will not be used in V1
  }
</script>

<style lang="scss" scoped>
.transaction{
  @extend %row;
  justify-content: space-between;
  &__value {
    &--negative {
      color: $color-bittersweet;
    }
    &--positive {
      color: $color-meadow;
    }
  }
}
</style>
