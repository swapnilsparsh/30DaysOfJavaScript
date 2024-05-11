const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


const t1 = gsap.timeline();

t1.to("#landingpage h2 ", {
    y:40,
    delay: 0,
    duration:1,
    opacity:1
}); 




t1.to("#landingpage p ", {
    y:60,
    delay: 1,
    duration:2,
    opacity:1,
    stagger : 0.1
}); 



t1.from("#landingpage .firstimg",{
    opacity : 0,
    y:-60,
    yoyo : true,
    repeat:-1,
    delay:0,
    duration :1 ,
    stagger :.3,
  
   
});


t1.from("#landingpage .secondimg",{
    opacity:0,
    y:30,
    yoyo :true,
    repeat:-1,
    delay:1 ,
    duration :1   ,
    stagger:0.4
});

t1.from("#navbar a",{
    y:-10 ,
    delay:2,
    duration:0.5,
    stagger:0.2,
    opacity:0

});

t1.from("#scroll",{
    y:20,
    opacity:0,
    duration:1,
    stagger:0.3
})

t1.from("#secondpage img",{
    opacity:0,
    y:-20,
    yoyo :true,
    repeat:-1,
    delay:3 ,
    duration :2   ,
    stagger:0.4
});

/* GSAP animation for smaller screen */

let mm = gsap.matchMedia();

mm.add("(max-width :768px) ", () => {
    let t2 = gsap.timeline();

    t2.to("#landingpage .heading h2 ", {
        y:-15,
        delay: 1,
        duration:0.5,
        opacity:1,
        
    }); 

    t2.from("#navbar a",{
        y:-10 ,
        delay:1,
        duration:0.5,
        stagger:0.2,
        opacity:0
    
    });

    t2.to(" #navbar #right  .ri-arrow-down-s-line",{
        y:-10 ,
        delay:1,
        duration:0.5,
        stagger:0.2,
        opacity:1,
        
    
    });

    t2.to("#landingpage .firstimg",{
        opacity : 1,
        y:-60,
        yoyo : true,
        repeat:-1,
        delay:0,
        duration :2 ,
        stagger :3,
        
       
    });

    t2.to("#landingpage .secondimg",{
        opacity:1,
        y:-10,
        yoyo :true,
        repeat:-1,
        delay:0,
        duration :2   ,
        stagger:4
    });
})










 