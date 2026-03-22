<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

const SKIN_BASE = 'https://skin.cubem.cn'

const loading = ref(true)
const userLabel = ref<string | null>(null)
const avatarUrl = ref<string | null>(null)
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

/** Blessing Skin: https://blessing.netlify.app/api/avatars-and-previews */
function resolveAvatarUrl(user: Record<string, unknown>): string | null {
  const base = SKIN_BASE.replace(/\/$/, '')
  const abs = (v: unknown) => typeof v === 'string' && /^https?:\/\//.test(v)

  if (abs(user.avatar_url)) return user.avatar_url as string
  if (abs(user.avatar)) return user.avatar as string

  if (typeof user.uid === 'number' && user.uid >= 0) {
    return `${base}/avatar/user/${user.uid}?size=64&png`
  }
  if (typeof user.avatar === 'number' && user.avatar > 0) {
    return `${base}/avatar/${user.avatar}?size=64&png`
  }
  return null
}

function onAvatarError() {
  avatarUrl.value = null
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
      avatarUrl.value = null
      return
    }
    const data = (await r.json()) as { authenticated?: boolean; user?: Record<string, unknown> }
    if (data.authenticated && data.user) {
      userLabel.value = displayName(data.user)
      avatarUrl.value = resolveAvatarUrl(data.user)
    } else {
      userLabel.value = null
      avatarUrl.value = null
    }
  } catch {
    userLabel.value = null
    avatarUrl.value = null
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
        <span
          v-if="avatarUrl"
          class="skin-auth-nav__avatar-wrap"
          aria-hidden="true"
        >
          <img
            class="skin-auth-nav__avatar"
            :src="avatarUrl"
            :alt="userLabel"
            loading="lazy"
            decoding="async"
            referrerpolicy="no-referrer"
            @error="onAvatarError"
          />
        </span>
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
  padding-left: 0;
  font-size: var(--vp-nav-font-size, 14px);
  white-space: nowrap;
}

/* 与 VPNavBar 里 appearance / social-links 之间的竖线一致 */
.skin-auth-nav::before {
  content: '';
  flex-shrink: 0;
  width: 1px;
  height: 24px;
  margin-left: 16px;
  margin-right: 8px;
  background-color: var(--vp-c-divider);
}

.skin-auth-nav__muted {
  color: var(--vp-c-text-3);
}

/* 外层圆形容器：裁切方形图源，暗色下用与导航一致的底色避免「缺角」发灰/发白 */
.skin-auth-nav__avatar-wrap {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--vp-nav-bg-color, var(--vp-c-bg-soft));
  box-shadow: 0 0 0 1px var(--vp-c-divider);
}

.skin-auth-nav__avatar {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  border-radius: 50%;
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
