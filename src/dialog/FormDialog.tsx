import { h } from "tsx-dom";
import {
    Dialog,
    DialogControlButtons,
    DefaultDialogControlButtons,
} from "./dialog";
export class FormDialog extends Dialog {
    constructor(
        content: HTMLElement,
        title: string | HTMLElement,
        callback: (result: FormData) => void,
        buttons: DialogControlButtons = DefaultDialogControlButtons,
        id?: string
    ) {
        const _id = id ?? Dialog.generateID();
        super(
            <form id={`${_id}_form`}>
                {content}
                <br />
                <div class="right">
                    <input
                        id={`${_id}_form_cancel`}
                        type="button"
                        class="cancel"
                        value={buttons.cancel}
                    />
                    <input
                        id={`${_id}_form_submit`}
                        type="submit"
                        class="submit"
                        value={buttons.confirm}
                    />
                </div>
            </form>,
            title,
            _id
        );
        (document.getElementById(
            `${this.id}_form_cancel`
        ) as HTMLElement).addEventListener("click", () => {
            this.cancel();
        });
        (document.getElementById(
            `${_id}_form`
        ) as HTMLFormElement).addEventListener("submit", (e) => {
            e.preventDefault();
            callback(new FormData(e.target as HTMLFormElement));
            this.cancel();
        });
    }
}
