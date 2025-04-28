// composables/useHeadingObserver.ts
import { onMounted, onUnmounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import useProgress from './useProgress'

export function useHeadingObserver() {
  const { progressIdentifiers } = useProgress()

  let observer: IntersectionObserver | null = null

  const observeHeadings = () => {
    // Select all heading elements
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')

    // Create Intersection Observer
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const heading = entry.target as HTMLElement
            const headingId = heading.id || heading.textContent?.replace(/\s+/g, '-').toLowerCase()
            console.log(`Heading in view: ${heading.tagName} - ${heading.textContent}`, headingId)

            // Optionally update progress with Supabase or local state
            if (headingId) {
              //progressIdentifiers.value.push(headingId)
              // Example: Update Supabase with viewed heading
              // supabase.from('progress').upsert({ user_id: user.id, heading_id: headingId })
            }
          }
        })
      },
      {
        root: null, // Use viewport as root
        rootMargin: '0px', // Margin around the viewport
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    )

    // Observe each heading
    headings.forEach((heading) => observer?.observe(heading))
  }

  onMounted(() => {
    // Delay to ensure DOM is fully rendered
    setTimeout(() => {
      observeHeadings()
    }, 750)
  })

  onUnmounted(() => {
    // Cleanup observer
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })

  return {
    progressIdentifiers,
  }
}