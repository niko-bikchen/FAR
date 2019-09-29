<template>
  <div class="converter-body col-md-12">
    <div class="row text-center converter-body__contents">
      <div class="col-md-12 col-lg-6 pr-2 converter-body__textarea-source">
        <h3 class="converter-body__textarea-heading">{{ from }}</h3>
        <textarea
          name="source-textarea"
          class="converter-body__textarea"
          @focus="sourceChosen = true"
          @blur="sourceChosen = false"
          :class="{highlighted: sourceChosen}"
          ref="source"
        ></textarea>
      </div>
      <div class="col-md-12 col-lg-6 pl-2 converter-body__textarea-target">
        <h3 class="converter-body__textarea-heading">{{ to }}</h3>
        <textarea
          name="target-textarea"
          class="converter-body__textarea"
          @focus="targetChosen = true"
          @blur="targetChosen = false"
          :class="{highlighted: targetChosen}"
          ref="target"
        ></textarea>
      </div>
      <div class="col-md-12 col-lg-6 offset-lg-3">
        <button
          class="btn btn-block btn-primary converter-body__convert-btn"
          @click="processInput"
        >CONVERT</button>
        <button
          class="btn btn-block btn-primary converter-body__convert-btn"
          @click="switchFrom"
        >SWITCH</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sourceChosen: false,
      targetChosen: false,
      to: "ROMAN",
      from: "ARABIC"
    };
  },
  methods: {
    switchFrom() {
      if (this.from === "ARABIC") {
        this.from = "ROMAN";
        this.to = "ARABIC";
      } else if (this.from === "ROMAN") {
        this.from = "ARABIC";
        this.to = "ROMAN";
      }
    },
    processInput() {
      // TODO: Make this method more secure
      var sourceText = this.$refs.source.value;
      var numbers = sourceText.match(/\d+/gm);
      numbers.forEach(element => {
        sourceText = sourceText.replace(element, `<number>${element}</number>`);
      });

      console.log(sourceText);
      console.log(numbers);
    }
  }
};
</script>

<style lang="scss">
$mainColor: rgba(0, 57, 108, 1);

.converter-body {
  &__contents {
    align-items: center;
  }

  &__textarea {
    width: 100%;
    height: 300px;

    padding: 15px;

    font-size: 18px;

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

  &__textarea-target {
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

  button {
    height: 50px;

    &hover {
      background-color: rgb(15, 139, 255) 0%;
      border-color: rgb(15, 139, 255) 0%;
    }
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
