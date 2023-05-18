const { el, mount, textContent, list, setChildren, setStyle, setAttr } = redom

let pageTitle = document.querySelector(".blog-post-title")

let title = `Potential Missing Documentation: ${pageTitle.textContent}`
let body = `
What question did you not find the answer to?

What specific task are you trying to achieve?

Is there anything else we can help with?

`

const newIssueQuery = `title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`

class FeedBack {
    constructor() {
        this.promptDelay = 5000;
        this.prompt = el("div.statement", "Did you find the answers you were looking for?")
        this.close = el("div.close", {onclick: function(e) {
            setStyle(this.el, {display:"none"})
        }.bind(this)})
        this.thumbsUp = el("button.feedback-button", {
            onclick: function (e) {
                this.closeFeedback()
            }.bind(this)
        }, "👍")
        this.thumsDown = el("button.feedback-button", {
            onclick: function (e) {
                this.notFindingFeedback()
            }.bind(this)
        }, "👎")

        this.buttonContainer = el("div.feedback-response-container", this.thumbsUp, this.thumsDown)

        this.actionLink = el("a", { href: `https://github.com/fermyon/developer/issues/new?${newIssueQuery}`, target: "_blank" }, "Open a Github Issue")
        this.el = el("div.feedback-modal", this.close, this.prompt, this.buttonContainer)
        let a  = setInterval(() => {
            let percentage = window.scrollY / (document.body.offsetHeight - window.innerHeight) ;
            if (percentage > 0.5) {
                setStyle(this.el, { opacity: 1, "z-index": 998 })
                clearInterval(a)
            }
        }, 1000);

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
        this.prompt.textContent = "Can you help us improve?"
        setChildren(this.el, [this.close, this.prompt, this.actionLink])
    }
}


function createFeedbackElement(handle) {
    const feedback = new FeedBack()
    mount(handle, feedback)
}

export { createFeedbackElement }