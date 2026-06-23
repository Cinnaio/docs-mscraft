import { nextTick, onMounted, onUnmounted, ref, type Ref } from 'vue'
import type { BlockEntry } from '../../data/block-query'

export function useBlockDetailModal(onOpen?: () => void, onClose?: () => void) {
  const selectedBlock = ref<BlockEntry | null>(null)

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && selectedBlock.value) {
      closeDetail()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', onKeyDown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', onKeyDown)
    document.body.style.overflow = ''
  })

  function selectBlock(block: BlockEntry) {
    selectedBlock.value = block
    document.body.style.overflow = 'hidden'
    nextTick(onOpen)
  }

  function closeDetail() {
    selectedBlock.value = null
    document.body.style.overflow = ''
    onClose?.()
  }

  return {
    selectedBlock: selectedBlock as Ref<BlockEntry | null>,
    selectBlock,
    closeDetail,
  }
}
