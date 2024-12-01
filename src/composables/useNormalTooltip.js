import { ref } from 'vue'

export function useNormalTooltip() {
  const left = ref(null)
  const middle = ref(null)
  const right = ref(null)

  if (!left.value) {
    const image = new Image()

    image.src = '/header-double-normal-left.webp'

    image.onload = () => {
      left.value = image
    }
  }

  if (!middle.value) {
    const image = new Image()

    image.src = '/header-double-normal-middle.webp'

    image.onload = () => {
      middle.value = image
    }
  }

  if (!right.value) {
    const image = new Image()

    image.src = '/header-double-normal-right.webp'

    image.onload = () => {
      right.value = image
    }
  }

  return {
    left,
    middle,
    right,
  }
}
