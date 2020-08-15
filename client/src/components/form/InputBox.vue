<template>
  <div class="input-box" :class="{ danger: !isValid }">
    <input
      type="text"
      id="url-input"
      class="input-box__input"
      :autofocus="autofocus"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <label for="url-input" class="input-box__label">{{ placeholder }}</label>
  </div>
</template>

<script>
export default {
  name: "InputBox",

  props: {
    autofocus: Boolean,
    isValid: Boolean,
    placeholder: String,
    value: String
  }
};
</script>

<style lang="scss" scoped>
.input-box {
  display: flex;
  flex-direction: column;

  transition: all 0.2s ease;
  position: relative;

  &__input {
    font-family: inherit;
    font-size: 1.4rem;

    box-shadow: none;
    border: none;
    border-radius: 4px;
    background-color: rgba(gray, 0.15);

    padding: 1rem;
    width: 100%;
    height: 100%;

    transition: all 0.3s;

    &:focus {
      outline: none;
      background-color: rgba(gray, 0.25);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &__label {
    font-size: 1.4rem;

    display: block;
    position: absolute;
    top: -2.2rem;
    left: 0;

    backface-visibility: hidden;
    transition: all 0.3s;
  }

  &__input:placeholder-shown + &__label {
    opacity: 0;
    visibility: hidden;
    transform: translateY(2.4rem);
  }

  &::after {
    content: "";
    position: relative;
    left: 50%;
    width: 0;
    height: 3px;
    background-color: var(--color-primary);
    transition: all 0.15s ease-in-out;
  }

  &:focus-within::after {
    width: 100%;
    left: 0;
  }
}

.danger {
  &::after {
    content: "";
    background-color: var(--color-error);
  }
}
</style>
