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

})();

(() => {
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

(() => {
    //console.log("IIFE Fired");
    //variables
    const model = document.querySelector("#model");
    const hotspots = document.querySelectorAll(".Hotspot");
  
    const infoBoxes = [
      {
        title: "Noise-cancelling microphones",
        text: "Noise-cancelling microphones and a rear copper shield are optimally placed to quickly detect outside noises, working together to counter noise before it disturbs your experience",
        image: "images/copperinsulation.jpg"
      }
    ]
  
    //functions
    function modelLoaded() {
      //console.log(hotspots);
      hotspots.forEach(hotspot => {
        hotspot.style.display = "block";
      });
    }
  
    function loadInfo() {
      infoBoxes.forEach((infoBox, index)=>{
        let selected = document.querySelector(`#hotspot-${index+1}`);
        //document.createElement ('h2');
        //.textContent = infoBox.title
      //document.createElement ('p');
      //.textContent = infoBox.text
  
      console.log(selected);
      console.log(infoBox.title);
      console.log(infoBox.text);
  
      //selected.appendChild();
      //selected.appendChild();
      })
    }
    loadInfo();
  
    function showInfo() {
      //console.log(this.slot);
      //console.log(`#${this.slot}`);
      //since the slot value matches the id value I can use the slot value as a selector to get to the div I want.
      let selected = document.querySelector(`#${this.getAttribute("slot")}`);
      gsap.to(selected, 1, { autoAlpha: 1 });
    }
  
    function hideInfo() {
      //console.log(this.slot);
      //console.log(`#${this.slot}`);
      let selected = document.querySelector(`#${this.getAttribute("slot")}`);
      gsap.to(selected, 1, { autoAlpha: 0 });
    }
  
    //Event Listener
    model.addEventListener("load", modelLoaded);
  
    hotspots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseover", showInfo);
      hotspot.addEventListener("mouseout", hideInfo);
    });
  })();