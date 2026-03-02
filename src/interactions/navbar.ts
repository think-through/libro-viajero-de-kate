import gsap from 'gsap'
import '../styles/hamburger.css'

export const initNavBar = () => {
    console.log('navbar init')
    const triggerBtn = document.querySelector('.nav-trigger-btn')
    const dropdown = document.querySelector('.nav-dropdown')
    const navLinks = document.querySelectorAll('.nav-link-item')

    if (!triggerBtn || !dropdown || navLinks.length === 0) return

    let isOpen = false
    const tl = gsap.timeline({ paused: true })

    tl.to(dropdown, {
        width: '100%',
        opacity: 1,
        duration: 0.5,
        ease: 'power3.inOut',
    })

    tl.to(
        navLinks,
        {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
        },
        '<0.2',
    )

    triggerBtn.addEventListener('click', () => (!isOpen ? void playTl() : void reverseTl()))

    const playTl = () => {
        triggerBtn.classList.add('is-active')
        tl.play()
        isOpen = true
    }

    const reverseTl = () => {
        triggerBtn.classList.remove('is-active')
        tl.reverse()
        isOpen = false
    }
}
