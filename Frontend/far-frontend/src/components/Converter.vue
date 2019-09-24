<template>
  <div class="converter-body col-md-12">
    <div class="row text-center converter-body__contents">
      <div class="col-md-12 col-lg-6 pr-2 converter-body__textarea-source">
        <h3 class="converter-body__textarea-heading">ARABIC</h3>
        <textarea
          name="source-text"
          class="converter-body__textarea"
          @focus="sourceChosen = true"
          @blur="sourceChosen = false"
          :class="{highlighted: sourceChosen}"
        ></textarea>
      </div>
      <div class="col-md-12 col-lg-6 pl-2 converter-body__textarea-destination">
        <h3 class="converter-body__textarea-heading">ROMAN</h3>
        <textarea
          name="source-text"
          class="converter-body__textarea"
          @focus="destinationChosen = true"
          @blur="destinationChosen = false"
          :class="{highlighted: destinationChosen}"
        ></textarea>
      </div>
      <div class="col-md-12 col-lg-6 offset-lg-3">
        <button class="btn btn-block btn-primary converter-body__convert-btn">CONVERT</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sourceChosen: false,
      destinationChosen: false
    };
  }
};
</script>

<style lang="scss">
$mainColor: rgb(15, 139, 255);

.converter-body {
  &__contents {
    align-items: center;
  }

  &__textarea {
    width: 100%;
    height: 300px;

    resize: none;

    border-radius: 5px;

    outline-color: $mainColor;
  }

  &__textarea-heading {
    font-weight: bolder;
  }

  &__btn-convert {
    color: white;

    background-color: $mainColor;
    border-color: $mainColor;
  }

  &__textarea-source {
    textarea {
      border: 1px solid $mainColor;
    }
  }

  &__textarea-destination {
    textarea {
      border: 1px solid $mainColor;
    }
  }

  &__convert-btn {
    font-weight: bolder;
    letter-spacing: 2px;

    background-color: $mainColor;

    border-color: $mainColor;
  }
}

.highlighted {
  animation: highlight-on 0.1s linear forwards;
}

@keyframes highlight-on {
  from {
    box-shadow: 0px 0px 2px 0px $mainColor;
  }

  to {
    box-shadow: 0px 0px 2px 2px $mainColor;
  }
}
</style>
