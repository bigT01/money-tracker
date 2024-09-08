import {section, useStore} from "../store/useStore";



const useCurrentSection = (iconId: string): section | undefined => {
    const sections = useStore((state) => state.sections);

    return sections.find((section) => section.id === iconId);
};

export default useCurrentSection;
