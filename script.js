var Char = function(container, char) {
    var span = document.createElement("span");
    span.setAttribute('data-char', char);
    span.innerText = char;
    span.addEventListener("mouseover", function(event){
        var wgth = Math.random() * (900 - 100) + 100;
        var opsz = Math.random() * (18 - 4) + 4;
        var slnt = Math.random() * (-10 - 1) + 1;
        var color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        event.target.style = "font-variation-settings: 'wght' " + wgth + ", 'opsz' " + opsz + ", 'slnt' " + slnt;
        event.target.style.color =  color;

        setTimeout(function(){
            event.target.style.color =  "#000000";
            event.target.style = "font-variation-settings: 'wght' " + 443 + ", 'opsz' " + 4 + ", 'slnt' " + 0;
        },1700)
    })
    container.appendChild(span);
    this.getDist = function() {
        this.pos = span.getBoundingClientRect();
        return Math.dist(mouse, {
            x: this.pos.x + (this.pos.width / 1.75),
            y: this.pos.y
        });
    }
}



 var init = function() {
        title = document.getElementById("head");
        str = title.innerText;
        title.innerHTML = "";
        for (var i = 0; i < str.length; i++) {
            var _char = new Char(title, str[i]);
           
        }
        var seedling = document.createElement('span');
        seedling.innerHTML = "&#127793";
        seedling.style.fontSize = "90px"
        title.appendChild(seedling);
        


        document.getElementById("add-button").addEventListener("click", function(event){
            $(document.getElementById("message")).css({display: "block"});
            document.getElementById("canvas").className += " blur";
            document.getElementById("container").className += " blur";
            
        })

        document.getElementById("close-message").addEventListener("click", function(event){
            $(document.getElementById("message")).css({display: "none"});
            $(document.getElementById("canvas")).removeClass("blur");
            $(document.getElementById("container")).removeClass("blur");
            
        })
    }



init();


$(document).mousemove(function(e){

    var coef = Math.random()*(12-5)+5;

    $(".cursor").css({left:e.pageX, top:e.pageY-window.pageYOffset})

    var cur = document.createElement("div");
    cur.className = "cursor";
    $(cur).css({transition: "all " + coef+"s"});
    document.body.appendChild(cur);
    
    setTimeout((cur) => {
        $(cur).remove();
    }, 12000, cur)    

})