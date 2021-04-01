import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'



let mobileMenu = new MobileMenu();
new RevealOnScroll(document.querySelectorAll(".feature-item"));
new RevealOnScroll(document.querySelectorAll(".testimonials"));
let stickyHeader = new StickyHeader();


if (module.hot) {
  module.hot.accept()
}