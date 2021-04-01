import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'


class RevealOnScroll {
  constructor(els) {
    this.itemsToReveal = els
    this.browserHeight = window.innerHeight
    this.hideInitially()
    this.scrollThrottle = throttle(this.calcCaller, 300).bind(this)
    this.events()
  }

  events() {
    window.addEventListener("scroll", this.scrollThrottle)
    window.addEventListener("resize", debounce(() => {
      console.log("resize")
      this.browserHeight = window.innerHeight
    }, 500))
  }

  calcCaller() {
    console.log("calc caller")
    this.itemsToReveal.forEach(el => {
      if (el.isRevealed == false) {
          this.calcScroll(el)
        }
      })
  }

  calcScroll(el) {
    if (window.scrollY + this.browserHeight > el.offsetTop) {
      console.log("calc scroll")
      let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100
      if (scrollPercent < 80) {
        el.classList.add("reveal-item--visible")
        el.isRevealed = true
        if (el.isLastItem) {
          window.removeEventListener("scroll", this.scrollThrottle)
        }
      }
    }
  }

  hideInitially() {
    this.itemsToReveal.forEach(el => {
      el.classList.add("reveal-item")
      el.isRevealed = false
    })
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true
  }
}

export default RevealOnScroll;