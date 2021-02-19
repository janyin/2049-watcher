import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Container from './container'

export default function Footer() {
  const [isMounted, setIsMounted] = useState(false)
  const [themeMode, setThemeMode] = useState('system')
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const themeSetting = localStorage.getItem('themeSetting')

    if (!themeSetting) {
      localStorage.setItem('themeSetting', 'system')
    } else {
      setThemeMode(themeSetting)
    }
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
        const newTheme = e.matches ? 'dark' : 'light'
        const themeSetting = localStorage.getItem('themeSetting')

        localStorage.setItem('systemTheme', newTheme)
        if (themeSetting && themeSetting === 'system') {
          setTheme(newTheme)
        }
      })
    }
  }, [isMounted])

  const handleChange = (e) => {
    localStorage.setItem('themeSetting', e.target.value)
    setThemeMode(e.target.value)
    if (e.target.value !== 'system') {
      setTheme(e.target.value)
    } else {
      setTheme(localStorage.getItem('systemTheme') || 'light')
    }
  }

  return (
    <footer className="bg-accent-1 border-t border-accent-2 dark:bg-dark-1 dark:border-gray-500">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Statically Generated with Next.js.
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://github.com/janyin/2049-watcher"
              className="mx-3 rounded bg-black dark:bg-white dark:text-black dark:border-white dark:hover:bg-black dark:hover:text-white hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              View on GitHub
            </a>
          </div>
          <select
            value={themeMode}
            onChange={handleChange}
            className="p-1 border rounded border-black dark:text-black"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </Container>
    </footer>
  )
}
