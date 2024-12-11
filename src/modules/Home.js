import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { HttpPost } from "../core/store/httpHelper";

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let query = searchParams.get("query");
  const [foodData, setFoodData] = useState([]);
  const [noFoodFound, setNoFoodFound] = useState(null);
  const [searchQuery, setSearchQuery] = useState(query || "");

  useEffect(() => {
    getNutritionDetails();
    // eslint-disable-next-line
  }, []);

  const getNutritionDetails = async () => {
    try {
      if (searchQuery) {
        const queryParams = { query: searchQuery };
        const response = await HttpPost(queryParams);
        setFoodData(response?.foods);
      }
    } catch (error) {
      setFoodData([]);
      setNoFoodFound(error?.response?.data?.message);
    }
  };

  const handleInputChange = (e) => {
    setSearchParams({ query: e.target.value });
    setSearchQuery(e.target.value);
    if (!e.target.value) {
      setSearchParams("");
      setFoodData([]);
    }
  };

  const FoodNutritionInfo = () => {
    return foodData.map((e, i) => {
      return (
        <tr key={i}>
          <td>
            <img alt={""} className="food-thumb" src={e.photo.thumb} />
          </td>
          <td>{e.serving_qty}</td>
          <td>{e.serving_unit}</td>
          <td>{e.food_name}</td>
          <td>{e.nf_calories}</td>
          <td>{e.serving_weight_grams}</td>
        </tr>
      );
    });
  };

  const getCalorieContent = () => {
    if (!foodData.length) {
      return null;
    }

    if (foodData.length > 1) {
      let data = foodData.reduce((k, v) => k + v.nf_calories, 0);
      return Math.round(data);
    } else {
      return foodData[0]?.nf_calories;
    }
  };

  const getFatContent = () => {
    if (!foodData.length) {
      return null;
    }

    if (foodData.length > 1) {
      let data = foodData.reduce((k, v) => k + v.nf_total_fat, 0);
      return data.toFixed(2);
    } else {
      return foodData[0]?.nf_total_fat;
    }
  };

  const getCholesterolContent = () => {
    if (!foodData.length) {
      return null;
    }

    if (foodData.length > 1) {
      let data = foodData.reduce((k, v) => k + v.nf_cholesterol, 0);
      return data.toFixed(0);
    } else {
      return foodData[0]?.nf_cholesterol;
    }
  };

  const getSodiumContent = () => {
    if (!foodData.length) {
      return null;
    }

    if (foodData.length > 1) {
      let data = foodData.reduce((k, v) => k + v.nf_sodium, 0);
      return data.toFixed(0);
    } else {
      return foodData[0]?.nf_sodium;
    }
  };

  const getPotassiumContent = () => {
    if (!foodData.length) {
      return null;
    }

    if (foodData.length > 1) {
      let data = foodData.reduce((k, v) => k + v.nf_potassium, 0);
      return data.toFixed(0);
    } else {
      return foodData[0]?.nf_potassium;
    }
  };

  const getCarbHydContent = () => {
    if (!foodData.length) {
      return null;
    }

    if (foodData.length > 1) {
      let data = foodData.reduce((k, v) => k + v.nf_total_carbohydrate, 0);
      return data.toFixed(0);
    } else {
      return foodData[0]?.nf_total_carbohydrate;
    }
  };

  const getProteinContent = () => {
    if (!foodData.length) {
      return null;
    }

    if (foodData.length > 1) {
      let data = foodData.reduce((k, v) => k + v.nf_protein, 0);
      return data.toFixed(1);
    } else {
      return foodData[0]?.nf_protein;
    }
  };

  return (
    <>
      <div className="row mx-4">
        <div className="col col-8 mt-4">
          <div className="row">
            <div className="col col-12 mt-4">
              <div className="input-group mb-3">
                <textarea
                  value={searchQuery}
                  rows={2}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control shadow-none"
                  autoFocus
                />
              </div>
              <p className="query mb-0">
                Enter a query like{" "}
                <Link target="_blank" to={"/?query=1+cup+mashed+potatoes"}>
                  "1 cup mashed potatoes"
                </Link>{" "}
                or{" "}
                <Link
                  target="_blank"
                  to={"/?query=1+cup+mashed+potatoes+and+2+tbsp+gravy"}
                >
                  "1 cup mashed potatoes and 2 tbsp gravy"
                </Link>{" "}
                to see how it works.
              </p>
            </div>
            <div className="col col-12 mt-4">
              <div className="input-group mb-3">
                <button
                  className="btn btn-warning"
                  onClick={getNutritionDetails}
                >
                  Calculate Foods
                </button>
              </div>
              {noFoodFound && <h5 className="text-danger">{noFoodFound}</h5>}
            </div>
            <div className="col col-12 mt-4">
              {!!foodData.length && (
                <>
                  <div className="col col-8 mt-4">
                    <table className="table w-100">
                      <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">Qty</th>
                          <th scope="col">Unit</th>
                          <th scope="col">Food</th>
                          <th scope="col">Calorie</th>
                          <th scope="col">Weight</th>
                        </tr>
                      </thead>
                      <tbody>
                        <FoodNutritionInfo />
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {!!foodData.length && (
          <div className="col col-4 mt-4">
            <div className="nutrition-facts p-3">
              <h2 className="fw-bold f-border">Nutrition Facts</h2>
              <div className="w-100">
                <p className="fw-bold f-border-amt border border-3 border-top-0 border-start-0 border-end-0 m-0">
                  Amount per serving
                </p>
              </div>
              <div className="w-100">
                <div className="fw-bold w-50 d-inline">
                  Calories: <span>{getCalorieContent()}</span>
                </div>
                <div className="fw-bold w-50 d-inline float-end d-none">
                  Calories from fat: <span>7</span>
                </div>
              </div>
              <div className="w-100">
                <div className="fw-bold w-50 d-inline">
                  Total Fat: <span>{getFatContent()}g</span>
                </div>
              </div>
              <div className="w-100">
                <div className="fw-bold w-50 d-inline">
                  Cholesterol: <span>{getCholesterolContent()}mg</span>
                </div>
              </div>
              <div className="w-100">
                <div className="fw-bold w-50 d-inline">
                  Sodium: <span>{getSodiumContent()}mg</span>
                </div>
              </div>
              <div className="w-100">
                <div className="fw-bold w-50 d-inline">
                  Potasium: <span>{getPotassiumContent()}mg</span>
                </div>
              </div>
              <div className="w-100">
                <div className="fw-bold w-50 d-inline">
                  Total Carbohydrates: <span>{getCarbHydContent()}mg</span>
                </div>
              </div>
              <div className="w-100">
                <div className="fw-bold w-50 d-inline">
                  Protein: <span>{getProteinContent()}g</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
