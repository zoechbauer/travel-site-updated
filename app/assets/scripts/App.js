import '../styles/styles.css'
import 'lazysizes'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'
import ClientArea from './modules/ClientArea'

// React Code goes here
import React from 'react'
import ReactDOM from 'react-dom'

// import React components that we created
import MyAmazingComponent from './modules/MyAmazingComponent'

ReactDOM.render(<MyAmazingComponent />, document.querySelector('#my-react-example'));

new ClientArea();
new StickyHeader();
new RevealOnScroll(document.querySelectorAll('.feature-item'), 75);
new RevealOnScroll(document.querySelectorAll('.testimonial'), 60);
new MobileMenu();
let modal;

document.querySelectorAll('.open-modal').forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        if (typeof modal == 'undefined') {
            import(/* webpackChunkName: 'modal' */ './modules/Modal').then(f => {
                console.log('file loaded');
                modal = new f.default();
                setTimeout(()=> modal.openTheModal(), 20);
            }).catch(e => console.log('An Error occured loading the file:\n', e));
        } else {
            console.log('openTheModal');
            modal.openTheModal();
        }
    });
})

if (module.hot) {
    module.hot.accept();
}
