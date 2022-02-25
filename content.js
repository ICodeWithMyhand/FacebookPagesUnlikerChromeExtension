let waitTimeToUnlike = 1500;
let interval = 3 * 5;
let scrollerID;
let state = "idel"

const container = document.querySelector('.d46ut3hm')
const dayWrappers = Array.from(container.children)

function injectBtn() {
    const btn = document.createElement('button')
    btn.style = `
        position: fixed;
        float: right;
        right: 0px;
        background: #1877f2;
        color: #fff;
        font-size: 25px;
        border-radius: 5px;
        border: 2px solid #f0f2f5;
        cursor: pointer;
        padding: 5px;
        z-index: 9999;`
    btn.id = "unlike-all"
    btn.innerText = "Start Scrolling"
    btn.addEventListener('click', startScroll)
    dayWrappers[0].append(btn)
}

function startScroll() {
    console.log("startScroll called")
    state = "scrolling"

    scrollerID = setInterval(function () {
        window.scrollBy(0, 10);
        console.log('still scrolling')
    }, interval);
    console.log('scrollerID', scrollerID)
    changeListener()
}

function stopScroll() {
    console.log("stopScroll called")
    state = 'stopped-scrolling'
    console.log('scrollerID', scrollerID)
    clearInterval(scrollerID);
    changeListener()
}

function changeListener() {
    const btn = document.getElementById("unlike-all")
    if (state == "scrolling") {
        // set listener to unscroll 
        btn.innerText = "Stop Scrolling"
        btn.removeEventListener('click', startScroll)
        btn.addEventListener('click', stopScroll)
    }

    if (state == 'stopped-scrolling') {
        btn.innerText = "Start Unliking"
        btn.removeEventListener('click', stopScroll)
        btn.addEventListener('click', unlike)
    }
}

async function unlike() {
    console.log("unliking called")

    const btn = document.getElementById("unlike-all")
    btn.setAttribute('disabled', true)
    btn.style.background = "#c1c1c1"
    btn.style.cursor = "not-allowed"

    for (let dayIndex = 1; dayIndex < dayWrappers.length; dayIndex++) {
        const dayWrapper = dayWrappers[dayIndex];
        const pageLikeWrappers = Array.from(dayWrapper.children);

        console.log(`Day ${pageLikeWrappers[0].innerText} has  ${pageLikeWrappers.length} likes`)

        for (let pageIndex = 1; pageIndex < pageLikeWrappers.length; pageIndex++) {
            const pageLikeWrapper = pageLikeWrappers[pageIndex];

            console.log(`Deleting ${pageIndex + 1} of ${pageLikeWrappers.length}`)

            // show unlike btn
            const dots = pageLikeWrapper.querySelector('.oajrlxb2.g5ia77u1.qu0x051f')
            dots.click()
            // unlike
            await new Promise((resolve) => { setTimeout(() => { resolve() }, waitTimeToUnlike); })
                .then(() => { document.querySelector('.bp9cbjyn.tiyi1ipj.j83agx80').click() })
        }
    }
}



(
    async () => {
        injectBtn()
    }
)()