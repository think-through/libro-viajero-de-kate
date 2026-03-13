import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import '../styles/swiperDestinations.css'

interface SwiperSlide extends HTMLElement {
    progress: number
}

const setTranslate = (swiper: Swiper) => {
    swiper.slides.forEach((slide) => {
        const swiperSlide = slide as SwiperSlide
        const progress = swiperSlide.progress
        const rotate = progress * -24
        const translateY = Math.min(Math.abs(progress) * 160, 160)
        swiperSlide.style.transform = `rotate(${rotate}deg) translateY(${translateY}px)`
    })
}

const setTransition = (swiper: Swiper, speed: number) => {
    swiper.slides.forEach((slide) => {
        ;(slide as HTMLElement).style.transition = `transform ${speed}ms ease`
    })
}

const recenter = (swiper: Swiper) => {
    swiper.update()
    swiper.updateProgress()
    setTranslate(swiper)
}

const addClonesIfNeeded = (container: HTMLElement) => {
    const wrapper = container.querySelector('.swiper-wrapper')
    if (!wrapper) return 0

    const slides = wrapper.querySelectorAll('.swiper-slide')
    const originalCount = slides.length
    if (originalCount === 0) return 0

    const minSlides = 6
    if (originalCount < minSlides) {
        const needed = minSlides - originalCount
        for (let i = 0; i < needed; i++) {
            const clone = slides[i % originalCount].cloneNode(true) as HTMLElement
            wrapper.appendChild(clone)
        }
    }
    return originalCount
}

const addEventListenerToSlides = (container: HTMLElement) => {
    const wrapper = container.querySelector('.swiper-wrapper')
    if (!wrapper) return

    const slides = wrapper.querySelectorAll('.swiper-slide')
    slides.forEach((slide) => {
        const card = slide.querySelector('.card_favoritos')
        if (!card) return

        card.addEventListener('click', () => {
            const url = slide.getAttribute('data-slug')
            if (url) {
                window.location.href = `/blog-posts/${url}`
            }
        })
    })
}

export const initDestinationSwiper = (container: HTMLElement) => {
    const swiperElement = container.classList.contains('swiper-destinations')
        ? container
        : (container.querySelector('.swiper.swiper-destinations') as HTMLElement)

    if (!swiperElement) return null

    // Capture original count and add clones BEFORE Swiper initialization
    // to ensure the loop module calculates the correct offsets.
    const originalSlidesCount = addClonesIfNeeded(swiperElement)

    const swiper = new Swiper(swiperElement, {
        modules: [Navigation, Pagination, Autoplay],
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: (index, className) => {
                const isExtra =
                    index >= originalSlidesCount ? ' swiper-pagination-bullet-extra' : ''
                return `<span class="${className}${isExtra}"></span>`
            },
        },
        slidesPerView: 1.5,
        slidesPerGroup: 1,
        centeredSlides: true,
        spaceBetween: 160,
        grabCursor: true,
        loop: true,
        loopAddBlankSlides: true,
        watchSlidesProgress: true,
        on: {
            init(s) {
                recenter(s)
            },
            setTranslate(s) {
                setTranslate(s)
            },
            setTransition(s, speed) {
                setTransition(s, speed)
            },
            breakpoint(s) {
                recenter(s)
            },
            resize(s) {
                recenter(s)
            },
            slideChange(s) {
                // Manually sync active class for bullets when on a manual clone
                if (originalSlidesCount > 0) {
                    const realIndex = s.realIndex % originalSlidesCount
                    const bullets = s.pagination.bullets
                    bullets.forEach((bullet, i) => {
                        if (i === realIndex) {
                            bullet.classList.add('swiper-pagination-bullet-active')
                        } else if (i < originalSlidesCount) {
                            bullet.classList.remove('swiper-pagination-bullet-active')
                        }
                    })
                }
            },
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 60,
            },
            768: {
                slidesPerView: 1.5,
                spaceBetween: 60,
            },
            // ---- Desktop ----
            992: {
                slidesPerView: 1.5,
                spaceBetween: -100,
            },
            1200: {
                slidesPerView: 1.5,
                spaceBetween: -220,
            },
        },
    })

    addEventListenerToSlides(swiperElement)

    return swiper
}
