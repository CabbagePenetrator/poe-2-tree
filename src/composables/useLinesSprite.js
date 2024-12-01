import { ref } from 'vue'

export function useLinesSprite() {
  const sprite = ref(null)

  if (!sprite.value) {
    const image = new Image()

    image.src = '/lines.webp'

    image.onload = () => {
      sprite.value = image
    }
  }

  const getNormalLineCoords = () => {
    return { x: 0, y: 384 }
  }

  const getSelectableLineCoords = () => {
    return { x: 0, y: 752 }
  }

  const getSelectedLineCoords = () => {
    return { x: 0, y: 14 }
  }

  return {
    sprite,
    getNormalLineCoords,
    getSelectableLineCoords,
    getSelectedLineCoords,
  }
}
