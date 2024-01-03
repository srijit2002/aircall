import { Tab as HeadLessTab, Transition } from "@headlessui/react";
import propTypes from "prop-types";
import { Fragment, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Tab({ data = [] }) {
  const [tabIndex, setTabIndex] = useState(0);
  const tabKeys = data.map((elem) => elem.key);
  const tabComponents = data.map((elem) => elem.component);
  return (
    <HeadLessTab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
      <HeadLessTab.List className="flex mb-2 bg-gradient-to-tr from-[#38bcf8] to-[#2664eb] text-white py-2.5 px-2">
        {tabKeys.map((tabKey) => (
          <HeadLessTab
            className={({ selected }) =>
              classNames(
                "w-1/3 rounded-lg py-2 text-sm font-medium leading-5",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white text-blue-700 shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
            key={tabKey}
          >
            {tabKey}
          </HeadLessTab>
        ))}
      </HeadLessTab.List>
      <HeadLessTab.Panels className="overflow-y-auto max-h-screen scrollbar-none px-2 py-3">
        {tabComponents.map((tabComponent, index) => (
          <HeadLessTab.Panel key={index}>
            <Transition
              show={tabIndex ===index}
              as={Fragment}
              enter="transition ease-out duration-300"
              enterFrom="transform opacity-0"
              enterTo="transform opacity-100"
              leave="transition ease-in duration-200"
              leaveFrom="transform opacity-100"
              leaveTo="transform opacity-0"
            >
              {tabComponent}
            </Transition>
          </HeadLessTab.Panel>
        ))}
      </HeadLessTab.Panels>
    </HeadLessTab.Group>
  );
}

Tab.propTypes = {
  data: propTypes.array,
};
