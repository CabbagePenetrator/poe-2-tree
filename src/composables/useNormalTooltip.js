import { computed, ref } from 'vue'

export function useNormalTooltip() {
  const leftImage = ref(null)
  const leftImageWidth = 44

  const rightImage = ref(null)
  const rightImageWidth = 44

  const middleImage = ref(null)

  const headerHeight = 54

  if (!leftImage.value) {
    const image = new Image()

    image.src = '/header-double-normal-left.webp'

    image.onload = () => {
      leftImage.value = image
    }
  }

  if (!middleImage.value) {
    const image = new Image()

    image.src = '/header-double-normal-middle.webp'

    image.onload = () => {
      middleImage.value = image
    }
  }

  if (!rightImage.value) {
    const image = new Image()

    image.src = '/header-double-normal-right.webp'

    image.onload = () => {
      rightImage.value = image
    }
  }

  const getTooltipWidth = (node) => {
    const baseWidth = 200

    const nameLength = node.name.length
    const nameWidth = nameLength * 7

    const longestStat = node.stats.reduce(
      (longest, current) =>
        current.length > longest.length ? current : longest,
      '',
    )
    const statWidth = Math.max(0, (longestStat.length - 29) * 8)

    const maxWidth = Math.max(nameWidth, statWidth)

    return baseWidth + maxWidth
  }

  const getTooltipHeight = (stats) => {
    let baseHeight = 20

    stats.forEach(() => {
      baseHeight += 20
    })

    return baseHeight
  }

  return {
    leftImage,
    leftImageWidth,
    middleImage,
    rightImage,
    rightImageWidth,
    headerHeight,
    getTooltipWidth,
    getTooltipHeight,
  }
}
