import React, { useState, useEffect } from "react";
import { useContextElement } from "@/context/Context";
import { Link } from "react-router-dom";
export default function CourseCheckOut() {
  const { cartCourses } = useContextElement();
  const [totalPrice, setTotalPrice] = useState(0);
  const [shiping, setShiping] = useState(0);
  useEffect(() => {
    const sum = cartCourses.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.discountedPrice * currentValue.quantity;
    }, 0);
    const sumQuantity = cartCourses.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.quantity;
    }, 0);
    setShiping(sumQuantity * 10);
    setTotalPrice(sum);
  }, [cartCourses]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">Course Checkout</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg" style={{ marginTop: "-60px" }}>
        <div className="container">
          <div className="row y-gap-50">
            <div className="col-lg-8">
              <div className="shopCheckout-form">
                <form
                  onSubmit={handleSubmit}
                  className="contact-form row x-gap-30 y-gap-30"
                >
                  <div className="col-12">
                    <h5 className="text-20">Informations</h5>
                  </div>
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                       Name
                    </label>
                    <input
                      required
                      type="text"
                      name="firstName"
                      placeholder=" name"
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Email
                    </label>
                    <input
                      required
                      type="text"
                      name="company"
                      placeholder="email"
                    />
                  </div>

                    <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Phone 
                    </label>
                    <input
                      required
                      type="text"
                      name="phone"
                      placeholder="Phone"
                    />
                  </div>

                  <div style={{ width: "140px" }} >
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Total
                    </label>
                    <input
                      required
                      type="text"
                      name="total"
                      placeholder="99.99$"
                      disabled
                    />
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="">
                <div className="py-30 px-30 bg-white mt-30 border-light rounded-8 bg-light-4">
                  <h5 className="text-20 fw-500">Payment</h5>

                  <div className="mt-30">
                    <div className="form-radio d-flex items-center">
                      <h5 className="ml-15 text-15 lh-1 fw-500 text-dark-1">
                        Direct bank transfer
                      </h5>
                    </div>
                    <p className="ml-25 pl-5 mt-25">
                      Make your payment directly into our bank account. Please
                      use your Order ID as the payment reference. Your order
                      will not be shipped until the funds have cleared in our
                      account.
                    </p>
                    <div className="row justify-center pt-20 lg:pt-40">
                        <div className="col-auto">
                          <Link to="#" className="button -md -outline-purple-1 text-purple-1">
                          Payment
                          </Link>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="mt-30">
                  <button className="button -md -accent col-12 -uppercase text-white">
                    Place order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
