import {section} from "../store/useStore";


const currentSection = (iconId: string, sections: section[]): section => {

    return sections.filter(section => section.id === iconId)[0]
}

export default currentSection