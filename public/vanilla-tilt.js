var VanillaTilt = (function () {
    'use strict';

    class VanillaTilt {
        constructor(element, settings = {}) {
            if (!(element instanceof Node)) {
                throw `Can't initialize VanillaTilt because ${element} is not a Node`;
            }

            this.width = null;
            this.height = null;
            this.clientWidth = null;
            this.clientHeight = null;
            this.left = null;
            this.top = null;

            this.settings = Object.assign({
                scale: 1.05,
                speed: 300,
                transition: true,
                easing: "cubic-bezier(.03,.98,.52,.99)",
                perspective: 1000,
                max: 15,
                glare: false,
                "max-glare": 1,
                "glare-prerender": false,
                axis: null,
                reset: true
            }, settings);

            if (this.settings.glare) {
                this.glareElement = this.createGlareElement();
                element.appendChild(this.glareElement);
            }

            this.element = element;
            this.glare = null;

            this.addEventListeners();
            this.reset();
        }

        addEventListeners() {
            this.element.addEventListener("mouseenter", this.onMouseEnter.bind(this));
            this.element.addEventListener("mouseleave", this.onMouseLeave.bind(this));
            this.element.addEventListener("mousemove", this.onMouseMove.bind(this));
        }

        onMouseEnter(ev) {
            this.updateElementPosition();
            this.element.style.transition = this.settings.speed + "ms " + this.settings.easing;
            if (this.settings.glare) {
                this.glareElement.style.transition = `opacity ${this.settings.speed}ms ${this.settings.easing}`;
            }
        }

        onMouseLeave(ev) {
            this.element.style.transition = this.settings.speed + "ms " + this.settings.easing;

            if (this.settings.glare) {
                this.glareElement.style.transition = `opacity ${this.settings.speed}ms ${this.settings.easing}`;
            }

            this.reset();
        }

        onMouseMove(ev) {
            let x = (ev.clientX - this.left) / this.width;
            let y = (ev.clientY - this.top) / this.height;
            let _x = Math.min(Math.max(x, 0), 1);
            let _y = Math.min(Math.max(y, 0), 1);

            let transX = (this.settings.max / 2 - _x * this.settings.max).toFixed(2);
            let transY = (_y * this.settings.max - this.settings.max / 2).toFixed(2);

            let style = `perspective(${this.settings.perspective}px) ` +
                `rotateX(${transY}deg) ` +
                `rotateY(${transX}deg) ` +
                `scale3d(${this.settings.scale},${this.settings.scale},${this.settings.scale})`;

            this.element.style.transform = style;

            if (this.settings.glare) {
                this.glareElement.style.transform = `rotate(180deg) translate(-50%, -50%) scale(0)`;
                this.glareElement.style.opacity = "0";
            }
        }

        reset() {
            this.element.style.transform = `perspective(${this.settings.perspective}px) ` +
                `rotateX(0deg) ` +
                `rotateY(0deg) ` +
                `scale3d(1,1,1)`;

            if (this.settings.glare) {
                this.glareElement.style.transform = `rotate(180deg) translate(-50%, -50%) scale(0)`;
                this.glareElement.style.opacity = "0";
            }
        }

        updateElementPosition() {
            let rect = this.element.getBoundingClientRect();
            this.width = this.element.offsetWidth;
            this.height = this.element.offsetHeight;
            this.left = rect.left;
            this.top = rect.top;
        }

        createGlareElement() {
            let glare = document.createElement("div");
            glare.classList.add("js-tilt-glare");

            let glareInner = document.createElement("div");
            glareInner.classList.add("js-tilt-glare-inner");

            glare.appendChild(glareInner);
            return glare;
        }

        static init(elements, settings) {
            if (elements instanceof Node) {
                elements = [elements];
            }

            if (elements instanceof NodeList) {
                elements = [].slice.call(elements);
            }

            if (!(elements instanceof Array)) {
                return;
            }

            elements.forEach(element => {
                if (!('vanillaTilt' in element)) {
                    element.vanillaTilt = new VanillaTilt(element, settings);
                }
            });
        }
    }

    if (typeof document !== 'undefined') {
        window.VanillaTilt = VanillaTilt;

        VanillaTilt.init(document.querySelectorAll('[data-tilt]'));
    }

    return VanillaTilt;
})();