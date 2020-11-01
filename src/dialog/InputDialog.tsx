import { h } from "tsx-dom";
import { Dialog, DialogControlButtons } from "./dialog";
import { FormDialog } from "./FormDialog";
export class InputDialog extends FormDialog {
    constructor(
        prompt: string | HTMLElement,
        title: string | HTMLElement,
        callback: (data: string) => void,
        placeholder?: string,
        buttons?: DialogControlButtons,
        id?: string | undefined
    ) {
        const _id = id ?? Dialog.generateID();
        super(
            <div>
                <label for={`dialog_${_id}_input`}>{prompt}</label>
                <input
                    type="text"
                    name={`dialog_${_id}_input`}
                    id={`dialog_${_id}_input`}
                    placeholder={placeholder}
                />
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
