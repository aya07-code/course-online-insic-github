import React, { useState } from "react";
import { accordionItems } from "@/data/message";
export default function Messages({ setMessageOpen, messageOpen }) {
  const [currentTab, setCurrentTab] = useState("message");
  const [openMessage, setOpenMessage] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <aside
      className={`sidebar-menu toggle-element js-msg-toggle js-dsbh-sidebar-menu ${
        messageOpen ? "-is-el-visible" : ""
      }`}
    >
      <div className="sidebar-menu__bg"></div>

      <div className="sidebar-menu__content scroll-bar-1 py-30 px-40 sm:py-25 sm:px-20 bg-white -dark-bg-dark-1">
        <div className="row items-center justify-between mb-30">
          <div className="col-auto">
            <div className="-sidebar-buttons">
              <button
                data-sidebar-menu-button="messages"
                onClick={() => setCurrentTab("messages")}
                className={`text-17 text-dark-1 fw-500 ${
                  currentTab == "message" ? "-is-button-active" : ""
                } `}
              >
                Messages
              </button>

              <button
                data-sidebar-menu-button="messages-2"
                onClick={() => setCurrentTab("message")}
                data-sidebar-menu-target="messages"
                className={`d-flex items-center text-17 text-dark-1 fw-500 ${
                  currentTab == "messageTwo" ? "-is-button-active" : ""
                }`}
              >
                <i className="icon-chevron-left text-11 text-purple-1 mr-10"></i>
                Messages
              </button>
            </div>
          </div>

          <div className="col-auto">
            <div className="row x-gap-10">
              <div className="col-auto">
                <button
                  data-el-toggle=".js-msg-toggle"
                  onClick={() => setMessageOpen(false)}
                  className="button -purple-3 text-purple-1 size-40 d-flex items-center justify-center rounded-full"
                >
                  <i className="icon-close text-14"></i>
                </button>
              </div>
            </div>
          </div>


        </div>
        <div className="relative js-menu-switch">
          <div
            data-sidebar-menu-open="messages"
            className={`sidebar-menu__item -sidebar-menu ${
              currentTab == "message" ? "-sidebar-menu-opened" : ""
            } `}
          >

            <div className="accordion -block text-left pt-20 js-accordion">
              {accordionItems.map((item, ind) => (
                <div
                  key={ind}
                  onClick={() =>
                    setOpenMessage((prev) => (prev === item.id ? 0 : item.id))
                  }
                  className={`accordion__item border-light rounded-16 ${
                    openMessage === item.id ? "is-active" : ""
                  }`}
                >
                  <div className="accordion__button">
                    <div className="accordion__icon size-30 -dark-bg-dark-2 mr-10">
                      <div className="icon d-flex items-center justify-center">
                        <span className="lh-1 fw-500">
                          {item.content.length}
                        </span>
                        
                      </div>
                      <div className="icon d-flex items-center justify-center">
                        <span className="lh-1 fw-500">
                          {item.content.length}
                        </span>
                      </div>
                    </div>
                  
                  </div>

                  <div
                    className="accordion__content"
                    style={
                      openMessage === item.id ? { maxHeight: "340px" } : {}
                    }
                  >
                    <div className="accordion__content__inner pl-20 pr-20 pb-20">
                      {item.content.map((contentItem, ind) => (
                        <div
                          key={ind}
                          data-sidebar-menu-target="messages-2"
                          onClick={() => setCurrentTab("messageTwo")}
                          className="row x-gap-10 y-gap-10 pointer"
                        >
                          <div className="col-auto">
                            <img src={contentItem.imageSrc} alt="image" />
                          </div>
                          <div className="col">
                            <div className="text-15 lh-12 fw-500 text-dark-1 pt-8">
                              {contentItem.name}
                            </div>
                            <div className="text-14 lh-1 mt-5">
                              <span className="text-dark-1">You:</span>
                              {contentItem.message}
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-13 lh-12 pt-8">
                              {contentItem.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            data-sidebar-menu-open="messages-2"
            className={`sidebar-menu__item -sidebar-menu ${
              currentTab == "messageTwo" ? "-sidebar-menu-opened" : ""
            }`}
          >
            <div className="row x-gap-10 y-gap-10">
              <div className="col-auto">
                <img
                  src="/assets/img/dashboard/right-sidebar/messages-2/1.png"
                  alt="image"
                />
              </div>
              <div className="col">
                <div className="text-15 lh-12 fw-500 text-dark-1 pt-8">
                  Arlene McCoy
                </div>
                <div className="text-14 lh-1 mt-5">Active</div>
              </div>
            </div>

            <div className="mt-20 pt-30 border-top-light">
              <div className="row y-gap-20">
                <div className="col-12">
                  <div className="row x-gap-10 y-gap-10 items-center">
                    <div className="col-auto">
                      <img
                        src="/assets/img/dashboard/right-sidebar/messages-2/2.png"
                        alt="image"
                      />
                    </div>
                    <div className="col-auto">
                      <div className="text-15 lh-12 fw-500 text-dark-1">
                        Albert Flores
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="text-14 lh-1 ml-3">35 mins</div>
                    </div>
                  </div>
                  <div className="bg-light-3 rounded-8 px-30 py-20 mt-15">
                    How likely are you to recommend our company to your friends
                    and family?
                  </div>
                </div>

                <div className="col-12">
                  <div className="row x-gap-10 y-gap-10 items-center justify-end">
                    <div className="col-auto">
                      <div className="text-14 lh-1 mr-3">35 mins</div>
                    </div>
                    <div className="col-auto">
                      <div className="text-15 lh-12 fw-500 text-dark-1">
                        You
                      </div>
                    </div>
                    <div className="col-auto">
                      <img
                        src="/assets/img/dashboard/right-sidebar/messages-2/3.png"
                        alt="image"
                      />
                    </div>
                  </div>
                  <div className="text-right bg-light-7 -dark-bg-dark-2 text-purple-1 rounded-8 px-30 py-20 mt-15">
                    How likely are you to recommend our company to your friends
                    and family?
                  </div>
                </div>

                <div className="col-12">
                  <div className="row x-gap-10 y-gap-10 items-center">
                    <div className="col-auto">
                      <img
                        src="/assets/img/dashboard/right-sidebar/messages-2/3.png"
                        alt="image"
                      />
                    </div>
                    <div className="col-auto">
                      <div className="text-15 lh-12 fw-500 text-dark-1">
                        Cameron Williamson
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="text-14 lh-1 ml-3">35 mins</div>
                    </div>
                  </div>
                  <div className="bg-light-3 rounded-8 px-30 py-20 mt-15">
                    Ok, Understood!
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-30 pb-20">
              <form
                onSubmit={handleSubmit}
                className="contact-form row y-gap-20"
                action="post"
              >
                <div className="col-12">
                  <textarea
                    required
                    placeholder="Write a message"
                    rows="7"
                  ></textarea>
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="button -md -purple-1 text-white"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div
            data-sidebar-menu-open="contacts"
            className={`sidebar-menu__item -sidebar-menu ${
              currentTab == "contacts" ? "-sidebar-menu-opened" : ""
            }`}
          >
            <div className="tabs -pills js-tabs">
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
