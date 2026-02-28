import Swiper from 'swiper'
import 'swiper/css'

export const initLatestPostsSwiper = (container: HTMLElement) => {
    const swiperElement = container.classList.contains('tr-wrap')
        ? container
        : (container.querySelector('.swiper.tr-wrap') as HTMLElement)

    if (!swiperElement) return null

    const swiper = new Swiper(swiperElement, {
        slidesPerView: 1.5,
        slidesPerGroup: 1,
        grabCursor: true,
        spaceBetween: 10,
        breakpoints: {
            767: {
                slidesPerView: 2.5,
                slidesPerGroup: 2,
            },
            1440: {
                slidesPerView: 3.5,
                slidesPerGroup: 3,
            },
        },
        navigation: {
            nextEl: '.swiper-btn-next',
            prevEl: '.swiper-btn-prev',
        },
    })

    return swiper
}
