const { el, mount, textContent, list, setChildren, setStyle, setAttr } = redom


class FeedBack {
    constructor() {
        this.pageTitle = document.querySelector(".blog-post-title").innerText
        this.promptDelay = 5000;
        this.prompt = el("div.statement", "Did you find the answers you were looking for?")
        this.close = el("div.close", {
            onclick: function (e) {
                setStyle(this.el, { display: "none" })
            }.bind(this)
        })
        this.thumbsUp = el("button.feedback-button", {
            onclick: function (e) {
                this.submitSatisfactionForm("satisfied")
                this.closeFeedback()
            }.bind(this)
        })
        this.thumbsUp.innerHTML = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.33333 50V20.8333H0V50H8.33333Z" fill="#BAA9E1"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8333 13.4836L16.6667 21.8169V45.8333H39.0915L45.8333 32.3497V22.9167C45.8333 21.7661 44.9006 20.8333 43.75 20.8333H25V6.25C25 5.09941 24.0673 4.16667 22.9167 4.16667H20.8333V13.4836ZM16.6667 0H22.9167C26.3684 0 29.1667 2.79822 29.1667 6.25V16.6667H43.75C47.2018 16.6667 50 19.4649 50 22.9167V33.3333L41.6667 50H12.5V20.8333L16.6667 12.5V0Z" fill="#BAA9E1"/>
        </svg>`
        this.thumbsDown = el("button.feedback-button", {
            onclick: function (e) {
                this.submitSatisfactionForm("not satisfied")
                this.notFindingFeedback()
            }.bind(this)
        })
        this.thumbsDown.innerHTML = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.6667 0V29.1667H50V0H41.6667Z" fill="#BAA9E1"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M29.1667 36.5164L33.3333 28.1831V4.16667H10.9085L4.16667 17.6503V27.0833C4.16667 28.2339 5.09941 29.1667 6.25 29.1667H25V43.75C25 44.9006 25.9327 45.8333 27.0833 45.8333H29.1667V36.5164ZM33.3333 50H27.0833C23.6316 50 20.8333 47.2018 20.8333 43.75V33.3333H6.25C2.79822 33.3333 0 30.5351 0 27.0833V16.6667L8.33333 0H37.5V29.1667L33.3333 37.5V50Z" fill="#BAA9E1"/>
        </svg>`

        this.buttonContainer = el("div.feedback-response-container", this.thumbsUp, this.thumbsDown)
        this.feedback = el("textarea")
        this.actionLink = el("button.button.is-primary", {
            onclick: function (e) {
                this.submitFeedbackForm()
            }.bind(this)
        }, "submit")
        this.el = el("div.feedback-modal", this.close, this.prompt, this.buttonContainer)
        let a = setInterval(() => {
            if (this.checkForScroll()) {
                clearInterval(a)
            }
        }, 250);
        let observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                this.el.parentNode.classList.add("end-of-page")
            } else {
                this.el.parentNode.classList.remove("end-of-page")
            }
        }, {
            rootMargin: "0px 0px 100px 0px",
            threshold: [0.5]
        });
        observer.observe(document.querySelector("#end-of-content"))
    }
    async submitSatisfactionForm(satisfaction) {
        let data = {
            page: this.pageTitle,
            satisfaction: satisfaction
        }
        await fetch("https://submit-form.com/KjF5CuTg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        })
    }
    async submitFeedbackForm() {
        let content = this.feedback.value
        if (content) {
            let data = {
                page: this.pageTitle,
                url: window.location.pathname,
                config: localStorage.getItem("toggleTabSelections"),
                feedback: content
            }
            await fetch("https://submit-form.com/c3jrxv8A", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            })
            this.prompt.textContent = "Thanks for submitting the feedback"
            setChildren(this.el, [this.close, this.prompt])
            setTimeout(() => {
                this.closeFeedback()
            }, 10000);
        }
    }
    closeFeedback() {
        this.parent = this.el.parentNode.parentNode
        console.log(this.parent)
        setStyle(this.el, { opacity: 0 })
        setStyle(this.parent, { opacity: 0, transition: "opacity 1s ease-in-out" })

    }

    notFindingFeedback() {
        this.prompt.textContent = "Let us know what you are looking for!"
        setChildren(this.el, [this.close, this.prompt, this.feedback, this.actionLink])
    }
    checkForScroll() {
        let percentage = window.scrollY / (document.body.offsetHeight - window.innerHeight);
        if (percentage > 0.5 || document.body.offsetHeight - window.innerHeight < 500) {
            setStyle(this.el, { opacity: 1, "z-index": 998 })
            return true
        }
        return false
    }
}


function createFeedbackElement(handle) {
    const feedback = new FeedBack()
    mount(handle, feedback)
}

export { createFeedbackElement }
