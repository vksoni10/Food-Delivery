import React from "react";
import "./AddRestaurant.css";

export default function AddRestaurant() {
  return (
    <>
      <div className="container">
        <div>
          <h2>Unlock a new revenue stream.</h2>
          <h4>
            Potato's global platform gives you the flexibility, visibility and
            customer insights you need to connect with more customers. Partner
            with us today
          </h4>
        </div>
        <div>
          <form>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingName"
                placeholder="Pizza Hut - Vaishali Nagar"
              />
              <label for="floatingInput">Store Name</label>
            </div>
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="floatingAddress"
                placeholder="Address"
              />
              <label for="floatingPassword">Store Address</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control"
                id="floatingTel"
                placeholder="Telephone number"
              />
              <label for="floatingInput">Tel no.</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingBrand"
                placeholder="Pizza Hut"
              />
              <label for="floatingInput">Brand Name</label>
            </div>
            <div class="form-floating">
              <label for="floatingType">Restaurant Type</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="indian"
                />
                <label class="form-check-label" for="type">
                  Indian
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="punjabi"
                />
                <label class="form-check-label" for="type">
                  Punjabi
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="bbq"
                />
                <label class="form-check-label" for="type">
                  BBQ
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="bar"
                />
                <label class="form-check-label" for="type">
                  Bar
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="bakery"
                />
                <label class="form-check-label" for="type">
                  Bakery and Cake
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="breakfast"
                />
                <label class="form-check-label" for="type">
                  Breakfast
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="fastFood"
                />
                <label class="form-check-label" for="type">
                  Fast Foods
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="chinese"
                />
                <label class="form-check-label" for="type">
                  Chinese
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="korean"
                />
                <label class="form-check-label" for="type">
                  Korean
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="desserts"
                />
                <label class="form-check-label" for="type">
                  Desserts and IceCream
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="seafood"
                />
                <label class="form-check-label" for="type">
                  Seafood
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="juice"
                />
                <label class="form-check-label" for="type">
                  Juice and Shakes
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="mexican"
                />
                <label class="form-check-label" for="type">
                  Mexican
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="Pizza"
                />
                <label class="form-check-label" for="type">
                  Pizza
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="snacks"
                />
                <label class="form-check-label" for="type">
                  Snacks & Sandwiches
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="chaat"
                />
                <label class="form-check-label" for="type">
                  Chaat
                </label>
              </div>
            </div>
            <div class="form-floating">
              <label for="floatingType">Upload Documents</label>
              <div class="input-group mb-3">
                <label class="input-group-text" for="fssaiLicence">
                  FSSAI license copy
                </label>
                <input type="file" class="form-control" id="fssaiLicenseCopy" />
              </div>
              <div class="input-group mb-3">
                <label class="input-group-text" for="bankAccountDetails">
                  Bank Account Details
                </label>
                <input
                  type="file"
                  class="form-control"
                  id="bankAccountDetails"
                />
              </div>
              <div class="input-group mb-3">
                <label class="input-group-text" for="panCardCopy">
                  PAN card copy
                </label>
                <input type="file" class="form-control" id="panCardCopy" />
              </div>
              <div class="input-group mb-3">
                <label class="input-group-text" for="gstin">
                  Regular GSTIN
                </label>
                <input type="file" class="form-control" id="gstin" />
              </div>
              <div class="input-group mb-3">
                <label class="input-group-text" for="menu">
                  Menu
                </label>
                <input type="file" class="form-control" id="menu" />
              </div>
              <div class="input-group mb-3">
                <label class="input-group-text" for="item1">
                  Dish image for top 5 items
                </label>
                <input type="file" class="form-control" id="item1" />
              </div>
              <div class="input-group mb-3">
                <label class="input-group-text" for="item2">
                  Dish image for top 5 items
                </label>
                <input type="file" class="form-control" id="item2" />
              </div>
              <div class="input-group mb-3">
                <label class="input-group-text" for="item3">
                  Dish image for top 5 items
                </label>
                <input type="file" class="form-control" id="item3" />
              </div>
              <div class="input-group mb-3">
                <label class="input-group-text" for="item4">
                  Dish image for top 5 items
                </label>
                <input type="file" class="form-control" id="item4" />
              </div>
              <div class="input-group mb-3">
                <label class="input-group-text" for="item5">
                  Dish image for top 5 items
                </label>
                <input type="file" class="form-control" id="item5" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
