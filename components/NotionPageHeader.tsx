import type * as types from 'notion-types'
import { IoClose } from '@react-icons/all-files/io5/IoClose'
import { IoMenu } from '@react-icons/all-files/io5/IoMenu'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import cs from 'classnames'
import * as React from 'react'
import { Breadcrumbs, Header, Search, useNotionContext } from 'react-notion-x'

import { isSearchEnabled, navigationLinks, navigationStyle } from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'

import styles from './styles.module.css'

function ToggleThemeButton() {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = React.useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <div
      className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
      onClick={onToggleTheme}
    >
      {hasMounted && isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
    </div>
  )
}

function MobileNavigation({ block }: { block: types.CollectionViewPageBlock | types.PageBlock }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { components, mapPageUrl } = useNotionContext()
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    console.log('Toggle menu clicked, current state:', isMenuOpen)
    setIsMenuOpen(!isMenuOpen)
  }
  const closeMenu = () => setIsMenuOpen(false)

  // Close menu when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isMenuOpen])

  console.log('MobileNavigation render - isMenuOpen:', isMenuOpen, 'navigationLinks:', navigationLinks)

  return (
    <div className={styles.mobileNav} ref={dropdownRef}>
      <button 
        className={styles.hamburgerButton}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? <IoClose /> : <IoMenu />}
      </button>

      {isMenuOpen && (
        <div 
          className={styles.mobileDropdown}
          style={{
            display: 'block',
            position: 'absolute',
            top: '100%',
            right: 0,
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            minWidth: '200px',
            zIndex: 9999,
            padding: '0.5rem 0',
            marginTop: '0.5rem'
          }}
        >
          {navigationLinks?.map((link, index) => {
            if (!link?.pageId && !link?.url) {
              return null
            }

            if (link.pageId) {
              return (
                <components.PageLink
                  href={mapPageUrl(link.pageId)}
                  key={index}
                  className={styles.mobileNavLink}
                  onClick={closeMenu}
                >
                  {link.title}
                </components.PageLink>
              )
            } else {
              return (
                <components.Link
                  href={link.url}
                  key={index}
                  className={styles.mobileNavLink}
                  onClick={closeMenu}
                >
                  {link.title}
                </components.Link>
              )
            }
          }).filter(Boolean)}
          
          <div className={styles.mobileNavActions}>
            <ToggleThemeButton />
            {isSearchEnabled && (
              <div className={styles.mobileSearch}>
                <Search block={block} title={null} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function NotionPageHeader({
  block
}: {
  block: types.CollectionViewPageBlock | types.PageBlock
}) {
  const { components, mapPageUrl } = useNotionContext()

  if (navigationStyle === 'default') {
    return <Header block={block} />
  }

  return (
    <header className='notion-header'>
      <div className='notion-nav-header'>
        <Breadcrumbs block={block} rootOnly={true} />

        {/* Desktop Navigation */}
        <div className={cs('notion-nav-header-rhs breadcrumbs', styles.desktopNav)}>
          {navigationLinks
            ?.map((link, index) => {
              if (!link?.pageId && !link?.url) {
                return null
              }

              if (link.pageId) {
                return (
                  <components.PageLink
                    href={mapPageUrl(link.pageId)}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.PageLink>
                )
              } else {
                return (
                  <components.Link
                    href={link.url}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.Link>
                )
              }
            })
            .filter(Boolean)}

          <ToggleThemeButton />

          {isSearchEnabled && <Search block={block} title={null} />}
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation block={block} />
      </div>
    </header>
  )
}
