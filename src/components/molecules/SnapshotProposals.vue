<template lang="pug">
.snapshotProposals 
  loading-spinner(v-if="loading")
  .snapshotProposals__container
    a.snapshotProposals__content(
      v-for="proposal, index in proposals" 
      v-if="!loading && index < 5"
      :href="voteLink(proposal.id)" target="_blank"
    )
      .snapshotProposals__content__text__title {{ proposal.title }}
      .snapshotProposals__content__text__footer
        .snapshotProposals__content__text__footer__timestamp
          fa-icon(:icon="['fas', 'play']")
          span {{ $moment(proposal.start).format('MMM Do YYYY')}}
        .snapshotProposals__content__text__footer__timestamp
          fa-icon(:icon="['fas', 'stop']")
          span {{ $moment(proposal.end).format('MMM Do YYYY')}}
        .snapshotProposals__content__status(:class="{'open': $moment().isBefore($moment(proposal.end))}")
          span {{ $moment().isBefore($moment(proposal.end)) ? 'Open' : 'Closed' }}

  a.snapshotProposals__all-btn(:href="snapshotLink" target="_blank") 
    span View All Governance Proposals
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
    private proposals = []
    private loading = true

    async beforeMount() {
      this.proposals = await this.$snapshotService.getAllProposals()
      this.loading = false
    }

    get snapshotLink () {
      return this.$snapshotService.snapshotLink
    }

    cutBodyText(body) {
      return `${body.substring(0, 1200)}...` // in case we want to show the body text of each proposal
    }

    voteLink (id) {
      return this.$snapshotService.voteLink(id)
    }
  }
</script>

<style lang="scss" scoped>
.snapshotProposals {
  &__container {
    background-color: $color-jammSmoke;
    border-radius: 0.25rem;
  }

  &__content {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    grid-gap: 0.75rem;
    transition: 0.2s ease-in-out;
    padding: 1rem 1rem;
    border-top: 1px solid rgba($color-jammMetal, 0.7);

    @include breakpoint(sm) {
      grid-template-columns: 1.2fr 1fr;
      grid-template-rows: 1fr;
      grid-gap: 1rem;
      padding: 1rem 1.5rem;
    }

    &:hover {
      background-color: rgba($color-swan, 0.1);
    }

    &__status {
      @extend %row;
      border-radius: 0.75rem;
      padding: 0.25rem 0.5rem;
      font-size: 0.7rem;
      background-color: rgba($color-swan, 0.4);
      color: $color-jammMetal;

      @include breakpoint(sm) {
        font-size: 0.8rem;
      }

      svg {
        font-size: 0.7rem;
        opacity: 0.8;
        margin-right: 0.25rem;
      }
    }

    &__text {
      height: 100%;
      &__title {
        &__wrapper {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-gap: 0.5rem;
        }
        font-weight: 400;
        line-height: 1.3;
        color: $color-jammGreen;
      }
      &__subtitle {
        padding-top: 0.5rem;
        font-weight: 300;
        line-height: 1.2;
        overflow: hidden;
      }
      &__footer {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 0.5fr;
        grid-gap: 1rem;
        font-size: 0.8rem;
        line-height: 0.8;
        align-items: center;
        &__timestamp {
          justify-self: start;
          span {
            opacity: 0.7;
          }
          svg {
            opacity: 1;
            font-size: 0.7rem;
            font-weight: 500;
            padding-right: 0.5rem;
          }
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

.open {
  background-color: $color-jammGreen;
}

.fade {
  position: relative;
  height: 4.8em; /* exactly three lines */
}
.fade:after {
  content: "";
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60%;
  height: 1.2em;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba($color-jammSmoke, 1) 50%);
}
</style>
