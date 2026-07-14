import { useStorage } from '@vueuse/core'
import { computed, watch } from 'vue'

export type ThemeMode = 'light' | 'dark'

export type ThemeName =
  // light
  | 'light'
  | 'pastel'
  | 'winter'
  | 'nord'
  // dark
  | 'dark'
  | 'dim'
  | 'dracula'
  | 'midnight'

export interface ThemeOption {
  name: ThemeName
  label: string
  mode: ThemeMode
  /** Swatches shown in the picker: [primary, secondary, accent]. */
  swatches: [string, string, string]
}

export const themes: ThemeOption[] = [
  // ---- Light ----
  {
    name: 'light',
    label: 'Light',
    mode: 'light',
    swatches: ['oklch(45% 0.24 277.023)', 'oklch(65% 0.241 354.308)', 'oklch(77% 0.152 181.912)'],
  },
  {
    name: 'pastel',
    label: 'Pastel',
    mode: 'light',
    swatches: ['oklch(90% 0.063 306.703)', 'oklch(89% 0.058 10.001)', 'oklch(90% 0.093 164.15)'],
  },
  {
    name: 'winter',
    label: 'Winter',
    mode: 'light',
    swatches: [
      'oklch(56.86% 0.255 257.57)',
      'oklch(42.551% 0.161 282.339)',
      'oklch(59.939% 0.191 335.171)',
    ],
  },
  {
    name: 'nord',
    label: 'Nord',
    mode: 'light',
    swatches: [
      'oklch(59.435% 0.077 254.027)',
      'oklch(69.651% 0.059 248.687)',
      'oklch(77.464% 0.062 217.469)',
    ],
  },
  // ---- Dark ----
  {
    name: 'dark',
    label: 'Dark',
    mode: 'dark',
    swatches: ['oklch(58% 0.233 277.117)', 'oklch(65% 0.241 354.308)', 'oklch(77% 0.152 181.912)'],
  },
  {
    name: 'dim',
    label: 'Dim',
    mode: 'dark',
    swatches: [
      'oklch(86.133% 0.141 139.549)',
      'oklch(73.375% 0.165 35.353)',
      'oklch(74.229% 0.133 311.379)',
    ],
  },
  {
    name: 'dracula',
    label: 'Dracula',
    mode: 'dark',
    swatches: [
      'oklch(75.461% 0.183 346.812)',
      'oklch(74.202% 0.148 301.883)',
      'oklch(83.392% 0.124 66.558)',
    ],
  },
  {
    name: 'midnight',
    label: 'Midnight',
    mode: 'dark',
    swatches: [
      'oklch(75.351% 0.138 232.661)',
      'oklch(68.011% 0.158 276.934)',
      'oklch(72.36% 0.176 350.048)',
    ],
  },
]

const themeByName = new Map(themes.map((t) => [t.name, t]))

const DEFAULT_LIGHT: ThemeName = 'light'
const DEFAULT_DARK: ThemeName = 'dark'

// Shared, persisted state so the whole app stays in sync.
const theme = useStorage<ThemeName>('gtllm-theme', DEFAULT_LIGHT)
// Remember the last theme chosen in each mode so the light/dark toggle
// can restore the user's preferred palette instead of a hardcoded one.
const lastLight = useStorage<ThemeName>('gtllm-theme-light', DEFAULT_LIGHT)
const lastDark = useStorage<ThemeName>('gtllm-theme-dark', DEFAULT_DARK)

function modeOf(name: ThemeName): ThemeMode {
  return themeByName.get(name)?.mode ?? 'light'
}

function applyTheme(name: ThemeName) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.setAttribute('data-theme', name)
  root.classList.toggle('dark', modeOf(name) === 'dark')
}

watch(theme, applyTheme, { immediate: true })

export function useTheme() {
  const isDark = computed(() => modeOf(theme.value) === 'dark')

  const lightThemes = computed(() => themes.filter((t) => t.mode === 'light'))
  const darkThemes = computed(() => themes.filter((t) => t.mode === 'dark'))

  function setTheme(name: ThemeName) {
    theme.value = name
    if (modeOf(name) === 'dark') lastDark.value = name
    else lastLight.value = name
  }

  function toggleDark() {
    setTheme(isDark.value ? lastLight.value : lastDark.value)
  }

  return { theme, themes, lightThemes, darkThemes, isDark, setTheme, toggleDark }
}
