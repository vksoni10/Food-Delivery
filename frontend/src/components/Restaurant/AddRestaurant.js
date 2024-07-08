import React from "react";
import "./AddRestaurant.css";

export default function AddRestaurant() {
  return (
    <>
      <div className="container">
        <div className="intro">
          <h2>Unlock a new revenue stream.</h2>
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
              <label for="floatingInput">Tel no.</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingBrand"
                placeholder="Pizza Hut"
              />
              <label for="floatingInput">Brand Name</label>
            </div>
            <h4>Restaurant Type</h4>
            <div className="resType">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="indian"
                />
                <label className="form-check-label" for="type">
                  Indian
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
              <label className="form-check-label mb-3" for="type">
                Chaat
              </label>
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
              <label className="input-group-text" for="menu">
                Menu
              </label>
              <input type="file" className="form-control" id="menu" />
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" for="item1">
                Dish image for top 5 items
              </label>
              <input type="file" className="form-control" id="item1" />
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" for="item2">
                Dish image for top 5 items
              </label>
              <input type="file" className="form-control" id="item2" />
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" for="item3">
                Dish image for top 5 items
              </label>
              <input type="file" className="form-control" id="item3" />
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" for="item4">
                Dish image for top 5 items
              </label>
              <input type="file" className="form-control" id="item4" />
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" for="item5">
                Dish image for top 5 items
              </label>
              <input type="file" className="form-control" id="item5" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
