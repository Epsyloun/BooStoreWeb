import React from "react";
import CategoryHomeButton from "../../components/home/CategoryHomeButton";
import { FaSuitcase } from "react-icons/fa6";
import { FaWrench } from "react-icons/fa6";
import { BiSolidJoystickButton } from "react-icons/bi";
import { BsNintendoSwitch } from "react-icons/bs";
import Ns2Logo from "../../assets/images/Ns2Logo.jsx";

const categories = [
  { id: 1, title: "NS1", icon: <BsNintendoSwitch size={48} /> },
  {
    id: 2,
    title: "NS2",
    icon: <Ns2Logo width={86} height={"auto"} />,
  },
  {
    id: 3,
    title: "Estuches",
    icon: <FaSuitcase size={48} />,
  },
  { id: 4, title: "Repuestos", icon: <FaWrench size={48} /> },
  { id: 5, title: "Accesorios", icon: <BiSolidJoystickButton size={48} /> },
];

export default function HomeCategoryList() {
  return (
    <div className="w-[90%]">
      <h1 className="text-white text-2xl mt-2 font-title font-semibold">
        Categorías
      </h1>

      <div className="flex gap-6 p-4 overflow-x-auto hide-scrollbar overflow-visible">
        {categories.map((category) => (
          <div
            key={category.id}
            className="
              shrink-0
              min-w-[140px]
              lg:min-w-[160px]
              lg:min-w-0
              lg:flex-1
            "
          >
            <CategoryHomeButton title={category.title} icon={category.icon} />
          </div>
        ))}
      </div>
    </div>
  );
}
