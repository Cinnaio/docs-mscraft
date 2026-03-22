<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

const loading = ref(true)
const userLabel = ref<string | null>(null)
const oauthError = ref<string | null>(null)

const strings = computed(() => {
  const en = lang.value === 'en-US'
  return {
    login: en ? 'Sign in (skin)' : '使用皮肤站登录',
    logout: en ? 'Sign out' : '退出',
    loading: en ? '…' : '…',
    errorPrefix: en ? 'Login error: ' : '登录失败：',
  }
})

function displayName(user: Record<string, unknown>): string {
  const u =
    (typeof user.username === 'string' && user.username) ||
    (typeof user.name === 'string' && user.name) ||
    (typeof user.nickname === 'string' && user.nickname) ||
    ''
  return u || 'User'
}

onMounted(async () => {
  const params = new URLSearchParams(window.location.search)
  const err = params.get('oauth_error')
  if (err) {
    oauthError.value = err
    params.delete('oauth_error')
    const next = `${window.location.pathname}${params.toString() ? `?${params}` : ''}${window.location.hash}`
    window.history.replaceState({}, '', next)
  }

  try {
    const r = await fetch('/api/auth/me', { credentials: 'include' })
    if (!r.ok) {
      userLabel.value = null
      return
    }
    const data = (await r.json()) as { authenticated?: boolean; user?: Record<string, unknown> }
    if (data.authenticated && data.user) {
      userLabel.value = displayName(data.user)
    } else {
      userLabel.value = null
    }
  } catch {
    userLabel.value = null
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="skin-auth-nav" data-skin-auth>
    <span v-if="loading" class="skin-auth-nav__muted">{{ strings.loading }}</span>
    <template v-else>
      <span v-if="oauthError" class="skin-auth-nav__error" role="status">
        {{ strings.errorPrefix }}{{ oauthError }}
      </span>
      <template v-if="userLabel">
        <span class="skin-auth-nav__label">{{ userLabel }}</span>
        <a class="skin-auth-nav__link" href="/api/auth/logout">{{ strings.logout }}</a>
      </template>
      <a v-else class="skin-auth-nav__link" href="/api/auth/login">{{ strings.login }}</a>
    </template>
  </div>
</template>

<style scoped>
.skin-auth-nav {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 0.75rem;
  font-size: var(--vp-nav-font-size, 14px);
  white-space: nowrap;
}

.skin-auth-nav__muted {
  color: var(--vp-c-text-3);
}

.skin-auth-nav__label {
  color: var(--vp-c-text-2);
  max-width: 10rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.skin-auth-nav__error {
  color: var(--vp-c-danger-1);
  max-width: 14rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.skin-auth-nav__link {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.skin-auth-nav__link:hover {
  color: var(--vp-c-brand-2);
}
</style>
