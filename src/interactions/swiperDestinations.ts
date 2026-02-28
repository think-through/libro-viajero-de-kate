import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'

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

const addClonesForLoopMode = (swiper: Swiper, container: HTMLElement) => {
    const wrapper = container.querySelector('.swiper-wrapper')
    if (!wrapper) return

    const slides = wrapper.querySelectorAll('.swiper-slide')
    const slidesPerView =
        typeof swiper.params.slidesPerView === 'number' ? swiper.params.slidesPerView : 1.5
    const slidesPerGroup =
        typeof swiper.params.slidesPerGroup === 'number' ? swiper.params.slidesPerGroup : 1

    const notEnoughSlidesForLoopMode = slides.length <= slidesPerView * 2 + slidesPerGroup

    if (notEnoughSlidesForLoopMode) {
        const needed = Math.ceil(slidesPerView * 2)
        for (let i = 0; i < needed; i++) {
            const clone = slides[i % slides.length].cloneNode(true) as HTMLElement
            wrapper.appendChild(clone)
        }
        swiper.update()
    }
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

    const swiper = new Swiper(swiperElement, {
        modules: [Navigation, Pagination, Autoplay],
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
        },
        breakpoints: {
            0: {
                slidesPerView: 1.5,
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

    addClonesForLoopMode(swiper, swiperElement)
    addEventListenerToSlides(swiperElement)

    return swiper
}
