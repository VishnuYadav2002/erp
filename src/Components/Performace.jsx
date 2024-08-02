import React, { useState, useEffect } from "react";
import "./style.css";

const Performance = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [emergingData, setEmergingData] = useState([]);
  const [topsaleData, setTopsaleData] = useState([]);
  const [birthData, setBirthData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response, responseEmer, responseTop, responseBirth] = await Promise.all([
          fetch("https://digimanagement.org/erp/api/pos"),
          fetch("https://digimanagement.org/erp/api/emerging"),
          fetch("https://digimanagement.org/erp/api/sales-topper"),
          fetch("https://digimanagement.org/erp/api/birthday")
        ]);

        const data = await response.json();
        setPerformanceData(data);

        const dataEmer = await responseEmer.json();
        setEmergingData(dataEmer);

        const dataTop = await responseTop.json();
        setTopsaleData(dataTop);

        const dataBirth = await responseBirth.json();
        setBirthData(dataBirth);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container-marque mt-2">
        <div className="marquee">
          <div className="marquee-content d-flex">
            <div className="pillar">
              <h5 className="text-center">June Month Pillar Of Success</h5>
              <div className="d-flex text-center">
                {performanceData.map((item, index) => (
                  <div key={index} className="d-flex">
                    <div>
                      <img className="sec-im" src={item.img} alt={item.name} width={110} />
                      <h6 className="text-center">{item.name}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pillar">
              <h5 className="text-center">June Month Emerging Player</h5>
              <div className="d-flex text-center">
                {emergingData.map((item, index) => (
                  <div key={index} className="d-flex">
                    <div className="emer">
                      <img className="sec-im" src={item.img} alt={item.name} width={110} />
                      <h6 className="text-center">{item.name}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pillar">
              <h5 className="text-center">July Month Top Performer</h5>
              <div className="d-flex">
                {topsaleData.map((item, index) => (
                  <div className="text-center" key={index}>
                    <img className="top-sale-img" src={item.img} alt={item.name} width={110} />
                    <h6 className="text-center">{item.name}</h6>
                    <h6 className="text-center">{item.total_sale}</h6>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="text-center d-flex birthday" >
          {birthData.map((item, index) => (
            <div key={index} className="frame">
              <img
                className=""
                src={`https://digimanagement.org/erp/public/uploads/${item.primage}`} 
                alt={item.fname}
                width={200}
                height={200}
              />
              <h4 className="text-center">{item.fname}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Performance;
