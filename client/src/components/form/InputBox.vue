<template>
  <div class="input-box" :class="{ danger: !isValid }">
    <label for="input" class="input-box__label">
      <span>{{ placeholder }}</span>
      <span>{{ optional ? "(Optional)" : "" }}</span>
    </label>

    <input
      type="text"
      id="input"
      class="input-box__input"
      :autofocus="autofocus"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "InputBox",

  props: {
    autofocus: Boolean,
    isValid: Boolean,
    optional: Boolean,
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

  &__label {
    transition: inherit;
    display: flex;
    justify-content: space-between;

    & > *:last-child {
      font-style: italic;
    }
  }

  &__input {
    padding: 0.8rem;

    font-family: inherit;
    font-size: 1.4rem;

    box-shadow: none;
    border: none;
    border-radius: 4px;
    background-color: rgba(gray, 0.15);

    transition: all 0.3s;

    &:focus {
      outline: none;
      background-color: rgba(gray, 0.25);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
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
  .input-box__label {
    color: var(--color-error);
  }

  &::after {
    background-color: var(--color-error);
  }
}
</style>
