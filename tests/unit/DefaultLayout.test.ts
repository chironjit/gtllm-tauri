import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed, ref } from 'vue'
import { useTheme } from '../../src/composables/useTheme'
import DefaultLayout from '../../src/layouts/DefaultLayout.vue'

const lightFixture = {
  name: 'light' as const,
  label: 'Light',
  mode: 'light' as const,
  swatches: ['#111', '#222', '#333'] as [string, string, string],
}
const darkFixture = {
  name: 'dark' as const,
  label: 'Dark',
  mode: 'dark' as const,
  swatches: ['#444', '#555', '#666'] as [string, string, string],
}

vi.mock('../../src/composables/useTheme', () => ({
  useTheme: vi.fn(),
  themes: [
    {
      name: 'light',
      label: 'Light',
      mode: 'light',
      swatches: ['#111', '#222', '#333'],
    },
    {
      name: 'dark',
      label: 'Dark',
      mode: 'dark',
      swatches: ['#444', '#555', '#666'],
    },
  ],
}))

function mockTheme(overrides: Partial<ReturnType<typeof useTheme>> = {}) {
  const base = {
    theme: ref('light'),
    themes: [lightFixture, darkFixture],
    lightThemes: computed(() => [lightFixture]),
    darkThemes: computed(() => [darkFixture]),
    isDark: computed(() => false),
    setTheme: vi.fn(),
    toggleDark: vi.fn(),
  }
  vi.mocked(useTheme).mockReturnValue({
    ...base,
    ...overrides,
  } as ReturnType<typeof useTheme>)
  return base
}

describe('DefaultLayout', () => {
  beforeEach(() => {
    mockTheme()
  })

  it('renders a nav button for each sidebar section', () => {
    const wrapper = mount(DefaultLayout)
    expect(wrapper.find('[aria-label="Chat"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Code"]').exists()).toBe(true)
  })

  it('shows "Switch to dark mode" label when in light mode', () => {
    mockTheme({ isDark: computed(() => false) })
    const wrapper = mount(DefaultLayout)
    expect(wrapper.find('[aria-label="Switch to dark mode"]').exists()).toBe(true)
  })

  it('shows "Switch to light mode" label when in dark mode', () => {
    mockTheme({ isDark: computed(() => true) })
    const wrapper = mount(DefaultLayout)
    expect(wrapper.find('[aria-label="Switch to light mode"]').exists()).toBe(true)
  })

  it('calls toggleDark when the mode toggle is clicked', async () => {
    const toggleDark = vi.fn()
    mockTheme({ toggleDark })
    const wrapper = mount(DefaultLayout)
    await wrapper.find('[aria-label="Switch to dark mode"]').trigger('click')
    expect(toggleDark).toHaveBeenCalled()
  })

  it('collapses and expands the sidebar', async () => {
    const wrapper = mount(DefaultLayout)
    const aside = wrapper.find('aside')
    expect(aside.classes()).toContain('w-[320px]')
    await wrapper.find('[aria-label="Collapse sidebar"]').trigger('click')
    expect(aside.classes()).toContain('w-[76px]')
  })
})
