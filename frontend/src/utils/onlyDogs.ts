import { notMatchArray } from "./notMatchArray";


export const onlydog = (list: any, isMatch: () => void, matchOn?: () => void) => {
    let dogs = 0;

    if (list.length === 0) {
        return;
    }
    for (const el of list) {
        if (!notMatchArray.includes(el.label)) {
            if (el.label === 'dog') {
                ++dogs;
            }
        } else {
            break;
        }
    }
    if (dogs !== 0) {
        isMatch()
    } else {
        matchOn && matchOn();
    }
}