(() => {
    const canvas = document.querySelector("#explode-view");
    const context = canvas.getContext("2d");
    canvas.width = 1920;
    canvas.height = 1080;
    const frameCount = 166; //how many still frames do we have?
    const images = []; //an array to hold all of our images
    //create an object literal with a property frame to hold the current frame
    const buds = {
        frame: 0
    };
  
    for (let i=0; i<frameCount; i++) {
        //console.log(i);
        //const img = new Image();
        const img = document.createElement("img");
        //need to recreate a string: images/explode_0001.webp
        img.src = `images/animation${(i+1).toString().padStart(4, '0')}.jpg`;
        images.push(img);
    }
    //console.table(images)
  
    //Not actually aniamting a DOM element, but rather an object
    //which contains a frame count
    gsap.to(buds, {
        frame: 165,
        snap: "frame",
        scrollTrigger: {
            trigger: "#explode-view",
            pin: true,
            scrub: 1,
            start: "top top",
            markers: true
        },
        onUpdate: render
    })
  
    images[0].addEventListener("onload", render);
  
    function render() {
        // console.log(buds.frame);
        //console.log(images[buds.frame]);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[buds.frame], 0, 0);
    }
  
    //xray view

    let imageCon = document.querySelector('#imageCon'),
        drag = document.querySelector('.image-drag'),
        left = document.querySelector('.image-left'),
        dragging = false,
        min = 0,
        max = imageCon.offsetWidth;

function onDown() {
    dragging = true;
    console.log("Set to true")
}

function onUp() {
    dragging = false;
    console.log("Set to false")
}

function onMove(event) {
    //console.log("on move called");
    if(dragging===true) {
        //console.log("dragging");
        let x = event.clientX - imageCon.getBoundingClientRect().left;
        console.log(x);

        if(x < min) {
            x = min;
        } else if(x > max) {
            x = max-10;
        }

        drag.style.left = x + "px";
        left.style.width = x + "px";
    }
}

        drag.addEventListener('mousedown', onDown);
        document.body.addEventListener('mouseup', onUp);
        document.body.addEventListener('mousemove', onMove);
  })();