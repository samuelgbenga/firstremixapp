import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import ThreeScene1 from "~/components/ThreeScene1";
import { ThreeScene } from "~/components/ThreeScene";


export const meta: MetaFunction = () => {
    return [
      { title: "The Box" },
      { name: "description", content: "Displays three D box!" },
    ];
  };
  

const SecondRoute: React.FC = () => {
    return (
        <div className="App">
        <ThreeScene1 />
        <ThreeScene />
      </div>
    );
  };
  
  export default SecondRoute;