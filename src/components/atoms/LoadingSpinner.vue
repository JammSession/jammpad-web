<template <template lang="pug">
.loading-spinner__wrapper 
  .loading-spinner
  //- img(src="~/assets/images/logo--small.png")
</template>

<script>
  export default {}
</script>

<style <style lang="scss">
.loading-spinner {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  box-sizing: border-box;
  border: 2px solid $color-main-background;
  border-left-color: $color-jammGreen;
  border-radius: 50%;
  height: 100%;
  width: 100%;
  animation: donut-spin 1.2s linear infinite;

  &__wrapper {
    @extend %col;
    position: relative;
    height: 2rem;
    width: 2rem;
    margin: 0 auto;

    img {
      height: 40%;
      width: 40%;
    }
  }
  
}

@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
