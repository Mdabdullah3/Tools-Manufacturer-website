import React from "react";
import Social from "./Social";

const About = () => {
  return (
    <div className="pt-10 aboutBg">
        <h1 className="text-center smile py-10 pb-14 text-4xl font-mono font-bold w-6/12 mx-auto text-primary"><span className="border-b-4 border-primary text-secondary">Our</span> Mission</h1>
      <div className="">
        <div className="grid md:grid-cols-2 grid-cols-1 w-9/12 mx-auto">
          <div className="grid grid-cols-1">
            <img
              src="https://i.ibb.co/PZ26rMh/750x420.jpg"
              alt=""
            />
            <div className="flex font-mono gap-8 mt-[-20px]">
              <div>
                <h1 className="font-bold text-xl pb-2 text-primary">Mission</h1>
                <p className="text-sm text-justify text-secondary">
                  In on announcing if of comparison pianoforte projection. Maids
                  hoped gay yet bed asked blind dried point...
                </p>
              </div>
              <div>
                <h1 className="font-bold text-xl pb-2 text-primary">Vision</h1>
                <p className="text-sm text-justify text-secondary">
                  Too horrible consider followed may differed age. An rest if
                  more five mr of. Age just her rank met down way...
                </p>
              </div>
            </div>
          </div>
          <div className="md:ml-10">
            <div className="flex items-center gap-10 mb-10">
              <div>
                <img
                  src="https://i.ibb.co/M1jMpMP/260x200x1.jpg"
                  alt=""
                />
              </div>
              <div className="font-mono">
                <h1 className="text-xl font-mono mb-2 font-bold text-secondary">EURA BOUGH</h1>
                <p className="text-xl font-mono text-primary font-bold">Founder</p>
                <Social />
              </div>
            </div>
            <div className="flex items-center gap-10 mb-10">
              <div>
                <img
                  src="https://i.ibb.co/HB34928/260x200x2.jpg"
                  alt=""
                />
              </div>
              <div>
                <h1 className="text-xl font-mono mb-2 font-bold text-secondary">KATE PRETTY</h1>
                <p className="text-xl font-mono text-primary font-bold">Co - Founder</p>
                <Social />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
