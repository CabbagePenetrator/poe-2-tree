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

  const skills = {
    spell_damage_and_mana: { x: 924, y: 196 },
    accuracy: { x: 560, y: 170 },
    armour_and_evasion: { x: 170, y: 12 },
    attack_damage: { x: 196, y: 248 },
  }

  const getCoordsForSkill = (skill) => {
    return skills[skill]
  }

  return {
    sprite,
    getCoordsForSkill,
  }
}
