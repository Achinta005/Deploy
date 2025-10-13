"use client";
import { useState } from "react";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";

export default function ChurnPredictionPage() {
  const [formData, setFormData] = useState({
    SeniorCitizen: 0,
    tenure: "",
    MonthlyCharges: "",
    TotalCharges: "",
    gender: "",
    Partner: "",
    Dependents: "",
    PhoneService: "",
    MultipleLines: "",
    InternetService: "",
    OnlineSecurity: "",
    OnlineBackup: "",
    DeviceProtection: "",
    TechSupport: "",
    StreamingTV: "",
    StreamingMovies: "",
    Contract: "",
    PaperlessBilling: "",
    PaymentMethod: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked ? 1 : 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MODEL}/customer-churn/prediction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get prediction");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = Object.values(formData).every((value) => value !== "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Customer Churn Predictor
          </h1>
          <p className="text-slate-600">
            Enter customer details to predict churn risk
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Numerical Inputs */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Account Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tenure (months)
                    </label>
                    <input
                      type="number"
                      name="tenure"
                      value={formData.tenure}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="24"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Monthly Charges ($)
                    </label>
                    <input
                      type="number"
                      name="MonthlyCharges"
                      value={formData.MonthlyCharges}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="65.50"
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Total Charges ($)
                    </label>
                    <input
                      type="number"
                      name="TotalCharges"
                      value={formData.TotalCharges}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1572.00"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="SeniorCitizen"
                        checked={formData.SeniorCitizen === 1}
                        onChange={handleCheckboxChange}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <span className="text-sm font-medium text-slate-700">
                        Senior Citizen
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Demographics */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Demographics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Partner
                    </label>
                    <select
                      name="Partner"
                      value={formData.Partner}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Dependents
                    </label>
                    <select
                      name="Dependents"
                      value={formData.Dependents}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phone Service
                    </label>
                    <select
                      name="PhoneService"
                      value={formData.PhoneService}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Multiple Lines
                    </label>
                    <select
                      name="MultipleLines"
                      value={formData.MultipleLines}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="No phone service">No phone service</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Internet Service
                    </label>
                    <select
                      name="InternetService"
                      value={formData.InternetService}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Fiber optic">Fiber optic</option>
                      <option value="DSL">DSL</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Online Security
                    </label>
                    <select
                      name="OnlineSecurity"
                      value={formData.OnlineSecurity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="No internet service">
                        No internet service
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Online Backup
                    </label>
                    <select
                      name="OnlineBackup"
                      value={formData.OnlineBackup}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="No internet service">
                        No internet service
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Device Protection
                    </label>
                    <select
                      name="DeviceProtection"
                      value={formData.DeviceProtection}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="No internet service">
                        No internet service
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tech Support
                    </label>
                    <select
                      name="TechSupport"
                      value={formData.TechSupport}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="No internet service">
                        No internet service
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Streaming TV
                    </label>
                    <select
                      name="StreamingTV"
                      value={formData.StreamingTV}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="No internet service">
                        No internet service
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Streaming Movies
                    </label>
                    <select
                      name="StreamingMovies"
                      value={formData.StreamingMovies}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="No internet service">
                        No internet service
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contract & Billing */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Contract & Billing
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Contract
                    </label>
                    <select
                      name="Contract"
                      value={formData.Contract}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Month-to-month">Month-to-month</option>
                      <option value="One year">One year</option>
                      <option value="Two year">Two year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Paperless Billing
                    </label>
                    <select
                      name="PaperlessBilling"
                      value={formData.PaperlessBilling}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Payment Method
                    </label>
                    <select
                      name="PaymentMethod"
                      value={formData.PaymentMethod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Electronic check">Electronic check</option>
                      <option value="Mailed check">Mailed check</option>
                      <option value="Bank transfer (automatic)">
                        Bank transfer
                      </option>
                      <option value="Credit card (automatic)">
                        Credit card
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!isFormValid || loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader className="w-5 h-5 animate-spin" />
                    Predicting...
                  </span>
                ) : (
                  "Predict Churn"
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-900 mb-1">Error</h3>
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {result && (
              <div
                className={`rounded-lg p-6 ${
                  result.prediction === "Yes"
                    ? "bg-red-50 border border-red-200"
                    : "bg-green-50 border border-green-200"
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  {result.prediction === "Yes" ? (
                    <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  ) : (
                    <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                  )}
                  <div>
                    <h3
                      className={`text-xl font-bold ${
                        result.prediction === "Yes"
                          ? "text-red-900"
                          : "text-green-900"
                      }`}
                    >
                      {result.prediction_label}
                    </h3>
                    <p
                      className={`text-sm ${
                        result.prediction === "Yes"
                          ? "text-red-800"
                          : "text-green-800"
                      }`}
                    >
                      Risk Level:{" "}
                      <span className="font-semibold">{result.risk_level}</span>
                    </p>
                  </div>
                </div>

                {/* Confidence Bar */}
                <div className="bg-white bg-opacity-60 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-slate-700 mb-2">
                    Confidence Levels
                  </h4>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-slate-600 mb-1">
                      <span>Churn</span>
                      <span>{(result.confidence.churn * 100).toFixed(2)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="h-2 bg-red-600 rounded-full"
                        style={{ width: `${result.confidence.churn * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm text-slate-600 mb-1">
                      <span>Stay</span>
                      <span>{(result.confidence.stay * 100).toFixed(2)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="h-2 bg-green-600 rounded-full"
                        style={{ width: `${result.confidence.stay * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!result && !error && (
              <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                <p className="text-slate-600 text-sm">
                  Fill the form and click "Predict Churn" to see results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
