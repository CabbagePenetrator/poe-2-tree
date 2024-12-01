import { ref } from 'vue'

export function useFramesSprite() {
  const sprite = ref(null)

  if (!sprite.value) {
    const image = new Image()

    image.src = '/frames.webp'

    image.onload = () => {
      sprite.value = image
    }
  }

  const getNormalFrameCoords = () => {
    return { x: 59, y: 315 }
  }

  const getSelectableFrameCoords = () => {
    return { x: 345, y: 252 }
  }

  const getSelectedFrameCoords = () => {
    return { x: 20, y: 315 }
  }

  return {
    sprite,
    getNormalFrameCoords,
    getSelectableFrameCoords,
    getSelectedFrameCoords,
  }
}
