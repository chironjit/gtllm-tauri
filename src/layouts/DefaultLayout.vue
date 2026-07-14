<script setup lang="ts">
import {
  BarChart3,
  Check,
  ChevronDown,
  Code2,
  Image,
  type LucideIcon,
  MessageSquare,
  Mic,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Settings,
  Sun,
  Video,
} from '@lucide/vue'
import { onClickOutside } from '@vueuse/core'
import { computed, ref } from 'vue'
import { themes, useTheme } from '../composables/useTheme'

const { theme, lightThemes, darkThemes, isDark, setTheme, toggleDark } = useTheme()

const currentTheme = computed(() => themes.find((t) => t.name === theme.value) ?? themes[0])

interface Thread {
  id: number
  title: string
  preview: string
  time: string
}

interface Section {
  id: string
  label: string
  icon: LucideIcon
  threads: Thread[]
}

const sections: Section[] = [
  {
    id: 'chat',
    label: 'Chat',
    icon: MessageSquare,
    threads: [
      { id: 1, title: 'Project brainstorm', preview: 'Let’s outline the roadmap…', time: '2m' },
      { id: 2, title: 'Bug triage', preview: 'The auth flow throws a 401…', time: '1h' },
      { id: 3, title: 'Weekly summary', preview: 'Recap of everything shipped…', time: '3h' },
      { id: 4, title: 'Onboarding notes', preview: 'Steps for new team members…', time: '1d' },
    ],
  },
  {
    id: 'image',
    label: 'Image',
    icon: Image,
    threads: [
      { id: 1, title: 'Hero illustration', preview: 'Abstract gradient orb, soft…', time: '5m' },
      { id: 2, title: 'Icon set', preview: 'Line icons for the sidebar…', time: '2h' },
      { id: 3, title: 'Product mockups', preview: 'Dashboard on a laptop…', time: '1d' },
    ],
  },
  {
    id: 'voice',
    label: 'Voice',
    icon: Mic,
    threads: [
      { id: 1, title: 'Meeting notes', preview: 'Transcribed standup audio…', time: '20m' },
      { id: 2, title: 'Podcast draft', preview: 'Intro narration take 3…', time: '4h' },
    ],
  },
  {
    id: 'video',
    label: 'Video',
    icon: Video,
    threads: [
      { id: 1, title: 'Demo walkthrough', preview: 'Screen recording script…', time: '10m' },
      { id: 2, title: 'Launch teaser', preview: '15s cut for social…', time: '6h' },
    ],
  },
  {
    id: 'code',
    label: 'Code',
    icon: Code2,
    threads: [
      { id: 1, title: 'Refactor layout', preview: 'Extract sidebar component…', time: '1m' },
      { id: 2, title: 'Theme tokens', preview: 'Wire oklch vars to Tailwind…', time: '30m' },
      { id: 3, title: 'API client', preview: 'Add retry + backoff logic…', time: '2d' },
    ],
  },
]

const firstSection = sections[0] as Section

const collapsed = ref(false)
const activeSectionId = ref(firstSection.id)
const activeThreadId = ref<number | null>(firstSection.threads[0]?.id ?? null)
const showThemeMenu = ref(false)
const themeMenuRef = ref<HTMLElement | null>(null)

onClickOutside(themeMenuRef, () => {
  showThemeMenu.value = false
})

const activeSection = computed<Section>(
  () => sections.find((s) => s.id === activeSectionId.value) ?? firstSection,
)

function selectSection(id: string) {
  activeSectionId.value = id
  if (collapsed.value) collapsed.value = false
}

function pickTheme(name: (typeof themes)[number]['name']) {
  setTheme(name)
  showThemeMenu.value = false
}
</script>

<template>
  <div class="flex h-screen w-full overflow-hidden bg-base-200 text-base-content">
    <!-- ============ Sidebar ============ -->
    <aside
      class="flex h-full shrink-0 gap-0 p-3 transition-[width] duration-300 ease-out"
      :class="collapsed ? 'w-[76px]' : 'w-[320px]'"
    >
      <!-- Icon rail -->
      <div
        class="flex w-[52px] shrink-0 flex-col items-center gap-2 rounded-2xl bg-base-100 py-3 ring-1 ring-base-content/10"
      >
        <!-- Brand -->
        <div
          class="mb-2 flex size-9 items-center justify-center rounded-xl bg-primary text-primary-content"
        >
          <BarChart3 class="size-5" :stroke-width="2" />
        </div>

        <button
          v-for="section in sections"
          :key="section.id"
          type="button"
          class="group relative flex size-10 items-center justify-center rounded-xl transition-colors"
          :class="
            activeSectionId === section.id
              ? 'bg-primary text-primary-content'
              : 'text-base-content/60 hover:bg-primary/15 hover:text-base-content'
          "
          :aria-label="section.label"
          @click="selectSection(section.id)"
        >
          <component :is="section.icon" class="size-5" :stroke-width="1.75" />

          <span
            v-if="activeSectionId === section.id"
            class="absolute -left-3 h-5 w-1 rounded-full bg-primary"
          />
        </button>

        <!-- Settings pinned to bottom -->
        <button
          type="button"
          class="mt-auto flex size-10 items-center justify-center rounded-xl text-base-content/60 transition-colors hover:bg-primary/15 hover:text-base-content"
          aria-label="Settings"
        >
          <Settings class="size-5" :stroke-width="1.75" />
        </button>
      </div>

      <!-- Threads card (hidden when collapsed) -->
      <div
        v-show="!collapsed"
        class="ml-3 flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl bg-base-100 ring-1 ring-base-content/10"
      >
        <div class="flex items-center justify-between px-4 py-3.5">
          <h2 class="truncate text-sm font-semibold">{{ activeSection.label }}</h2>
          <button
            type="button"
            class="flex size-7 items-center justify-center rounded-lg text-base-content/60 transition-colors hover:bg-primary/15 hover:text-base-content"
            aria-label="New thread"
          >
            <Plus class="size-4.5" :stroke-width="2" />
          </button>
        </div>

        <div class="flex-1 space-y-1 overflow-y-auto px-2 pb-3">
          <button
            v-for="thread in activeSection.threads"
            :key="thread.id"
            type="button"
            class="flex w-full flex-col gap-0.5 rounded-xl px-3 py-2.5 text-left transition-colors"
            :class="
              activeThreadId === thread.id
                ? 'bg-primary/15 text-primary'
                : 'hover:bg-base-200'
            "
            @click="activeThreadId = thread.id"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="truncate text-sm font-medium">{{ thread.title }}</span>
              <span class="shrink-0 text-[11px] text-base-content/50">{{ thread.time }}</span>
            </div>
            <span class="truncate text-xs text-base-content/60">{{ thread.preview }}</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- ============ Main column ============ -->
    <div class="flex min-w-0 flex-1 flex-col py-3 pr-3">
      <!-- Navbar -->
      <header
        class="flex items-center gap-2 rounded-2xl bg-base-100 px-3 py-2.5 ring-1 ring-base-content/10"
      >
        <!-- Collapse toggle -->
        <button
          type="button"
          class="flex size-9 items-center justify-center rounded-xl text-base-content/70 transition-colors hover:bg-primary/15 hover:text-base-content"
          :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
          @click="collapsed = !collapsed"
        >
          <component :is="collapsed ? PanelLeftOpen : PanelLeftClose" class="size-5" :stroke-width="1.75" />
        </button>

        <h1 class="truncate text-base font-semibold">{{ activeSection.label }}</h1>

        <div class="ml-auto flex items-center gap-1.5">
          <!-- Theme selector -->
          <div ref="themeMenuRef" class="relative">
            <button
              type="button"
              class="flex h-9 items-center gap-2 rounded-xl px-2.5 text-sm text-base-content/80 transition-colors hover:bg-primary/15 hover:text-base-content"
              aria-label="Select theme"
              aria-haspopup="listbox"
              :aria-expanded="showThemeMenu"
              @click="showThemeMenu = !showThemeMenu"
            >
              <span class="flex shrink-0 items-center gap-1">
                <span
                  v-for="(c, i) in currentTheme.swatches"
                  :key="i"
                  class="size-3 rounded-[3px] ring-1 ring-base-content/10"
                  :style="{ backgroundColor: c }"
                />
              </span>
              <span class="hidden font-medium sm:inline">{{ currentTheme.label }}</span>
              <ChevronDown
                class="size-4 shrink-0 text-base-content/50 transition-transform"
                :class="showThemeMenu ? 'rotate-180' : ''"
                :stroke-width="2"
              />
            </button>

            <Transition name="fade">
              <div
                v-if="showThemeMenu"
                role="listbox"
                class="absolute right-0 top-11 z-20 w-60 rounded-2xl bg-base-100 p-2 shadow-xl ring-1 ring-base-content/10"
              >
                <p class="px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wide text-base-content/40">
                  Light
                </p>
                <button
                  v-for="t in lightThemes"
                  :key="t.name"
                  type="button"
                  role="option"
                  :aria-selected="theme === t.name"
                  class="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left text-sm transition-colors"
                  :class="theme === t.name ? 'bg-primary/15 font-medium text-primary' : 'hover:bg-base-200'"
                  @click="pickTheme(t.name)"
                >
                  <span class="flex shrink-0 items-center gap-1">
                    <span
                      v-for="(c, i) in t.swatches"
                      :key="i"
                      class="size-3 rounded-[3px] ring-1 ring-base-content/10"
                      :style="{ backgroundColor: c }"
                    />
                  </span>
                  <span class="flex-1 truncate">{{ t.label }}</span>
                  <Check v-if="theme === t.name" class="size-4 shrink-0" :stroke-width="2.5" />
                </button>

                <p class="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-base-content/40">
                  Dark
                </p>
                <button
                  v-for="t in darkThemes"
                  :key="t.name"
                  type="button"
                  role="option"
                  :aria-selected="theme === t.name"
                  class="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left text-sm transition-colors"
                  :class="theme === t.name ? 'bg-primary/15 font-medium text-primary' : 'hover:bg-base-200'"
                  @click="pickTheme(t.name)"
                >
                  <span class="flex shrink-0 items-center gap-1">
                    <span
                      v-for="(c, i) in t.swatches"
                      :key="i"
                      class="size-3 rounded-[3px] ring-1 ring-base-content/10"
                      :style="{ backgroundColor: c }"
                    />
                  </span>
                  <span class="flex-1 truncate">{{ t.label }}</span>
                  <Check v-if="theme === t.name" class="size-4 shrink-0" :stroke-width="2.5" />
                </button>
              </div>
            </Transition>
          </div>

          <!-- Light / dark toggle -->
          <button
            type="button"
            class="flex size-9 items-center justify-center rounded-xl text-base-content/70 transition-colors hover:bg-primary/15 hover:text-base-content"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleDark()"
          >
            <Sun v-if="isDark" class="size-5" :stroke-width="1.75" />
            <Moon v-else class="size-5" :stroke-width="1.75" />
          </button>

          <!-- Settings -->
          <button
            type="button"
            class="flex size-9 items-center justify-center rounded-xl text-base-content/70 transition-colors hover:bg-primary/15 hover:text-base-content"
            aria-label="Settings"
          >
            <Settings class="size-5" :stroke-width="1.75" />
          </button>
        </div>
      </header>

      <!-- Content -->
      <main class="mt-3 flex-1 overflow-y-auto rounded-2xl bg-base-100 p-6 ring-1 ring-base-content/10">
        <div class="flex h-full flex-col items-center justify-center gap-3 text-center">
          <div class="flex size-16 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <component :is="activeSection.icon" class="size-8" :stroke-width="1.5" />
          </div>
          <h2 class="text-xl font-semibold">{{ activeSection.label }} workspace</h2>
          <p class="max-w-sm text-sm text-base-content/60">
            Select a thread from the sidebar to get started, or create a new one.
          </p>
        </div>
      </main>
    </div>
  </div>
</template>
