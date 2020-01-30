import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll {
    constructor(elements, threshholdPercent) {
        this.threshholdPercent = threshholdPercent;
        this.itemsToReveal = elements;
        this.windowHeight = window.innerHeight;
        this.revealInitially();
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
        this.events();
    }

    events() {
        window.addEventListener('scroll', this.scrollThrottle);
        window.addEventListener('resize', debounce(() => {
            console.log('resize just ran');
            this.windowHeight = window.innerHeight;
        }, 333));
    }

    calcCaller() {
        console.log('Scroll function ran');
        this.itemsToReveal.forEach(el => {
            if (el.isRevealed == false) {
                this.calculateIfScrolledTo(el);
            };
        });
    }

    calculateIfScrolledTo(el) {
        // console.log('window.scrollY / window.innerHeight / el.offsetTop', 
        //     window.scrollY, ' / ' , this.windowHeight, ' / ', el.offsetTop);
        if (window.scrollY + this.windowHeight > el.offsetTop) {
            console.log('Element was calculated');
            let scrollPercent = (el.getBoundingClientRect().top /this.windowHeight) * 100;
            console.log(scrollPercent);
            if (scrollPercent < this.threshholdPercent) {
                el.classList.add('reveal-item--is-visible');
                el.isRevealed = true;

                if (el.isLastElement) {
                    window.removeEventListener('scroll', this.scrollThrottle);
                }
            }
        }
    }

    revealInitially() {
        this.itemsToReveal.forEach(el => {
            el.classList.add('reveal-item')
            el.isRevealed = false;
        });
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastElement = true;
    }
}
export default RevealOnScroll;