import { h } from "tsx-dom";
import { Dialog, DialogControlButtons } from "./dialog";
import { FormDialog } from "./FormDialog";

export class SelectDialog extends FormDialog {
    constructor(
        prompt: string | HTMLElement,
        title: string | HTMLElement,
        items: Map<string, string | HTMLElement | HTMLElement[]>,
        callback: (data: string) => void,
        buttons?: DialogControlButtons,
        id?: string | undefined
    ) {
        const _id = id ?? Dialog.generateID();
        const itemsArr: HTMLElement[] = [];
        items.forEach((label, id) => {
            itemsArr.push(
                <input
                    type="radio"
                    id={`dialog_${_id}_choices_${id}`}
                    name={`dialog_${_id}_input`}
                    value={id}
                />
            );
            itemsArr.push(
                <label for={`dialog_${_id}_choices_${id}`}>{label}</label>
            );
        });
        super(
            <div>
                {prompt}
                <br />
                <div id={`dialog_${_id}_choices`}>{itemsArr}</div>
            </div>,
            title,
            (data) => {
                callback(data.get(`dialog_${_id}_input`) as string);
            },
            buttons,
            _id
        );
    }
}
