<script setup lang="ts">
import { useNavigatorLanguage } from '@vueuse/core'
import { computed, onMounted, shallowRef, useTemplateRef, watchEffect } from 'vue'
import { useData } from 'vitepress'

const { theme, page, lang: pageLang } = useData()
const { language: browserLang } = useNavigatorLanguage()

const timeRef = useTemplateRef('timeRef')

const date = computed(() => new Date(page.value.lastUpdated!))
const isoDatetime = computed(() => date.value.toISOString())
const datetime = shallowRef('')

const updatedBy = computed(() => {
  return (page.value as any).lastUpdatedBy as string | undefined
})

const updatedByAvatar = computed(() => {
  return (page.value as any).lastUpdatedAvatar as string | undefined
})

// Set time on mounted hook to avoid hydration mismatch due to
// potential differences in timezones of the server and the clients
onMounted(() => {
  watchEffect(() => {
    const lang = theme.value.lastUpdated?.formatOptions?.forceLocale
      ? pageLang.value
      : browserLang.value

    datetime.value = new Intl.DateTimeFormat(
      lang,
      theme.value.lastUpdated?.formatOptions ?? {
        dateStyle: 'medium',
        timeStyle: 'medium',
      }
    ).format(date.value)

    if (lang && pageLang.value !== lang) {
      timeRef.value?.setAttribute('lang', lang)
    } else {
      timeRef.value?.removeAttribute('lang')
    }
  })
})

</script>

<template>
  <div class="VPLastUpdated">
    <div class="VPLastUpdatedRow">
      <span class="VPLastUpdatedLabel">
        {{ theme.lastUpdated?.text || theme.lastUpdatedText || 'Last updated' }}:
      </span>
      <time
        class="VPLastUpdatedValue"
        :datetime="isoDatetime"
        ref="timeRef"
      >
        {{ datetime }}
      </time>
    </div>

    <div v-if="updatedBy" class="VPLastUpdatedRow">
      <span class="VPLastUpdatedLabel">
        {{ theme.lastUpdatedBy?.text || 'Updated by' }}:
      </span>
      <span class="VPLastUpdatedValue VPLastUpdatedByValue">
        <img
          v-if="updatedByAvatar"
          class="VPLastUpdatedAvatar"
          :src="updatedByAvatar"
          alt=""
          loading="lazy"
          decoding="async"
          referrerpolicy="no-referrer"
        />
        <span>{{ updatedBy }}</span>
      </span>
    </div>
  </div>
</template>

<style>
.VPLastUpdated {
  display: flex;
  flex-direction: column;
  /* Mobile first: 文档页脚在移动端是上下布局，左对齐更自然 */
  align-items: flex-start;
  justify-content: center;
  text-align: left;
}

.VPLastUpdatedRow {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.VPLastUpdatedValue {
  color: inherit;
}

.VPLastUpdatedByValue {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
}

.VPLastUpdatedAvatar {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  flex: none;
  box-shadow: 0 0 0 1px var(--vp-c-divider);
}

@media (min-width: 640px) {
  .VPLastUpdated {
    min-height: 32px;
    align-items: flex-end;
    text-align: right;
  }

  .VPLastUpdatedRow {
    line-height: 32px;
    justify-content: flex-end;
  }

  .VPLastUpdatedByValue {
    justify-content: flex-end;
  }
}
</style>

