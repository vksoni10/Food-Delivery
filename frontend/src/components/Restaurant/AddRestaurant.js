import React from "react";
import "./AddRestaurant.css";
import { NavLink } from "react-router-dom";

export default function AddRestaurant() {
  return (
    <>
      <div className="containerr mb-3">
        <div className="intro mb-3">
          <h2>Unlock a new revenue stream.</h2>
          <br></br>
          <br></br>
          <h4>
            Potato's global platform gives you the flexibility, visibility and
            customer insights you need to connect with more customers. Partner
            with us today
          </h4>
        </div>
        <div>
          <form>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingName"
                placeholder="Pizza Hut - Vaishali Nagar"
              />
              <label for="floatingInput">Store Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingAddress"
                placeholder="Address"
              />
              <label for="floatingPassword">Store Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingTel"
                placeholder="Telephone number"
              />
              <label for="floatingInput">Contact Details</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingBrand"
                placeholder="I10am - 12pm"
              />
              <label for="floatingInput">Operational Hours</label>
            </div>
            <h4>Restaurant Type</h4>
            <div className="resType">
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="asian"
                  />
                  <label className="form-check-label" for="type">
                    Asian
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="punjabi"
                  />
                  <label className="form-check-label" for="type">
                    Punjabi
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="bbq"
                  />
                  <label className="form-check-label" for="type">
                    BBQ
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="bar"
                  />
                  <label className="form-check-label" for="type">
                    Bar
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="bakery"
                  />
                  <label className="form-check-label" for="type">
                    Bakery and Cake
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="breakfast"
                  />
                  <label className="form-check-label" for="type">
                    Breakfast
                  </label>
                </div>
              </div>
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="fastFood"
                  />
                  <label className="form-check-label" for="type">
                    Fast Foods
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="chinese"
                  />
                  <label className="form-check-label" for="type">
                    Chinese
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="korean"
                  />
                  <label className="form-check-label" for="type">
                    Korean
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="desserts"
                  />
                  <label className="form-check-label" for="type">
                    Desserts and IceCream
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="seafood"
                  />
                  <label className="form-check-label" for="type">
                    Seafood
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="northIndian"
                  />
                  <label className="form-check-label" for="type">
                    North Indian
                  </label>
                </div>
              </div>
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="juice"
                  />
                  <label className="form-check-label" for="type">
                    Juice and Shakes
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="mexican"
                  />
                  <label className="form-check-label" for="type">
                    Mexican
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="Pizza"
                  />
                  <label className="form-check-label" for="type">
                    Pizza
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="snacks"
                  />
                  <label className="form-check-label" for="type">
                    Snacks & Sandwiches
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="chaat"
                  />
                  <label className="form-check-label" for="type">
                    Chaat
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="southIndian"
                  />
                  <label className="form-check-label mb-3" for="type">
                    South Indian
                  </label>
                </div>
              </div>
            </div>
            <h4 className="mb-3">Upload document</h4>
            <div className="input-group mb-3">
              <label className="input-group-text" for="fssaiLicence">
                FSSAI license copy
              </label>
              <input
                type="file"
                className="form-control"
                id="fssaiLicenseCopy"
              />
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" for="bankAccountDetails">
                Bank Account Details
              </label>
              <input
                type="file"
                className="form-control"
                id="bankAccountDetails"
              />
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" for="panCardCopy">
                PAN card copy
              </label>
              <input type="file" className="form-control" id="panCardCopy" />
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" for="gstin">
                Regular GSTIN
              </label>
              <input type="file" className="form-control" id="gstin" />
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" for="image1">
                Three Restaurant Images
              </label>
              <input type="file" className="form-control" id="image1" />
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" for="image2">
                Three Restaurant Images
              </label>
              <input type="file" className="form-control" id="image2" />
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" for="image3">
                Three Restaurant Images
              </label>
              <input type="file" className="form-control" id="image3" />
            </div>
            <div class="col-12">
              <NavLink
                to="/Restaurant/restaurantHome"
                className="btn btn-primary"
              >
                Submit
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
