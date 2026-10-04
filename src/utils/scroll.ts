export function getPageScrollTop() {
  const root = document.getElementById('root')

  return Math.max(
    window.scrollY,
    document.scrollingElement?.scrollTop ?? 0,
    root?.scrollTop ?? 0,
  )
}

export function scrollPageToTop() {
  const root = document.getElementById('root')
  const scrollingElement = document.scrollingElement
  const options: ScrollToOptions = { top: 0, behavior: 'smooth' }

  window.scrollTo(options)
  if (root && root.scrollTop > 0) root.scrollTo(options)
  if (scrollingElement && scrollingElement.scrollTop > 0) scrollingElement.scrollTo(options)
}