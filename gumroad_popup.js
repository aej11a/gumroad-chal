window.onload = initGumroadFrames

function getGumroadURL(link) {
    let resultURL;
    // product link
    if (link.includes("gum.co/")) {
        const id = new URL(link).pathname.substring(1)
        resultURL = "https://gumroad.com/l/" + id
    }
    // profile link 
    else {
        resultURL = link
    }
    return resultURL;
}

function initGumroadFrames() {
    // Set up the translucent background and container
    const gumroadContainer = document.createElement("div");
    gumroadContainer.classList.add("gumroad-scroll-container");
    gumroadContainer.classList.add("gumroad-hide");
    gumroadContainer.addEventListener("click", function (e) {
        gumroadContainer.classList.add("gumroad-hide");
        Array.from(document.querySelectorAll('.gumroad-overlay-iframe')).forEach(frame => frame.classList.add("gumroad-hide"))
    });

    // Add a logo to each button with the gumroad-button class
    const gumroadLogo = document.createElement("span")
    gumroadLogo.classList.add("gumroad-button-logo")
    const buttonNodes = document.querySelectorAll(`.gumroad-button`)
    buttonNodes.forEach(buttonNode => buttonNode.prepend(gumroadLogo.cloneNode()))

    // get elements with product or profile lints
    const linkNodes = document.querySelectorAll(`a[href^="https://gum.co/"], a[href*=".gumroad.com"]`)
    linkNodes.forEach((linkNode, idx) => {
        linkNode.setAttribute("gumroad-frame-id", idx)
        linkNode.onclick = function (event) {
            // Links should not actually navigate to gumroad
            event.preventDefault()

            // This will show the iframe on click
            gumroadContainer.classList.remove("gumroad-hide")

            // ID is used to support multiple frames -> each frame has a corresponding ID
            document.querySelectorAll(`iframe[gumroad-frame-id="${idx}"]`)[0].classList.remove("gumroad-hide")
        }
    })

    //const productIds = Array.from(linkNodes, node => (new URL(node.getAttribute('href')).pathname.substring(1)))
    const links = Array.from(linkNodes, node => node.getAttribute('href'))

    links.forEach((link, idx) => {
        const frame = document.createElement("iframe")
        // product page
        let frameSrc = getGumroadURL(link)
        frame.setAttribute("src", frameSrc)
        frame.classList.add("gumroad-overlay-iframe")
        frame.classList.add("gumroad-hide")
        frame.setAttribute("allowfullscreen", "allowfullscreen")

        // ID is used to support multiple frames -> each button has a corresponding ID
        frame.setAttribute("gumroad-frame-id", idx)

        // Optimization for the sites where these frames are embedded. See: https://web.dev/iframe-lazy-loading/
        frame.setAttribute("loading", "lazy")

        // Prevent clicks on the frame from triggering the "close" action of a background click
        frame.addEventListener("click", function (e) {
            e.stopPropagation();
        });

        gumroadContainer.appendChild(frame)
    })

    const style = document.createElement('style');
    style.textContent = `
                .gumroad-scroll-container {
                    -webkit-overflow-scrolling: touch;
                    overflow-y: auto;
                    position: fixed !important;
                    z-index: 99998 !important;
                    top: 0 !important;
                    right: 0 !important;
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                    text-align: start;
                    max-height: 100vh;
                    max-width: 100vw;
                    height: 100vh;
                    width: 100vw;
                    background: rgba(0,0,0,0.7);
                }
                .gumroad-overlay-iframe {
                    position: absolute;
                    margin: 50px;
                    min-width: calc(100% - 100px);
                    min-height: 100%;
                    border: none !important;
                }
                .gumroad-hide {
                    height: 0 !important;
                    width: 0 !important;
                    display: none !important;
                }
                .gumroad-button {
                    background-color: white !important;
                    background-image: url(https://gumroad.com/button/button_bar.jpg) !important;
                    background-repeat: repeat-x !important;
                    border-radius: 4px !important;
                    box-shadow: rgb(0 0 0 / 40%) 0 0 2px !important;
                    color: #999 !important;
                    display: inline-block !important;
                    font-family: -apple-system, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
                    font-size: 16px !important;
                    font-style: normal !important;
                    font-weight: 500 !important;
                    line-height: 50px !important;
                    padding: 0 15px !important;
                    text-shadow: none !important;
                    text-decoration: none !important;
                }
                .gumroad-button-logo {
                    background-image: url(https://gumroad.com/button/button_logo.png) !important;
                    background-size: cover !important;
                    height: 17px !important;
                    width: 16px !important;
                    display: inline-block !important;
                    margin-bottom: -3px !important;
                    margin-right: 15px !important;
                }
            `;
    document.head.append(style);

    document.body.appendChild(gumroadContainer)
}