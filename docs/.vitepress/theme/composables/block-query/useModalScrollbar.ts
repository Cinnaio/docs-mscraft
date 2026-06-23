import { ref } from 'vue'

export function useModalScrollbar(onScrollUpdate?: () => void) {
  const modalScrollRef = ref<HTMLElement | null>(null)
  const modalScrollbarRef = ref<HTMLElement | null>(null)
  const modalThumbTop = ref(0)
  const modalThumbHeight = ref(0)
  const isDraggingModalThumb = ref(false)
  let modalThumbDragStartY = 0
  let modalThumbDragStartScrollTop = 0

  function updateModalScrollbar() {
    onScrollUpdate?.()

    const scrollEl = modalScrollRef.value
    const trackEl = modalScrollbarRef.value
    if (!scrollEl || !trackEl) return

    const maxScrollTop = scrollEl.scrollHeight - scrollEl.clientHeight
    if (maxScrollTop <= 0) {
      modalThumbTop.value = 0
      modalThumbHeight.value = 0
      return
    }

    const trackHeight = trackEl.clientHeight
    const thumbHeight = Math.max(44, (scrollEl.clientHeight / scrollEl.scrollHeight) * trackHeight)
    const maxThumbTop = Math.max(0, trackHeight - thumbHeight)

    modalThumbHeight.value = thumbHeight
    modalThumbTop.value = (scrollEl.scrollTop / maxScrollTop) * maxThumbTop
  }

  function resetModalScrollbar() {
    modalThumbTop.value = 0
    modalThumbHeight.value = 0
  }

  function onModalTrackPointerDown(event: PointerEvent) {
    if (event.target !== modalScrollbarRef.value) return

    const scrollEl = modalScrollRef.value
    const trackEl = modalScrollbarRef.value
    if (!scrollEl || !trackEl || modalThumbHeight.value <= 0) return

    const rect = trackEl.getBoundingClientRect()
    const targetTop = event.clientY - rect.top - modalThumbHeight.value / 2
    const maxThumbTop = Math.max(1, rect.height - modalThumbHeight.value)
    const maxScrollTop = scrollEl.scrollHeight - scrollEl.clientHeight

    scrollEl.scrollTop = (Math.min(Math.max(targetTop, 0), maxThumbTop) / maxThumbTop) * maxScrollTop
    updateModalScrollbar()
  }

  function onModalThumbPointerDown(event: PointerEvent) {
    const scrollEl = modalScrollRef.value
    if (!scrollEl) return

    isDraggingModalThumb.value = true
    modalThumbDragStartY = event.clientY
    modalThumbDragStartScrollTop = scrollEl.scrollTop
    document.addEventListener('pointermove', onModalThumbPointerMove)
    document.addEventListener('pointerup', stopModalThumbDrag, { once: true })
    document.addEventListener('pointercancel', stopModalThumbDrag, { once: true })
  }

  function onModalThumbPointerMove(event: PointerEvent) {
    const scrollEl = modalScrollRef.value
    const trackEl = modalScrollbarRef.value
    if (!isDraggingModalThumb.value || !scrollEl || !trackEl) return

    const maxScrollTop = scrollEl.scrollHeight - scrollEl.clientHeight
    const maxThumbTop = Math.max(1, trackEl.clientHeight - modalThumbHeight.value)
    const deltaY = event.clientY - modalThumbDragStartY

    scrollEl.scrollTop = modalThumbDragStartScrollTop + (deltaY / maxThumbTop) * maxScrollTop
    updateModalScrollbar()
  }

  function stopModalThumbDrag() {
    isDraggingModalThumb.value = false
    document.removeEventListener('pointermove', onModalThumbPointerMove)
    document.removeEventListener('pointercancel', stopModalThumbDrag)
  }

  return {
    modalScrollRef,
    modalScrollbarRef,
    modalThumbTop,
    modalThumbHeight,
    isDraggingModalThumb,
    updateModalScrollbar,
    resetModalScrollbar,
    onModalTrackPointerDown,
    onModalThumbPointerDown,
    stopModalThumbDrag,
  }
}
