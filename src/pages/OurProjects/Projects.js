import React, { useEffect } from "react";
import "./Projects.css";
import Projects_panels from "./projects_panels.js";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";

let data = {
  CSE: [
    {
      Number: 0,
      Title: "Project 1",
      Desc: "Hello",
    },
    {
      Number: 1,
      Title: "Project 2",
      Desc: "Hello",
    },
    {
      Number: 2,
      Title: "Project 3",
      Desc: "Hello",
    },
    {
      Number: 3,
      Title: "Project 4",
      Desc: "Hello",
    },
  ],
  MECH: [
    {
      Number: 0,
      Title: "Event A",
      Desc: "Hello",
    },
    {
      Number: 1,
      Title: "Event B",
      Desc: "Hello",
    },
  ],
  ENTC: [
    {
      Number: 0,
      Title: "Event A",
      Desc: "Hello",
    },
    {
      Number: 1,
      Title: "Event B",
      Desc: "Hello",
    },
    {
      Number: 2,
      Title: "Event C",
      Desc: "Hello",
    },
  ],
};

const Projects = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    let duration = 10,
      sections = gsap.utils.toArray(".panel_projects"),
      sectionIncrement = duration / (sections.length - 1),
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".Project_container",
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          start: "top top",
          end: "+=5000",
        },
      });
      
    tl.to(sections, {
      xPercent: -100 * (sections.length - 1),
      yPercent: 0,
      duration: duration,
      ease: "none",
    });

    // everything below this is just for the fading/scaling up which is NOT scrubbed - it's all dynamic, triggered when each section enters/leaves so that the fading/scaling occurs at a consistent rate no matter how fast you scroll!
    sections.forEach((section, index) => {
      let tween = gsap.from(section, {
        opacity: 0,
        scale: 0.6,
        duration: 1,
        force3D: true,
        paused: true,
      });
      addSectionCallbacks(tl, {
        start: sectionIncrement * (index - 0.99),
        end: sectionIncrement * (index + 0.99),
        onEnter: () => tween.play(),
        onLeave: () => tween.reverse(),
        onEnterBack: () => tween.play(),
        onLeaveBack: () => tween.reverse(),
      });
      index || tween.progress(1); // the first tween should be at its end (already faded/scaled in)
    });

    // helper function that lets us define a section in a timeline that spans between two times (start/end) and lets us add onEnter/onLeave/onEnterBack/onLeaveBack callbacks
    function addSectionCallbacks(
      timeline,
      { start, end, param, onEnter, onLeave, onEnterBack, onLeaveBack }
    ) {
      let trackDirection = (animation) => {
          // just adds a "direction" property to the animation that tracks the moment-by-moment playback direction (1 = forward, -1 = backward)
          let onUpdate = animation.eventCallback("onUpdate"), // in case it already has an onUpdate
            prevTime = animation.time();
          animation.direction = animation.reversed() ? -1 : 1;
          animation.eventCallback("onUpdate", () => {
            let time = animation.time();
            if (prevTime !== time) {
              animation.direction = time < prevTime ? -1 : 1;
              prevTime = time;
            }
            onUpdate && onUpdate.call(animation);
          });
        },
        empty = (v) => v; // in case one of the callbacks isn't defined
      timeline.direction || trackDirection(timeline); // make sure direction tracking is enabled on the timeline
      start >= 0 &&
        timeline.add(
          () =>
            ((timeline.direction < 0 ? onLeaveBack : onEnter) || empty)(param),
          start
        );
      end <= timeline.duration() &&
        timeline.add(
          () =>
            ((timeline.direction < 0 ? onEnterBack : onLeave) || empty)(param),
          end
        );
    }
  }, []);
  return (
    <>
      <div id="panel_container">
        <div id="Main_container" className="Project_container">
          <div id="Home_projects" className="panel_projects">
            <img id="projects_heading_page_image" style={{width:'18vw'}} src={URL="assets/images/project-management.png"}></img>
            <h1 id="Main_page_heading" style={{color:"BLACK",fontFamily: "Carrois Gothic SC",fontStyle : 'normal',fontweight: 'normal',fontSize:'4vw'}}>OUR PROJECTS</h1>
          </div>
          <div id="CSE" className="panel_projects">
            <Projects_panels panel_name={data.CSE.slice(0, 3)} />
          </div>

          <div id="ENTC" className="ENTC panel_projects">
            <Projects_panels panel_name={data.ENTC} />
          </div>

          <div id="MECH" className="MECH panel_projects">
            <Projects_panels panel_name={data.MECH} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;


