import { learnList, requirements, lessonItems } from "@/data/aboutcourses";
import React from "react";

export default function Descriptions() {
  return (
    <div className="mt-60 lg:mt-40">
      <h4 className="text-18 fw-500">Description</h4>
      <p className="mt-30">
        Phasellus enim magna, varius et commodo ut, ultricies vitae velit. Ut
        nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo. In
        libero urna, venenatis sit amet ornare non, suscipit nec risus. Sed
        consequat justo non mauris pretium at tempor justo sodales. Quisque
        tincidunt laoreet malesuada. Cum sociis natoque penatibus et magnis dis
        parturient montes, nascetur.
        <br />
        <br />
        This course is aimed at people interested in UI/UX Design. We’ll start
        from the very beginning and work all the way through, step by step. If
        you already have some UI/UX Design experience but want to get up to
        speed using Adobe XD then this course is perfect for you too!
        <br />
        <br />
        First, we will go over the differences between UX and UI Design. We will
        look at what our brief for this real-world project is, then we will
        learn about low-fidelity wireframes and how to make use of existing UI
        design kits.
      </p>
    </div>
  );
}
