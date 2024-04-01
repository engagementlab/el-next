// create the class to display a passage in the story
class Passage {
    constructor(story, page, video, timer, links, node) {
        this.story = story;
        this.page = page;
        this.video = video;
        this.timer = timer;
        this.linkwrapper = links;

        // Create the endHandler function to autoadvance or pause finished video with the initial values
        this.endHandlerAdded = false;
        this.updateEndHandler = this.createEndHandler(); // Define updateEndHandler first
        this.endHandler = this.updateEndHandler(); // Call updateEndHandler to generate endHandler
        this.video.addEventListener('ended', this.endHandler.bind(this));

        // Initialize an array to store visited counts
        this.visitedCount = [];
        let storyObject = JSON.parse(storyJSON);
        storyObject.story.forEach(element => {
            // Check if the "node" property exists and is a number
            if (typeof element.node === 'number') {
                // Set the visited count to 0 for the current node
                this.visitedCount[element.node] = 0;
            }
        });
          
        // load first node
        this.loadPassage(node);
    }

    handlePlayError(errorMessage) {
        // Handle autoplay not allowed error
        console.log(errorMessage);
        
        let playButton = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        playButton.setAttribute("class", "play-button");
        page.appendChild(playButton);

        let playButtonCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        playButtonCircle.setAttribute("cx", "82");
        playButtonCircle.setAttribute("cy", "82");
        playButtonCircle.setAttribute("r", "74");
        playButton.appendChild(playButtonCircle);

        let playButtonTriangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        playButtonTriangle.setAttribute("points", "64,50 64,116 120,84");
        playButton.appendChild(playButtonTriangle); 

        let startHandler = function () {
            page.removeChild(playButton);
            // No iPhone support for fullscreen
            if (document.documentElement.requestFullscreen) {
                page.requestFullscreen();
            }
            this.video.play().catch(error => {this.handlePlayError(error);});
        };
        document.body.addEventListener('click', startHandler.bind(this), {once : true});
    }

    createEndHandler() {
        // Define endHandler function inside the closure
        let targetNode, autoAdvance; // Initialize variables to store the current values
    
        let endHandler = () => {
            if ((typeof autoAdvance !== 'undefined') && (autoAdvance === false)) {
                this.video.pause();
            } else {
                this.loadPassage(targetNode); // Use the captured targetNode
            }
        };
    
        // Return a function that updates the captured values and returns the endHandler function
        return (newTargetNode, newAutoAdvance) => {
            targetNode = newTargetNode; // Update the captured targetNode
            autoAdvance = newAutoAdvance; // Update the captured autoAdvance
            return endHandler; // Return the endHandler function
        };
    }

    loadPassage(node) {

        // remove timer and old links
        interfaceOverlay.style.visibility = "hidden";
        this.timer.style.display = "none";
        let elements = this.page.getElementsByClassName("link");
        for (let index = elements.length - 1; index >= 0; index--) {
            let element = elements[index];
            element.parentNode.removeChild(element);
        }
        
        // load next video and links
        let passage = this.story[node];

        // if there is an array of sources, select source based on videoCount
        if (Array.isArray(passage.source)) {
            // if there are more visits then entries in the source array, choose the last source
            if (this.visitedCount[node] < passage.source.length) {
                this.video.src = passage.source[this.visitedCount[node]];
            } else {
                this.video.src = passage.source[passage.source.length - 1];
            }
        } else {
            this.video.src = passage.source;
        }
        console.log(this.video.src);

        if(passage.hasOwnProperty('backgroundColor')){
            document.body.style.backgroundColor = passage.backgroundColor;
        }
        
        this.video.play().catch(error => {this.handlePlayError(error);});

        for (let link of passage.links) {
            new Link(this.page, this, this.linkwrapper, link);
        }
        
        // clear previous interval if a previous node was loaded
        if ('interval' in window) {
            clearInterval(window.interval);
        }

        // if there is an array of times, select time based on videoCount
        let timeDelayBeforeButtons;
        if (Array.isArray(passage.time)) {
            // if there are more visits then entries in the time array, choose the last time
            if (this.visitedCount[node] < passage.time.length) {
                timeDelayBeforeButtons = passage.time[this.visitedCount[node]];
            } else {
                timeDelayBeforeButtons = passage.time[passage.time.length - 1];
            }
        } else {
            timeDelayBeforeButtons = passage.time;
        }
        console.log(timeDelayBeforeButtons);

        // timer handler
        window.interval = setInterval(() => {
            let newWidth = (this.video.duration - this.video.currentTime)/(this.video.duration - timeDelayBeforeButtons)*100;
            // limit the range from 0 to 100
            newWidth = newWidth < 0 ? 0 : (newWidth > 100 ? 100 : newWidth);
            this.timer.style.width = newWidth + "%";
            if (this.video.currentTime > timeDelayBeforeButtons) {
                interfaceOverlay.style.visibility = "visible";
                if (!passage.hideTimer) {
                    this.timer.style.display = "block";
                }
                let elements = this.page.getElementsByClassName("link");
                for (let index = elements.length - 1; index >= 0; index--) {
                    let element = elements[index];
                    element.style.visibility = "visible";
                }
            }
        }, 30);
        
        // Each time a new node is loaded, update the endHandler function
        const targetNode = this.story[node].links[0].targetnode;
        const autoAdvance = this.story[node].autoAdvance;
        this.updateEndHandler(targetNode, autoAdvance);

        // update visited count
        this.visitedCount[node]++;

    }
}
    
// create the class to add a link to a story passage
class Link {
    constructor(page, passage, linkwrapper, link) {
        this.page = page;
        this.passage = passage;
        this.linkwrapper = linkwrapper;
        this.loadLink(link);
    }
    
    loadLink(link) {
        // parse source and test if it is a video or link
        let button = document.createElement("div");
        button.setAttribute("class", "link");
        button.innerHTML = link.linktext;
        let linkHandler = function () {
            if (typeof link.targetnode === 'string' || link.targetnode instanceof String) {
                if (link.targetnode.slice(0,4) == "http") {
                    window.location.href = link.targetnode;
                }
            } else {
                this.passage.loadPassage(link.targetnode);
            }
        };
        button.addEventListener('click', linkHandler.bind(this));
        button.style.visibility = "hidden"; 
        this.linkwrapper.appendChild(button);
    }
}