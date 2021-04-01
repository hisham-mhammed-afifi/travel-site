import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'


class StickyHeader {
  constructor() {
    this.siteHeader = document.querySelector(".site-header")
    this.pageSections = document.querySelectorAll(".page-section")
    this.browserHeight = window.innerHeight
    this.preScrollY = window.scrollY
    this.events()
  }

  events() {
    window.addEventListener("scroll", throttle(() => this.onScroll(), 200))
    window.addEventListener("resize", debounce(() => {
      this.browserHeight = window.innerHeight
    }, 500))
  }

  onScroll() {
    this.scrollDirection()

    if (window.scrollY > 400) {
      this.siteHeader.classList.add("site-header--dark")
    } else {
      this.siteHeader.classList.remove("site-header--dark")
    }

    this.pageSections.forEach(el => this.calcSection(el))
  }

  scrollDirection() {
    if (window.scrollY > this.preScrollY) {
      this.direction = 'down'
    } else {
      this.direction = 'up'
    }

    this.preScrollY = window.scrollY
  }

  calcSection(el) {
    if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
      let scrollPercent = el.getBoundingClientRect().y / this.browserHeight * 100
      if (scrollPercent < 18 && scrollPercent > -0.1 && this.direction == 'down' || scrollPercent < 33 && this.direction == 'up') {
        let link = el.getAttribute("data-link")
        document.querySelectorAll(`.primary-nav a:not(${link})`).forEach(el => el.classList.remove("current-link"))
        document.querySelector(link).classList.add("current-link")
      }
    }
  }
}

export default StickyHeader;