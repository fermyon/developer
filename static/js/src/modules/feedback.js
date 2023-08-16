const { el, mount, textContent, list, setChildren, setStyle, setAttr } = redom

let pageTitle = document.querySelector(".blog-post-title").innerText

class FeedBack {
    constructor() {
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
        }, "👍")
        this.thumbsDown = el("button.feedback-button", {
            onclick: function (e) {
                this.submitSatisfactionForm("not satisfied")
                this.notFindingFeedback()
            }.bind(this)
        }, "👎")

        this.buttonContainer = el("div.feedback-response-container", this.thumbsUp, this.thumbsDown)
        this.feedback = el("textarea")
        this.actionLink = el("button.button.is-primary", {
            onclick: function (e) {
                this.submitFeedbackForm()
            }.bind(this)
        }, "submit")
        this.el = el("div.feedback-modal", this.close, this.prompt, this.buttonContainer)
        let a = setInterval(() => {
            let percentage = window.scrollY / (document.body.offsetHeight - window.innerHeight);
            if (percentage > 0.5) {
                setStyle(this.el, { opacity: 1, "z-index": 998 })
                clearInterval(a)
            }
        }, 250);

        let observer = new IntersectionObserver(entries => {
            console.log(entries[0].isIntersecting)
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
        console.log(observer)
    }
    async submitSatisfactionForm(satisfaction) {
        let data = {
            page: pageTitle,
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
                page: pageTitle,
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
            console.log("submitted data successfully")
            this.prompt.textContent = "Thanks for submitting the feedback"
            setChildren(this.el, [this.close, this.prompt])
            setTimeout(() => {
                this.closeFeedback()
            }, 5000);
        }
    }
    closeFeedback() {
        setStyle(this.el, { opacity: 0 })
        setTimeout(() => {
            this.prompt.textContent = "Still finding answers to the questions you have?"
            setStyle(this.el, { opacity: 1, "z-index": 998 })
        }, this.promptDelay);
        this.promptDelay *= 2
    }

    notFindingFeedback() {
        this.prompt.textContent = "Let us know what you are looking for!"
        setChildren(this.el, [this.close, this.prompt, this.feedback, this.actionLink])
    }
}


function createFeedbackElement(handle) {
    const feedback = new FeedBack()
    mount(handle, feedback)
}

export { createFeedbackElement }