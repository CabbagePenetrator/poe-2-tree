import { ref } from 'vue'

export function useSkillsSprite() {
  const sprite = ref(null)

  if (!sprite.value) {
    const image = new Image()

    image.src = '/skills.webp'

    image.onload = () => {
      sprite.value = image
    }
  }

  const getSkillCoords = () => {
    return { x: 924, y: 196 }
  }

  return {
    sprite,
    getSkillCoords,
  }
}
